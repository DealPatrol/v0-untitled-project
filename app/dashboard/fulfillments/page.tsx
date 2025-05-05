import type { Metadata } from "next"
import { createServerSupabaseClient } from "@/lib/supabase"
import { OrderTracking } from "@/components/order-tracking"

export const metadata: Metadata = {
  title: "Order Fulfillments | Memorial QR",
  description: "Manage order fulfillments and track shipments",
}

export default async function FulfillmentsPage() {
  const supabase = createServerSupabaseClient()

  // Get all fulfillments with related data
  const { data: fulfillments, error } = await supabase
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Order Fulfillments</h1>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading fulfillments: {error.message}
        </div>
      ) : (
        <OrderTracking initialFulfillments={fulfillments || []} />
      )}
    </div>
  )
}
