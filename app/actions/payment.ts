"use server"

import { redirect } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

interface PaymentData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  amount: number
}

interface OrderData {
  id: string
  customerInfo: PaymentData
  status: string
  amount: number
  createdAt: string
  qrCodeUrl: string
}

export async function processPayment(formData: FormData) {
  try {
    // Extract form data
    const paymentData: PaymentData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      amount: 119.99,
    }

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"]
    for (const field of requiredFields) {
      if (!paymentData[field as keyof PaymentData]) {
        throw new Error(`${field} is required`)
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(paymentData.email)) {
      throw new Error("Invalid email format")
    }

    // Validate phone format (fixed regex)
    const phoneRegex = /^$$?([0-9]{3})$$?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (!phoneRegex.test(paymentData.phone)) {
      throw new Error("Invalid phone number format")
    }

    // Validate zip code
    const zipRegex = /^\d{5}(-\d{4})?$/
    if (!zipRegex.test(paymentData.zipCode)) {
      throw new Error("Invalid zip code format")
    }

    // Create order
    const order = await createOrder(paymentData)

    // Redirect to confirmation page
    redirect(`/checkout/confirmation?orderId=${order.id}`)
  } catch (error) {
    console.error("Payment processing error:", error)
    throw new Error(error instanceof Error ? error.message : "Payment processing failed")
  }
}

export async function createOrder(paymentData: PaymentData): Promise<OrderData> {
  try {
    // Generate order ID
    const orderId = `MQR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create order record
    const order: OrderData = {
      id: orderId,
      customerInfo: paymentData,
      status: "completed",
      amount: paymentData.amount,
      createdAt: new Date().toISOString(),
      qrCodeUrl: `https://memorialqr.com/qr/${orderId}`,
    }

    console.log("Order created:", order)
    return order
  } catch (error) {
    console.error("Order creation error:", error)
    throw new Error("Failed to create order")
  }
}

export async function createPaymentIntent(amount: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        product: "memorial-qr",
      },
    })

    return {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    }
  } catch (error) {
    console.error("Stripe payment intent creation error:", error)
    throw new Error("Failed to create payment intent")
  }
}

export async function createStripePaymentIntent(amount: number) {
  return createPaymentIntent(amount)
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return {
      id: session.id,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
    }
  } catch (error) {
    console.error("Stripe checkout session retrieval error:", error)
    throw new Error("Failed to retrieve checkout session")
  }
}
