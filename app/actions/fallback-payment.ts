"use server"

import { createClient } from "@supabase/supabase-js"
import {
  createOrder,
  type CheckoutItem as ImportedCheckoutItem,
  type ShippingInfo as ImportedShippingInfo,
  type PaymentMethod,
} from "./payment"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface OrderMetadata {
  plan: string
  email: string
  quantity: string
  product_type: string
  payment_method?: string
}

export async function createFallbackOrder(
  items: ImportedCheckoutItem[],
  shipping: ImportedShippingInfo,
  metadata: Record<string, string> = {},
) {
  try {
    console.log("Creating fallback order with metadata:", metadata)

    // Determine payment method from metadata
    const paymentMethod = (metadata.payment_method as PaymentMethod) || "bank_transfer"

    // Create the order using the existing payment system
    const result = await createOrder(items, shipping, paymentMethod, metadata)

    return result
  } catch (error: any) {
    console.error("Error in createFallbackOrder:", error)
    throw new Error(error.message || "Failed to create fallback order")
  }
}

async function sendOrderConfirmationEmail(email: string, order: any) {
  // Mock email sending - replace with actual email service
  console.log(`Sending confirmation email to ${email} for order ${order.id}`)

  // In a real implementation, you would use a service like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Resend

  return Promise.resolve()
}

export async function getOrderStatus(orderId: string) {
  try {
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (error) {
      throw new Error(`Failed to get order: ${error.message}`)
    }

    return order
  } catch (error: any) {
    console.error("Error getting order status:", error)
    throw new Error(error.message || "Failed to get order status")
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const { data: order, error } = await supabase
      .from("orders")
      .update({
        order_status: status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update order: ${error.message}`)
    }

    return order
  } catch (error: any) {
    console.error("Error updating order status:", error)
    throw new Error(error.message || "Failed to update order status")
  }
}
