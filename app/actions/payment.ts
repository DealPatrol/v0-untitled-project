"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export type CheckoutItem = {
  name: string
  description: string
  price: number
  quantity: number
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

export type PaymentMethod = "bank_transfer" | "pay_on_delivery"

// Create a new order in the database
export async function createOrder(
  items: CheckoutItem[],
  shipping: ShippingInfo,
  paymentMethod: PaymentMethod,
  metadata: Record<string, string> = {},
) {
  try {
    // Calculate total amount
    const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    // Add shipping cost
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    // Generate a unique reference number for bank transfers
    const referenceNumber = `MQR-${Math.floor(100000 + Math.random() * 900000)}`

    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Create the order
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id,
        reference_number: referenceNumber,
        payment_method: paymentMethod,
        status: paymentMethod === "bank_transfer" ? "awaiting_payment" : "pending",
        amount: totalAmount,
        metadata: {
          items,
          shipping,
          ...metadata,
        },
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating order:", error)
      throw new Error("Failed to create order")
    }

    // Create QR codes for each item in the order
    const qrCodePromises = []
    for (let i = 0; i < items.reduce((acc, item) => acc + item.quantity, 0); i++) {
      const uniqueCode = `QR-${Math.floor(100000 + Math.random() * 900000)}`
      qrCodePromises.push(
        supabase.from("qr_codes").insert({
          order_id: order.id,
          unique_code: uniqueCode,
          design_type: metadata.plan || "premium",
          status: "pending",
        }),
      )
    }

    await Promise.all(qrCodePromises)

    return {
      orderId: order.id,
      redirectUrl: `/checkout/confirmation?order_id=${order.id}`,
      orderDetails: order,
    }
  } catch (error) {
    console.error("Error creating order:", error)
    throw new Error("Failed to create order")
  }
}

// Get order details by order ID
export async function getOrderDetails(orderId: string) {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (error) {
      console.error("Error retrieving order:", error)
      throw new Error("Failed to retrieve order")
    }

    return data
  } catch (error) {
    console.error("Error retrieving order:", error)
    throw new Error("Failed to retrieve order")
  }
}

// For backward compatibility with existing code
export async function getCheckoutSession(sessionId: string) {
  return getOrderDetails(sessionId)
}

// For backward compatibility with existing code
export async function updateOrderWithPaymentStatus(orderId: string, status: string) {
  try {
    const supabase = createServerSupabaseClient()
    await supabase.from("orders").update({ status }).eq("id", orderId)
    return { success: true }
  } catch (error) {
    console.error("Error updating order status:", error)
    throw new Error("Failed to update order status")
  }
}
