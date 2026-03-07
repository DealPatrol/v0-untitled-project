import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memorialId, items, total, paymentIntentId, customerInfo } = body

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_email: customerInfo.email,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        shipping_address: customerInfo.address,
        subtotal: total,
        total: total,
        payment_status: "paid",
        payment_method: "stripe",
        stripe_payment_intent_id: paymentIntentId,
        memorial_id: memorialId,
        includes_memorial_activation: false,
        internal_notes: "Dropship order",
      })
      .select()
      .single()

    if (orderError) {
      console.error("Order creation error:", orderError)
      return NextResponse.json({ message: "Failed to create order" }, { status: 500 })
    }

    // Create order items
    for (const item of items) {
      await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        unit_price: item.price,
        quantity: 1,
        total_price: item.price,
        dropship_status: "pending",
      })
    }

    return NextResponse.json({ orderId: order.id, orderNumber }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("id")

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (orderId) {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", orderId)
        .single()

      if (error) {
        return NextResponse.json({ message: "Order not found" }, { status: 404 })
      }

      return NextResponse.json(data)
    }

    // Get all orders
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
