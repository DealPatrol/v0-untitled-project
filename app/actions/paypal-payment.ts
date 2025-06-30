"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export type CheckoutItem = {
  name: string
  description: string
  price: number
  quantity: number
  product_type?: string
}

export type ShippingInfo = {
  name: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
}

export type PaymentMethod = "paypal" | "bank_transfer" | "pay_on_delivery"

// PayPal API Base URLs
const PAYPAL_API_BASE =
  process.env.PAYPAL_ENVIRONMENT === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

// Get PayPal Access Token
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured")
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  if (!response.ok) {
    throw new Error("Failed to get PayPal access token")
  }

  const data = await response.json()
  return data.access_token
}

export async function createPayPalOrder(
  items: CheckoutItem[],
  shipping: ShippingInfo,
  metadata: Record<string, string> = {},
) {
  try {
    console.log("Creating PayPal order with:", { items, metadata })

    if (!items || items.length === 0) {
      throw new Error("No items provided for order")
    }

    const amount = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0)
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    const referenceNumber = `MQR-PP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`

    const supabase = createServerSupabaseClient()

    let userId = null
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      userId = user?.id
    } catch (authError) {
      console.log("No authenticated user, proceeding with guest checkout")
    }

    // Create order in database first
    const orderData = {
      user_id: userId,
      reference_number: referenceNumber,
      payment_method: "paypal",
      status: "pending",
      amount: totalAmount,
      customer_name: shipping.name,
      shipping_address: JSON.stringify(shipping.address),
      metadata: JSON.stringify(metadata),
    }

    const { data: order, error: dbError } = await supabase.from("orders").insert(orderData).select().single()

    if (dbError) {
      console.error("Database error creating order:", dbError)
      throw new Error(`Failed to create order in database: ${dbError.message}`)
    }

    if (!order) {
      throw new Error("Failed to create order - no order returned")
    }

    console.log("Order created successfully:", order)

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken()

    // Create PayPal order
    const paypalOrderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: order.id,
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: amount.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: shippingCost.toFixed(2),
              },
            },
          },
          items: items.map((item) => ({
            name: item.name,
            description: item.description,
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
            category: "DIGITAL_GOODS",
          })),
          shipping: {
            name: {
              full_name: shipping.name,
            },
            address: {
              address_line_1: shipping.address.line1,
              address_line_2: shipping.address.line2 || "",
              admin_area_2: shipping.address.city,
              admin_area_1: shipping.address.state,
              postal_code: shipping.address.postal_code,
              country_code: shipping.address.country === "United States" ? "US" : shipping.address.country,
            },
          },
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/confirmation?order_id=${order.id}&payment_method=paypal`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?canceled=true`,
        brand_name: "Memorial QR",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    }

    const paypalResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paypalOrderData),
    })

    if (!paypalResponse.ok) {
      const errorData = await paypalResponse.json()
      console.error("PayPal order creation failed:", errorData)
      throw new Error("Failed to create PayPal order")
    }

    const paypalOrder = await paypalResponse.json()

    // Update order with PayPal order ID
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        paypal_order_id: paypalOrder.id,
        status: "pending_payment",
      })
      .eq("id", order.id)

    if (updateError) {
      console.error("Error updating order with PayPal order ID:", updateError)
    }

    // Find the approval URL
    const approvalUrl = paypalOrder.links.find((link: any) => link.rel === "approve")?.href

    if (!approvalUrl) {
      throw new Error("No approval URL found in PayPal response")
    }

    return {
      orderId: order.id,
      paypalOrderId: paypalOrder.id,
      redirectUrl: approvalUrl,
      orderDetails: order,
    }
  } catch (error: any) {
    console.error("Error in createPayPalOrder:", error)
    throw new Error(error.message || "Failed to create PayPal order. Please try again.")
  }
}

