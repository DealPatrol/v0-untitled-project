"use server"

import Stripe from "stripe"
import { createServerSupabaseClient } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

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

export type PaymentMethod = "stripe" | "bank_transfer" | "pay_on_delivery"

export async function createOrder(
  items: CheckoutItem[],
  shipping: ShippingInfo,
  paymentMethod: PaymentMethod,
  metadata: Record<string, string> = {},
) {
  try {
    console.log("Creating order with:", { items, paymentMethod, metadata })

    if (!items || items.length === 0) {
      throw new Error("No items provided for order")
    }

    const amount = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0)
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    const referenceNumber = `MQR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`

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

    if (paymentMethod === "stripe") {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Stripe not configured. Please add STRIPE_SECRET_KEY to environment variables.")
      }

      if (!process.env.NEXT_PUBLIC_SITE_URL) {
        throw new Error("Site URL not configured. Please add NEXT_PUBLIC_SITE_URL to environment variables.")
      }

      try {
        const lineItems = items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name || "Memorial QR Product",
              description: item.description || "Memorial QR Code",
            },
            unit_amount: Math.round((item.price || 0) * 100),
          },
          quantity: item.quantity || 1,
        }))

        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shipping",
              description: "Standard shipping (5-10 business days)",
            },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        })

        const sessionParams: Stripe.Checkout.SessionCreateParams = {
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?canceled=true`,
          metadata: {
            order_id: order.id,
            plan: metadata.plan || "premium",
            quantity: metadata.quantity || "1",
          },
          shipping_address_collection: {
            allowed_countries: ["US", "CA", "GB", "AU"],
          },
          billing_address_collection: "required",
        }

        if (metadata.email) {
          sessionParams.customer_email = metadata.email
        }

        const session = await stripe.checkout.sessions.create(sessionParams)

        const { error: updateError } = await supabase
          .from("orders")
          .update({
            stripe_session_id: session.id,
            status: "pending_payment",
          })
          .eq("id", order.id)

        if (updateError) {
          console.error("Error updating order with session ID:", updateError)
        }

        return {
          orderId: order.id,
          redirectUrl: session.url!,
          orderDetails: order,
          sessionId: session.id,
        }
      } catch (stripeError: any) {
        console.error("Stripe error details:", stripeError)

        await supabase.from("orders").update({ status: "failed" }).eq("id", order.id)

        if (stripeError.type === "StripeCardError") {
          throw new Error("Your card was declined. Please try a different payment method.")
        } else if (stripeError.type === "StripeInvalidRequestError") {
          throw new Error("Invalid payment request. Please check your information and try again.")
        } else {
          throw new Error(`Payment processing failed: ${stripeError.message || "Unknown error"}`)
        }
      }
    } else {
      const orderStatus = paymentMethod === "bank_transfer" ? "awaiting_payment" : "pending"
      await supabase.from("orders").update({ status: orderStatus }).eq("id", order.id)
      await createQRCodesForOrder(order.id, items, metadata.plan || "premium")

      return {
        orderId: order.id,
        redirectUrl: `/checkout/confirmation?order_id=${order.id}&payment_method=${paymentMethod}`,
        orderDetails: order,
      }
    }
  } catch (error: any) {
    console.error("Error in createOrder:", error)
    throw new Error(error.message || "Failed to create order. Please try again.")
  }
}

async function createQRCodesForOrder(orderId: string, items: CheckoutItem[], plan: string) {
  try {
    const supabase = createServerSupabaseClient()
    const totalQuantity = items.reduce((acc, item) => acc + (item.quantity || 1), 0)

    const qrCodePromises = []
    for (let i = 0; i < totalQuantity; i++) {
      const uniqueCode = `QR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}-${i}`
      qrCodePromises.push(
        supabase.from("qr_codes").insert({
          order_id: orderId,
          unique_code: uniqueCode,
          design_type: plan,
          status: "pending",
        }),
      )
    }

    await Promise.all(qrCodePromises)
    console.log(`Successfully created ${totalQuantity} QR codes`)
  } catch (qrError) {
    console.error("Error creating QR codes:", qrError)
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

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const supabase = createServerSupabaseClient()

    const { data: order } = await supabase.from("orders").select("*").eq("stripe_session_id", sessionId).single()

    return {
      id: session.id,
      status: session.payment_status === "paid" ? "paid" : session.status,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      metadata: session.metadata,
      reference_number: order?.reference_number || sessionId,
      payment_method: "stripe",
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
    }
  } catch (error) {
    console.error("Error retrieving checkout session:", error)
    throw new Error("Failed to retrieve checkout session")
  }
}

export async function updateOrderWithPaymentStatus(orderId: string, status: string) {
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId)

    if (error) {
      console.error("Error updating order status:", error)
      throw new Error("Failed to update order status")
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating order status:", error)
    throw new Error("Failed to update order status")
  }
}

export async function processRefund(sessionId: string, amount?: number) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session.payment_intent) {
      throw new Error("No payment intent found for this session")
    }

    const refund = await stripe.refunds.create({
      payment_intent: session.payment_intent as string,
      amount: amount ? Math.round(amount * 100) : undefined, // Convert to cents, undefined for full refund
    })

    const supabase = createServerSupabaseClient()

    // Update order status
    await supabase
      .from("orders")
      .update({
        status: "refunded",
        refund_id: refund.id,
        refunded_at: new Date().toISOString(),
      })
      .eq("stripe_session_id", sessionId)

    return {
      success: true,
      refund_id: refund.id,
      amount: refund.amount / 100,
      status: refund.status,
    }
  } catch (error: any) {
    console.error("Error processing refund:", error)
    throw new Error(error.message || "Failed to process refund")
  }
}

export async function createPaymentIntent(amount: number, metadata: Record<string, string> = {}) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
    }
  } catch (error: any) {
    console.error("Error creating payment intent:", error)
    throw new Error(error.message || "Failed to create payment intent")
  }
}
