"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import type { CheckoutItem, ShippingInfo } from "./payment"

// Create a new order without using Stripe
export async function createFallbackOrder(
  items: CheckoutItem[],
  shipping: ShippingInfo,
  paymentMethod: "bank_transfer" | "pay_on_delivery",
  metadata: Record<string, string> = {},
) {
  try {
    // Calculate total amount
    const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    // Add shipping cost
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    // Generate a unique reference number
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
      return { error: "Failed to create order" }
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
  } catch (error: any) {
    console.error("Error creating fallback order:", error)
    return { error: error.message || "Failed to create order" }
  }
}
