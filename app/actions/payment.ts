"use server"

import Stripe from "stripe"
import { redirect } from "next/navigation"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

interface OrderData {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  memorialData: any
  amount: number
}

export async function createOrder(orderData: OrderData) {
  try {
    // Create customer in Stripe
    const customer = await stripe.customers.create({
      name: orderData.customerName,
      email: orderData.customerEmail,
      phone: orderData.customerPhone,
      address: {
        line1: orderData.customerAddress,
      },
    })

    // Create order record in your database here
    // const order = await createOrderInDatabase(orderData, customer.id)

    return {
      success: true,
      customerId: customer.id,
      orderId: `order_${Date.now()}`, // Replace with actual order ID
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return {
      success: false,
      error: "Failed to create order",
    }
  }
}

export async function createPaymentIntent(amount: number, orderId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        orderId,
      },
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return {
      success: false,
      error: "Failed to create payment intent",
    }
  }
}

export async function getCheckoutSession(priceId: string, successUrl: string, cancelUrl: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return {
      success: false,
      error: "Failed to create checkout session",
    }
  }
}

export async function processPayment(formData: FormData) {
  const customerName = formData.get("customerName") as string
  const customerEmail = formData.get("customerEmail") as string
  const customerPhone = formData.get("customerPhone") as string
  const customerAddress = formData.get("customerAddress") as string
  const amount = Number.parseFloat(formData.get("amount") as string) || 119.99

  // Validate phone number with corrected regex
  const phoneRegex = /^$$?([0-9]{3})$$?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  if (!phoneRegex.test(customerPhone)) {
    return {
      success: false,
      error: "Please enter a valid phone number",
    }
  }

  try {
    // Create order
    const orderResult = await createOrder({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      memorialData: {}, // Add memorial data as needed
      amount,
    })

    if (!orderResult.success) {
      return orderResult
    }

    // Create checkout session
    const sessionResult = await getCheckoutSession(
      "price_1234567890", // Replace with your actual price ID
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?cancelled=true`,
    )

    if (!sessionResult.success || !sessionResult.url) {
      return {
        success: false,
        error: "Failed to create checkout session",
      }
    }

    // Redirect to Stripe checkout
    redirect(sessionResult.url)
  } catch (error) {
    console.error("Error processing payment:", error)
    return {
      success: false,
      error: "Payment processing failed",
    }
  }
}

// Utility function to validate email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
