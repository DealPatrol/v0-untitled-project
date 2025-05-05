"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { OrderFulfillment } from "@/types/supabase"

// Update order fulfillment status
export async function updateOrderFulfillment(fulfillmentId: string, updates: Partial<OrderFulfillment>) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("order_fulfillments")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", fulfillmentId)
      .select()
      .single()

    if (error) {
      console.error("Error updating order fulfillment:", error)
      return { error: error.message }
    }

    // If the status is updated to "shipped", also update the shipping table if it exists
    if (updates.status === "shipped" && updates.tracking_number) {
      const { data: order } = await supabase.from("orders").select("id").eq("id", data.order_id).single()

      if (order) {
        // Check if shipping record exists
        const { data: shipping } = await supabase.from("shipping").select("id").eq("order_id", order.id).maybeSingle()

        if (shipping) {
          // Update existing shipping record
          await supabase
            .from("shipping")
            .update({
              tracking_number: updates.tracking_number,
              carrier: updates.shipping_carrier,
              status: "shipped",
              estimated_delivery_date: updates.estimated_delivery_date,
              updated_at: new Date().toISOString(),
            })
            .eq("id", shipping.id)
        }
      }
    }

    revalidatePath("/dashboard/fulfillments")
    revalidatePath("/dashboard/orders")

    return { fulfillment: data }
  } catch (error: any) {
    console.error("Error in updateOrderFulfillment:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Get all fulfillments
export async function getAllFulfillments() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("order_fulfillments")
      .select(`
        *,
        suppliers (name, email, phone),
        orders (
          id,
          stripe_session_id,
          status,
          amount,
          created_at,
          metadata
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching fulfillments:", error)
      return { error: error.message }
    }

    return { fulfillments: data }
  } catch (error: any) {
    console.error("Error in getAllFulfillments:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Get fulfillment by order ID
export async function getFulfillmentByOrderId(orderId: string) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("order_fulfillments")
      .select(`
        *,
        suppliers (name, email, phone)
      `)
      .eq("order_id", orderId)
      .single()

    if (error) {
      console.error("Error fetching fulfillment:", error)
      return { error: error.message }
    }

    return { fulfillment: data }
  } catch (error: any) {
    console.error("Error in getFulfillmentByOrderId:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}
