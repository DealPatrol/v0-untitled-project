"use server"

import { z } from "zod"

// Validation schemas
const CreateOrderSchema = z.object({
  customerEmail: z.string().email("Please enter a valid email address"),
  customerName: z.string().min(1, "Name is required"),
  customerPhone: z.string().regex(/^\+?[\d\s\-$$$$]{10,}$/, "Please enter a valid phone number"),
  shippingAddress: z.object({
    line1: z.string().min(1, "Address is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postal_code: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
    country: z.string().default("US"),
  }),
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
  ),
})

const PaymentIntentSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
  currency: z.string().default("usd"),
  customerEmail: z.string().email("Please enter a valid email address"),
})

const CheckoutSessionSchema = z.object({
  priceId: z.string().min(1, "Price ID is required"),
  customerEmail: z.string().email("Please enter a valid email address"),
  successUrl: z.string().url("Invalid success URL"),
  cancelUrl: z.string().url("Invalid cancel URL"),
})

// Mock payment processing functions
export async function createOrder(formData: FormData) {
  try {
    const rawData = {
      customerEmail: formData.get("customerEmail"),
      customerName: formData.get("customerName"),
      customerPhone: formData.get("customerPhone"),
      shippingAddress: {
        line1: formData.get("addressLine1"),
        line2: formData.get("addressLine2") || "",
        city: formData.get("city"),
        state: formData.get("state"),
        postal_code: formData.get("zipCode"),
        country: "US",
      },
      items: [
        {
          name: "Memorial QR Code Package",
          price: 11999, // $119.99 in cents
          quantity: 1,
        },
      ],
    }

    const validatedData = CreateOrderSchema.parse(rawData)

    // Simulate order creation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      success: true,
      orderId,
      message: "Order created successfully",
      data: validatedData,
    }
  } catch (error) {
    console.error("Order creation error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      }
    }

    return {
      success: false,
      error: "Failed to create order. Please try again.",
    }
  }
}

export async function createPaymentIntent(data: {
  amount: number
  currency?: string
  customerEmail: string
}) {
  try {
    const validatedData = PaymentIntentSchema.parse(data)

    // Simulate payment intent creation
    await new Promise((resolve) => setTimeout(resolve, 800))

    const paymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const clientSecret = `${paymentIntentId}_secret_${Math.random().toString(36).substr(2, 16)}`

    return {
      success: true,
      paymentIntentId,
      clientSecret,
      amount: validatedData.amount,
      currency: validatedData.currency,
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
      error: "Failed to create payment intent. Please try again.",
    }
  }
}

export async function getCheckoutSession(data: {
  priceId: string
  customerEmail: string
  successUrl: string
  cancelUrl: string
}) {
  try {
    const validatedData = CheckoutSessionSchema.parse(data)

    // Simulate checkout session creation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const sessionId = `cs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const checkoutUrl = `https://checkout.stripe.com/pay/${sessionId}`

    return {
      success: true,
      sessionId,
      url: checkoutUrl,
      data: validatedData,
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
      error: "Failed to create checkout session. Please try again.",
    }
  }
}

// Additional payment utilities
export async function validatePayment(paymentIntentId: string) {
  try {
    // Simulate payment validation
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      status: "succeeded",
      paymentIntentId,
      amount: 11999,
      currency: "usd",
    }
  } catch (error) {
    console.error("Payment validation error:", error)
    return {
      success: false,
      error: "Failed to validate payment",
    }
  }
}

export async function refundPayment(paymentIntentId: string, amount?: number) {
  try {
    // Simulate refund processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const refundId = `re_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      success: true,
      refundId,
      paymentIntentId,
      amount: amount || 11999,
      status: "succeeded",
    }
  } catch (error) {
    console.error("Refund processing error:", error)
    return {
      success: false,
      error: "Failed to process refund",
    }
  }
}

export async function getPaymentStatus(paymentIntentId: string) {
  try {
    // Simulate payment status check
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      paymentIntentId,
      status: "succeeded",
      amount: 11999,
      currency: "usd",
      created: Date.now(),
    }
  } catch (error) {
    console.error("Payment status check error:", error)
    return {
      success: false,
      error: "Failed to get payment status",
    }
  }
}
