import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await request.json()

    // Validate the request
    if (!body.supplier_key || !body.order_id || !body.status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find the supplier by API key
    const { data: supplier, error: supplierError } = await supabase
      .from("suppliers")
      .select("id")
      .eq("api_key", body.supplier_key)
      .single()

    if (supplierError || !supplier) {
      return NextResponse.json({ error: "Invalid supplier key" }, { status: 401 })
    }

    // Find the fulfillment by supplier order ID
    const { data: fulfillment, error: fulfillmentError } = await supabase
      .from("order_fulfillments")
      .select("id, order_id")
      .eq("supplier_order_id", body.order_id)
      .eq("supplier_id", supplier.id)
      .single()

    if (fulfillmentError || !fulfillment) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update the fulfillment status
    const updates: any = {
      status: body.status,
      updated_at: new Date().toISOString(),
    }

    // Add optional fields if provided
    if (body.tracking_number) updates.tracking_number = body.tracking_number
    if (body.tracking_url) updates.tracking_url = body.tracking_url
    if (body.shipping_carrier) updates.shipping_carrier = body.shipping_carrier
    if (body.estimated_delivery_date) updates.estimated_delivery_date = body.estimated_delivery_date
    if (body.notes) updates.notes = body.notes

    const { error: updateError } = await supabase.from("order_fulfillments").update(updates).eq("id", fulfillment.id)

    if (updateError) {
      return NextResponse.json({ error: "Failed to update fulfillment" }, { status: 500 })
    }

    // If status is "shipped", update the shipping table as well
    if (body.status === "shipped" && body.tracking_number) {
      // Check if shipping record exists
      const { data: shipping } = await supabase
        .from("shipping")
        .select("id")
        .eq("order_id", fulfillment.order_id)
        .maybeSingle()

      if (shipping) {
        // Update existing shipping record
        await supabase
          .from("shipping")
          .update({
            tracking_number: body.tracking_number,
            carrier: body.shipping_carrier || "Unknown",
            status: "shipped",
            estimated_delivery_date: body.estimated_delivery_date,
            updated_at: new Date().toISOString(),
          })
          .eq("id", shipping.id)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing supplier webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
