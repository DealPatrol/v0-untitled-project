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
    const phoneRegex = /^$$?([0-9]{3})$$?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (!phoneRegex.test(paymentData.phone)) {
      throw new Error("Invalid phone number format")
    }

    // Validate zip code
    const zipRegex = /^\d{5}(-\d{4})?$/
    if (!zipRegex.test(paymentData.zipCode)) {
      throw new Error("Invalid zip code format")
    }

    // In a real application, you would:
    // 1. Create a Stripe payment intent
    // 2. Process the payment
    // 3. Save order to database
    // 4. Generate QR code
    // 5. Send confirmation email

    // For now, simulate successful payment
    const orderId = `MQR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create order record (in real app, save to database)
    const order = {
      id: orderId,
      customerInfo: paymentData,
      status: "completed",
      amount: paymentData.amount,
      createdAt: new Date().toISOString(),
      qrCodeUrl: `https://memorialqr.com/qr/${orderId}`,
    }

    console.log("Order created:", order)

    // Redirect to confirmation page
    redirect(`/checkout/confirmation?orderId=${orderId}`)
  } catch (error) {
    console.error("Payment processing error:", error)
    throw new Error(error instanceof Error ? error.message : "Payment processing failed")
  }
}

export async function createStripePaymentIntent(amount: number) {
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
