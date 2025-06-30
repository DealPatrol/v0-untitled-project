"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface CheckoutItem {
  name: string
  description: string
  price: number
  quantity: number
  product_type: string
}

export interface ShippingInfo {
  name: string
  address: {
    line1: string
    city: string
    state: string
    postal_code: string
    country: string
  }
}

export async function createFallbackOrder(
  items: CheckoutItem[],
  shippingInfo: ShippingInfo,
  metadata: Record<string, string>,
) {
  try {
    console.log("Creating fallback order with:", { items, shippingInfo, metadata })

    // Calculate total
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 4.99
    const total = subtotal + shipping

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_email: metadata.email,
        customer_name: shippingInfo.name,
        shipping_address: shippingInfo.address,
        total_amount: total,
        status: "pending",
        payment_method: "bank_transfer",
        items: items,
        metadata: metadata,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      throw new Error("Failed to create order: " + orderError.message)
    }

    console.log("Order created successfully:", order)

    // Generate QR code for the order
    const qrCodeData = {
      orderId: order.id,
      customerEmail: metadata.email,
      plan: metadata.plan,
      quantity: metadata.quantity,
    }

    // Create QR code entry
    const { data: qrCode, error: qrError } = await supabase
      .from("qr_codes")
      .insert({
        code: `order-${order.id}-${Date.now()}`,
        memorial_id: null, // Will be set when memorial is created
        order_id: order.id,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (qrError) {
      console.error("Error creating QR code:", qrError)
      // Don't fail the order creation if QR code fails
    }

    // Send confirmation email (mock implementation)
    await sendOrderConfirmationEmail(order, shippingInfo, items)

    return {
      success: true,
      orderId: order.id,
      redirectUrl: `/checkout/confirmation?order_id=${order.id}`,
      message: "Order created successfully",
    }
  } catch (error: any) {
    console.error("Fallback order creation failed:", error)
    throw new Error(error.message || "Failed to create order")
  }
}

async function sendOrderConfirmationEmail(order: any, shippingInfo: ShippingInfo, items: CheckoutItem[]) {
  try {
    console.log("Sending order confirmation email for order:", order.id)

    // Mock email sending - replace with actual email service
    const emailData = {
      to: order.customer_email,
      subject: `Order Confirmation - Memorial QR #${order.id}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Dear ${shippingInfo.name},</p>
        <p>We've received your order and will process it shortly.</p>
        
        <h3>Order Details:</h3>
        <ul>
          ${items
            .map(
              (item) => `
            <li>${item.name} - Quantity: ${item.quantity} - $${item.price.toFixed(2)}</li>
          `,
            )
            .join("")}
        </ul>
        
        <h3>Shipping Address:</h3>
        <p>
          ${shippingInfo.name}<br>
          ${shippingInfo.address.line1}<br>
          ${shippingInfo.address.city}, ${shippingInfo.address.state} ${shippingInfo.address.postal_code}<br>
          ${shippingInfo.address.country}
        </p>
        
        <h3>Payment Method:</h3>
        <p>Bank Transfer - We'll send you payment instructions shortly.</p>
        
        <p>Order Total: $${order.total_amount.toFixed(2)}</p>
        
        <p>Thank you for choosing Memorial QR!</p>
      `,
    }

    // Log email data (replace with actual email service)
    console.log("Email would be sent:", emailData)

    return { success: true }
  } catch (error) {
    console.error("Failed to send confirmation email:", error)
    return { success: false, error }
  }
}

export async function getOrderStatus(orderId: string) {
  try {
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (error) {
      throw new Error("Order not found")
    }

    return {
      success: true,
      order,
    }
  } catch (error: any) {
    console.error("Error fetching order:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const { data: order, error } = await supabase
      .from("orders")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()
      .single()

    if (error) {
      throw new Error("Failed to update order status")
    }

    return {
      success: true,
      order,
    }
  } catch (error: any) {
    console.error("Error updating order status:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
