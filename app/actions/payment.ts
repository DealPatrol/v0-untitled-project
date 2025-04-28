"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

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

export type PaymentMethod = "stripe" | "bank_transfer" | "pay_on_delivery"

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

    // If payment method is Stripe, create a checkout session
    if (paymentMethod === "stripe") {
      // Create line items for Stripe
      const lineItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      }))

      // Add shipping cost as a line item
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
            description: "Standard shipping",
          },
          unit_amount: Math.round(shippingCost * 100), // Stripe uses cents
        },
        quantity: 1,
      })

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?canceled=true`,
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB", "AU"],
        },
        metadata: {
          ...metadata,
          user_id: user?.id || "anonymous",
        },
      })

      // Create the order in the database
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id,
          reference_number: referenceNumber,
          payment_method: paymentMethod,
          status: "pending",
          amount: totalAmount,
          stripe_session_id: session.id,
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

      return {
        orderId: order.id,
        redirectUrl: session.url || "/checkout/confirmation",
        orderDetails: order,
      }
    } else {
      // Create the order for non-Stripe payment methods
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

// Get Stripe checkout session
export async function getCheckoutSession(sessionId: string) {
  try {
    // First check if we have this session in our database
    const supabase = createServerSupabaseClient()
    const { data: order, error } = await supabase.from("orders").select("*").eq("stripe_session_id", sessionId).single()

    if (order) {
      return order
    }

    // If not in database, get from Stripe directly
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Create QR codes for the order if it was successful
    if (session.payment_status === "paid") {
      // Get metadata from the session
      const plan = session.metadata?.plan || "premium"
      const quantity = Number.parseInt(session.metadata?.quantity || "1")

      // Create QR codes
      const qrCodePromises = []
      for (let i = 0; i < quantity; i++) {
        const uniqueCode = `QR-${Math.floor(100000 + Math.random() * 900000)}`
        qrCodePromises.push(
          supabase.from("qr_codes").insert({
            order_id: session.id,
            unique_code: uniqueCode,
            design_type: plan,
            status: "pending",
          }),
        )
      }

      await Promise.all(qrCodePromises)

      // Update or create the order in our database
      await supabase.from("orders").upsert({
        stripe_session_id: session.id,
        user_id: session.metadata?.user_id,
        reference_number: `MQR-${Math.floor(100000 + Math.random() * 900000)}`,
        payment_method: "stripe",
        status: session.payment_status === "paid" ? "paid" : "pending",
        amount: session.amount_total ? session.amount_total / 100 : 0,
        metadata: session.metadata,
      })
    }

    return {
      id: session.id,
      status: session.payment_status,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      metadata: session.metadata,
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
    await supabase.from("orders").update({ status }).eq("id", orderId)
    return { success: true }
  } catch (error) {
    console.error("Error updating order status:", error)
    throw new Error("Failed to update order status")
  }
}
