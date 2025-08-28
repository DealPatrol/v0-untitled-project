"use server"

import { redirect } from "next/navigation"

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

interface PaymentIntent {
  id: string
  client_secret: string
  amount: number
  currency: string
  status: string
}

interface CheckoutSession {
  id: string
  payment_status: string
  customer_details: {
    email: string
    name: string
  }
  amount_total: number
  currency: string
  status: string
  created: number
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

    // Validate phone format (basic validation)
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(paymentData.phone.replace(/[\s\-().]/g, ""))) {
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
    // Generate unique order ID
    const orderId = `MQR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create order record (in real app, save to database)
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

export async function createStripePaymentIntent(amount: number): Promise<PaymentIntent> {
  try {
    // In a real application, you would create a Stripe payment intent here
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100, // Convert to cents
    //   currency: 'usd',
    //   metadata: {
    //     product: 'memorial-qr'
    //   }
    // })
    // return paymentIntent

    // For now, return a mock payment intent
    return {
      id: `pi_${Date.now()}`,
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100,
      currency: "usd",
      status: "requires_payment_method",
    }
  } catch (error) {
    console.error("Stripe payment intent creation error:", error)
    throw new Error("Failed to create payment intent")
  }
}

export async function createPaymentIntent(amount: number, currency = "usd"): Promise<PaymentIntent> {
  try {
    // Create payment intent with Stripe
    const paymentIntent = await createStripePaymentIntent(amount)
    return paymentIntent
  } catch (error) {
    console.error("Payment intent creation error:", error)
    throw new Error("Failed to create payment intent")
  }
}

export async function getCheckoutSession(sessionId: string): Promise<CheckoutSession> {
  try {
    // In a real application, you would retrieve the checkout session from Stripe
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const session = await stripe.checkout.sessions.retrieve(sessionId)
    // return session

    // For now, return a mock checkout session
    return {
      id: sessionId,
      payment_status: "paid",
      customer_details: {
        email: "customer@example.com",
        name: "John Doe",
      },
      amount_total: 11999, // $119.99 in cents
      currency: "usd",
      status: "complete",
      created: Math.floor(Date.now() / 1000),
    }
  } catch (error) {
    console.error("Checkout session retrieval error:", error)
    throw new Error("Failed to retrieve checkout session")
  }
}

export async function verifyPayment(paymentIntentId: string): Promise<boolean> {
  try {
    // In a real application, you would verify the payment with Stripe
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    // return paymentIntent.status === 'succeeded'

    // For now, return true (mock verification)
    return true
  } catch (error) {
    console.error("Payment verification error:", error)
    return false
  }
}

export async function refundPayment(paymentIntentId: string, amount?: number) {
  try {
    // In a real application, you would create a refund with Stripe
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const refund = await stripe.refunds.create({
    //   payment_intent: paymentIntentId,
    //   amount: amount, // Optional: partial refund
    // })
    // return refund

    // For now, return a mock refund
    return {
      id: `re_${Date.now()}`,
      amount: amount || 11999,
      currency: "usd",
      status: "succeeded",
      created: Math.floor(Date.now() / 1000),
    }
  } catch (error) {
    console.error("Refund creation error:", error)
    throw new Error("Failed to create refund")
  }
}