export async function capturePayPalOrder(paypalOrderId: string) {
  try {
    const accessToken = await getPayPalAccessToken()

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("PayPal capture failed:", errorData)
      throw new Error("Failed to capture PayPal payment")
    }

    const captureData = await response.json()

    const supabase = createServerSupabaseClient()

    // Update order status
    const { data: order, error: updateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        transaction_id: captureData.id,
      })
      .eq("paypal_order_id", paypalOrderId)
      .select()
      .single()

    if (updateError) {
      console.error("Error updating order status:", updateError)
      throw new Error("Failed to update order status")
    }

    // Create QR codes for the order
    if (order) {
      await createQRCodesForOrder(order.id, order.metadata ? JSON.parse(order.metadata) : {})
    }

    return {
      success: true,
      order,
      captureData,
    }
  } catch (error: any) {
    console.error("Error capturing PayPal order:", error)
    throw new Error(error.message || "Failed to capture PayPal payment")
  }
}

async function createQRCodesForOrder(orderId: string, metadata: any) {
  try {
    const supabase = createServerSupabaseClient()
    const quantity = Number.parseInt(metadata.quantity || "1")
    const plan = metadata.plan || "premium"

    const qrCodePromises = []
    for (let i = 0; i < quantity; i++) {
      const uniqueCode = `QR-PP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}-${i}`
      qrCodePromises.push(
        supabase.from("qr_codes").insert({
          order_id: orderId,
          unique_code: uniqueCode,
          design_type: plan,
          status: "active",
        }),
      )
    }

    await Promise.all(qrCodePromises)
    console.log(`Successfully created ${quantity} QR codes`)
  } catch (qrError) {
    console.error("Error creating QR codes:", qrError)
  }
}

export async function getPayPalOrderDetails(paypalOrderId: string) {
  try {
    const accessToken = await getPayPalAccessToken()

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get PayPal order details")
    }

    return await response.json()
  } catch (error: any) {
    console.error("Error getting PayPal order details:", error)
    throw new Error(error.message || "Failed to get PayPal order details")
  }
}

export async function createOrder(
  items: CheckoutItem[],
  shipping: ShippingInfo,
  paymentMethod: PaymentMethod,
  metadata: Record<string, string> = {},
) {
  if (paymentMethod === "paypal") {
    return createPayPalOrder(items, shipping, metadata)
  } else {
    // Handle other payment methods (bank transfer, pay on delivery)
    return createAlternativeOrder(items, shipping, paymentMethod, metadata)
  }
}

async function createAlternativeOrder(
  items: CheckoutItem[],
  shipping: ShippingInfo,
  paymentMethod: PaymentMethod,
  metadata: Record<string, string> = {},
) {
  try {
    const amount = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0)
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    const referenceNumber = `MQR-${paymentMethod.toUpperCase()}-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`

    const supabase = createServerSupabaseClient()

    let userId = null
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      userId = user?.id
    } catch (authError) {
      console.log("No authenticated user, proceeding with guest checkout")
    }

    const orderData = {
      user_id: userId,
      reference_number: referenceNumber,
      payment_method: paymentMethod,
      status: paymentMethod === "bank_transfer" ? "awaiting_payment" : "pending",
      amount: totalAmount,
      customer_name: shipping.name,
      shipping_address: JSON.stringify(shipping.address),
      metadata: JSON.stringify(metadata),
    }

    const { data: order, error: dbError } = await supabase.from("orders").insert(orderData).select().single()

    if (dbError) {
      throw new Error(`Failed to create order in database: ${dbError.message}`)
    }

    // Create QR codes for non-PayPal orders immediately
    await createQRCodesForOrder(order.id, metadata)

    return {
      orderId: order.id,
      redirectUrl: `/checkout/confirmation?order_id=${order.id}&payment_method=${paymentMethod}`,
      orderDetails: order,
    }
  } catch (error: any) {
    console.error("Error creating alternative order:", error)
    throw new Error(error.message || "Failed to create order")
  }
}

export async function getOrderDetails(orderId: string) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (error) {
      console.error("Error retrieving order:", error)
      throw new Error("Failed to retrieve order")
    }

    return order
  } catch (error) {
    console.error("Error retrieving order:", error)
    throw new Error("Failed to retrieve order")
  }
}
