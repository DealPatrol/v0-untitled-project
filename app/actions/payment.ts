"use server"

import { z } from "zod"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

// Validation schemas
const OrderSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(10, "Valid phone number is required"),
  customerAddress: z.string().min(1, "Address is required"),
  customerCity: z.string().min(1, "City is required"),
  customerState: z.string().min(1, "State is required"),
  customerZip: z.string().min(5, "Valid zip code is required"),
  memorialName: z.string().min(1, "Memorial name is required"),
  memorialBio: z.string().min(1, "Biography is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
})

const PaymentIntentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default("usd"),
  orderId: z.string().min(1),
})

const CheckoutSessionSchema = z.object({
  orderId: z.string().min(1),
  amount: z.number().min(1),
  customerEmail: z.string().email(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
})

export async function createOrder(formData: FormData) {
  try {
    const rawData = {
      customerName: formData.get("customerName") as string,
      customerEmail: formData.get("customerEmail") as string,
      customerPhone: formData.get("customerPhone") as string,
      customerAddress: formData.get("customerAddress") as string,
      customerCity: formData.get("customerCity") as string,
      customerState: formData.get("customerState") as string,
      customerZip: formData.get("customerZip") as string,
      memorialName: formData.get("memorialName") as string,
      memorialBio: formData.get("memorialBio") as string,
      amount: 119.99,
    }

    const validatedData = OrderSchema.parse(rawData)

    // Mock order creation - replace with actual database logic
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log("Creating order:", { orderId, ...validatedData })

    return {
      success: true,
      orderId,
      message: "Order created successfully",
    }
  } catch (error) {
    console.error("Order creation error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      }
    }

    return {
      success: false,
      error: "Failed to create order",
    }
  }
}

export async function createPaymentIntent(data: {
  amount: number
  currency?: string
  orderId: string
}) {
  try {
    const validatedData = PaymentIntentSchema.parse(data)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validatedData.amount * 100), // Convert to cents
      currency: validatedData.currency,
      metadata: {
        orderId: validatedData.orderId,
      },
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error) {
    console.error("Payment intent creation error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid payment data",
        details: error.errors,
      }
    }

    return {
      success: false,
      error: "Failed to create payment intent",
    }
  }
}

export async function getCheckoutSession(data: {
  orderId: string
  amount: number
  customerEmail: string
  successUrl: string
  cancelUrl: string
}) {
  try {
    const validatedData = CheckoutSessionSchema.parse(data)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Memorial QR Code",
              description: "Digital memorial with QR code plaque",
            },
            unit_amount: Math.round(validatedData.amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: validatedData.successUrl,
      cancel_url: validatedData.cancelUrl,
      customer_email: validatedData.customerEmail,
      metadata: {
        orderId: validatedData.orderId,
      },
    })

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
    }
  } catch (error) {
    console.error("Checkout session creation error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid checkout data",
        details: error.errors,
      }
    }

    return {
      success: false,
      error: "Failed to create checkout session",
    }
  }
}

export async function processPayment(paymentData: {
  paymentMethodId: string
  amount: number
  orderId: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
}) {
  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(paymentData.amount * 100),
      currency: "usd",
      payment_method: paymentData.paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      metadata: {
        orderId: paymentData.orderId,
        customerName: paymentData.customerInfo.name,
        customerEmail: paymentData.customerInfo.email,
      },
    })

    if (paymentIntent.status === "succeeded") {
      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        message: "Payment processed successfully",
      }
    } else {
      return {
        success: false,
        error: "Payment requires additional action",
        clientSecret: paymentIntent.client_secret,
      }
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    return {
      success: false,
      error: "Payment processing failed",
    }
  }
}

export async function refundPayment(paymentIntentId: string, amount?: number) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    })

    return {
      success: true,
      refundId: refund.id,
      status: refund.status,
    }
  } catch (error) {
    console.error("Refund error:", error)
    return {
      success: false,
      error: "Refund processing failed",
    }
  }
}
