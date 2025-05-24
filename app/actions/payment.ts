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

export type PaymentMethod = "stripe" | "bank_transfer" | "pay_on_delivery"

// Create a new order in the database (without Stripe server-side operations)
export async function createOrder(
  items: CheckoutItem[],
  shipping: ShippingInfo,
  paymentMethod: PaymentMethod,
  metadata: Record<string, string> = {},
) {
  try {
    // Calculate total amount
    const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    // Generate a unique reference number
    const referenceNumber = `MQR-${Math.floor(100000 + Math.random() * 900000)}`

    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // For now, we'll handle all payments as alternative methods due to Stripe configuration issues
    const finalPaymentMethod = paymentMethod === "stripe" ? "bank_transfer" : paymentMethod
    const orderStatus = finalPaymentMethod === "bank_transfer" ? "awaiting_payment" : "pending"

    // Create the order in the database
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id,
        reference_number: referenceNumber,
        payment_method: finalPaymentMethod,
        status: orderStatus,
        amount: totalAmount,
        metadata: {
          items,
          shipping,
          ...metadata,
          original_payment_method: paymentMethod,
          stripe_fallback: paymentMethod === "stripe" ? true : false,
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
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

    for (let i = 0; i < totalQuantity; i++) {
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

    try {
      await Promise.all(qrCodePromises)
    } catch (qrError) {
      console.error("Error creating QR codes:", qrError)
      // Continue even if QR code creation fails
    }

    return {
      orderId: order.id,
      redirectUrl: `/checkout/confirmation?order_id=${order.id}&payment_method=${finalPaymentMethod}`,
      orderDetails: order,
    }
  } catch (error: any) {
    console.error("Error creating order:", error)
    throw new Error(error.message || "Failed to create order")
  }
}

// Get order details by order ID
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

// Get checkout session (simplified version without Stripe dependency)
export async function getCheckoutSession(sessionId: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Try to find order by session ID or reference number
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .or(`stripe_session_id.eq.${sessionId},reference_number.eq.${sessionId}`)
      .single()

    if (error) {
      console.error("Error retrieving checkout session:", error)
      throw new Error("Failed to retrieve checkout session")
    }

    if (order) {
      return {
        id: order.id,
        status: order.status,
        amount: order.amount,
        metadata: order.metadata,
        reference_number: order.reference_number,
        payment_method: order.payment_method,
      }
    }

    // If no order found, return a default response
    return {
      id: sessionId,
      status: "not_found",
      amount: 0,
      metadata: {},
      reference_number: sessionId,
      payment_method: "unknown",
    }
  } catch (error) {
    console.error("Error retrieving checkout session:", error)
    throw new Error("Failed to retrieve checkout session")
  }
}

// Update order with payment status
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

// Create a simple checkout session for client-side Stripe (if needed later)
export async function createCheckoutSession(items: CheckoutItem[]) {
  try {
    // For now, return the items for client-side processing
    const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    return {
      items,
      amount: totalAmount,
      currency: "usd",
      // This would be used for client-side Stripe integration
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session")
  }
}
