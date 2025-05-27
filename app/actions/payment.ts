"use server"

import Stripe from "stripe"
import { createServerSupabaseClient } from "@/lib/supabase"

// Initialize Stripe with better error handling
let stripe: Stripe | null = null

try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
  }
} catch (error) {
  console.error("Failed to initialize Stripe:", error)
}

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

// Create a new order with proper error handling
export async function createOrder(
  items: CheckoutItem[],
  shipping: ShippingInfo,
  paymentMethod: PaymentMethod,
  metadata: Record<string, string> = {},
) {
  try {
    console.log("Creating order with:", { items, paymentMethod, metadata })

    // Validate inputs
    if (!items || items.length === 0) {
      throw new Error("No items provided for order")
    }

    // Calculate total amount
    const amount = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0)
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    console.log("Calculated amounts:", { amount, shippingCost, totalAmount })

    // Generate a unique reference number
    const referenceNumber = `MQR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`

    const supabase = createServerSupabaseClient()

    // Get the current user (optional for guest checkout)
    let userId = null
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      userId = user?.id
    } catch (authError) {
      console.log("No authenticated user, proceeding with guest checkout")
    }

    // Create the order in the database first
    const orderData = {
      user_id: userId,
      reference_number: referenceNumber,
      payment_method: paymentMethod,
      status: "pending",
      amount: totalAmount,
      metadata: {
        items,
        shipping,
        ...metadata,
      },
    }

    console.log("Creating order in database:", orderData)

    const { data: order, error } = await supabase.from("orders").insert(orderData).select().single()

    if (error) {
      console.error("Database error creating order:", error)
      throw new Error(`Failed to create order in database: ${error.message}`)
    }

    console.log("Order created successfully:", order)

    // Handle Stripe payment
    if (paymentMethod === "stripe") {
      if (!stripe) {
        console.error("Stripe not initialized - missing STRIPE_SECRET_KEY")
        throw new Error("Payment processing is not configured. Please contact support.")
      }

      if (!process.env.NEXT_PUBLIC_SITE_URL) {
        throw new Error("Site URL not configured for payment processing")
      }

      try {
        console.log("Creating Stripe checkout session...")

        // Prepare line items for Stripe
        const lineItems = items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name || "Memorial QR Product",
              description: item.description || "Memorial QR Code",
            },
            unit_amount: Math.round((item.price || 0) * 100), // Convert to cents
          },
          quantity: item.quantity || 1,
        }))

        // Add shipping as a line item
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shipping",
              description: "Standard shipping (5-10 business days)",
            },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        })

        const sessionParams: Stripe.Checkout.SessionCreateParams = {
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?canceled=true`,
          metadata: {
            order_id: order.id,
            plan: metadata.plan || "premium",
            quantity: metadata.quantity || "1",
          },
          shipping_address_collection: {
            allowed_countries: ["US", "CA", "GB", "AU"],
          },
        }

        // Add customer email if provided
        if (metadata.email) {
          sessionParams.customer_email = metadata.email
        }

        console.log("Stripe session params:", sessionParams)

        const session = await stripe.checkout.sessions.create(sessionParams)

        console.log("Stripe session created:", { id: session.id, url: session.url })

        // Update order with Stripe session ID
        const { error: updateError } = await supabase
          .from("orders")
          .update({
            stripe_session_id: session.id,
            status: "pending_payment",
          })
          .eq("id", order.id)

        if (updateError) {
          console.error("Error updating order with session ID:", updateError)
          // Don't throw here, session was created successfully
        }

        return {
          orderId: order.id,
          redirectUrl: session.url!,
          orderDetails: order,
          sessionId: session.id,
        }
      } catch (stripeError: any) {
        console.error("Stripe error details:", stripeError)

        // Update order status to failed
        await supabase.from("orders").update({ status: "failed" }).eq("id", order.id)

        // Provide more specific error messages
        if (stripeError.type === "StripeCardError") {
          throw new Error("Your card was declined. Please try a different payment method.")
        } else if (stripeError.type === "StripeInvalidRequestError") {
          throw new Error("Invalid payment request. Please check your information and try again.")
        } else {
          throw new Error(`Payment processing failed: ${stripeError.message || "Unknown error"}`)
        }
      }
    } else {
      // Handle alternative payment methods
      const orderStatus = paymentMethod === "bank_transfer" ? "awaiting_payment" : "pending"

      await supabase.from("orders").update({ status: orderStatus }).eq("id", order.id)

      // Create QR codes for non-Stripe payments
      await createQRCodesForOrder(order.id, items, metadata.plan || "premium")

      return {
        orderId: order.id,
        redirectUrl: `/checkout/confirmation?order_id=${order.id}&payment_method=${paymentMethod}`,
        orderDetails: order,
      }
    }
  } catch (error: any) {
    console.error("Error in createOrder:", error)

    // Return more specific error messages
    if (error.message) {
      throw new Error(error.message)
    } else {
      throw new Error("Failed to create order. Please try again.")
    }
  }
}

// Helper function to create QR codes with better error handling
async function createQRCodesForOrder(orderId: string, items: CheckoutItem[], plan: string) {
  try {
    const supabase = createServerSupabaseClient()
    const totalQuantity = items.reduce((acc, item) => acc + (item.quantity || 1), 0)

    console.log(`Creating ${totalQuantity} QR codes for order ${orderId}`)

    const qrCodePromises = []
    for (let i = 0; i < totalQuantity; i++) {
      const uniqueCode = `QR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}-${i}`
      qrCodePromises.push(
        supabase.from("qr_codes").insert({
          order_id: orderId,
          unique_code: uniqueCode,
          design_type: plan,
          status: "pending",
        }),
      )
    }

    await Promise.all(qrCodePromises)
    console.log(`Successfully created ${totalQuantity} QR codes`)
  } catch (qrError) {
    console.error("Error creating QR codes:", qrError)
    // Don't throw here, order was created successfully
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

// Get checkout session details from Stripe with better error handling
export async function getCheckoutSession(sessionId: string) {
  try {
    if (!stripe) {
      throw new Error("Stripe not configured")
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const supabase = createServerSupabaseClient()

    // Get order details from database
    const { data: order } = await supabase.from("orders").select("*").eq("stripe_session_id", sessionId).single()

    return {
      id: session.id,
      status: session.payment_status === "paid" ? "paid" : session.status,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      metadata: session.metadata,
      reference_number: order?.reference_number || sessionId,
      payment_method: "stripe",
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
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

// Create a simple checkout session for client-side Stripe
export async function createCheckoutSession(items: CheckoutItem[]) {
  try {
    const amount = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0)
    const shippingCost = 4.99
    const totalAmount = amount + shippingCost

    return {
      items,
      amount: totalAmount,
      currency: "usd",
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session")
  }
}
