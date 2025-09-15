"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

// Validation schemas
const CreateOrderSchema = z.object({
  customerEmail: z.string().email("Invalid email address"),
  customerName: z.string().min(1, "Name is required"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  shippingAddress: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
    country: z.string().default("US"),
  }),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number().positive(),
      quantity: z.number().positive(),
    }),
  ),
})

const PaymentIntentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("usd"),
  customerEmail: z.string().email("Invalid email address"),
  orderId: z.string().min(1, "Order ID is required"),
})

const CheckoutSessionSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  successUrl: z.string().url("Invalid success URL"),
  cancelUrl: z.string().url("Invalid cancel URL"),
})

const ProcessPaymentSchema = z.object({
  paymentMethodId: z.string().min(1, "Payment method ID is required"),
  paymentIntentId: z.string().min(1, "Payment intent ID is required"),
  orderId: z.string().min(1, "Order ID is required"),
})

const RefundPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, "Payment intent ID is required"),
  amount: z.number().positive("Refund amount must be positive").optional(),
  reason: z.enum(["duplicate", "fraudulent", "requested_by_customer"]).default("requested_by_customer"),
})

// Types
export type CreateOrderData = z.infer<typeof CreateOrderSchema>
export type PaymentIntentData = z.infer<typeof PaymentIntentSchema>
export type CheckoutSessionData = z.infer<typeof CheckoutSessionSchema>
export type ProcessPaymentData = z.infer<typeof ProcessPaymentSchema>
export type RefundPaymentData = z.infer<typeof RefundPaymentSchema>

export interface OrderResult {
  success: boolean
  orderId?: string
  error?: string
}

export interface PaymentIntentResult {
  success: boolean
  clientSecret?: string
  paymentIntentId?: string
  error?: string
}

export interface CheckoutSessionResult {
  success: boolean
  sessionUrl?: string
  sessionId?: string
  error?: string
}

export interface PaymentResult {
  success: boolean
  paymentId?: string
  status?: string
  error?: string
}

export interface RefundResult {
  success: boolean
  refundId?: string
  amount?: number
  status?: string
  error?: string
}

// Create Order
export async function createOrder(data: CreateOrderData): Promise<OrderResult> {
  try {
    // Validate input data
    const validatedData = CreateOrderSchema.parse(data)

    // Simulate order creation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate mock order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // In a real implementation, you would:
    // 1. Save order to database
    // 2. Calculate taxes and shipping
    // 3. Validate inventory
    // 4. Create order record

    console.log("Order created:", { orderId, ...validatedData })

    return {
      success: true,
      orderId,
    }
  } catch (error) {
    console.error("Create order error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(", "),
      }
    }

    return {
      success: false,
      error: "Failed to create order. Please try again.",
    }
  }
}

// Create Payment Intent
export async function createPaymentIntent(formData: FormData): Promise<PaymentIntentResult> {
  try {
    const amount = 14900 // $149.00 in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        product: "memorial_package",
        name: formData.get("name") as string,
        email: formData.get("email") as string,
      },
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error) {
    console.error("Payment intent creation failed:", error)
    return {
      success: false,
      error: "Failed to create payment intent",
    }
  }
}

// Create Checkout Session
export async function getCheckoutSession(data: CheckoutSessionData): Promise<CheckoutSessionResult> {
  try {
    // Validate input data
    const validatedData = CheckoutSessionSchema.parse(data)

    // Simulate checkout session creation
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Generate mock session
    const sessionId = `cs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const sessionUrl = `https://checkout.stripe.com/pay/${sessionId}`

    // In a real implementation, you would:
    // 1. Create Stripe checkout session
    // 2. Configure line items
    // 3. Set up success/cancel URLs
    // 4. Configure shipping options

    console.log("Checkout session created:", { sessionId, ...validatedData })

    return {
      success: true,
      sessionUrl,
      sessionId,
    }
  } catch (error) {
    console.error("Create checkout session error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(", "),
      }
    }

    return {
      success: false,
      error: "Failed to create checkout session. Please try again.",
    }
  }
}

// Process Payment
export async function processPayment(paymentData: {
  paymentIntentId: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}): Promise<PaymentResult> {
  try {
    // Update payment intent with customer details
    await stripe.paymentIntents.update(paymentData.paymentIntentId, {
      metadata: {
        ...paymentData,
      },
    })

    // Redirect to success page
    redirect("/checkout/success")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Payment processing failed:", error)
    return {
      success: false,
      error: "Payment processing failed",
    }
  }
}

// Refund Payment
export async function refundPayment(data: RefundPaymentData): Promise<RefundResult> {
  try {
    // Validate input data
    const validatedData = RefundPaymentSchema.parse(data)

    // Simulate refund processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock refund result
    const refundId = `re_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const amount = validatedData.amount || 11999 // Default to $119.99
    const status = "succeeded"

    // In a real implementation, you would:
    // 1. Create refund with Stripe
    // 2. Update order status
    // 3. Send refund confirmation
    // 4. Handle partial refunds

    console.log("Refund processed:", { refundId, amount, status, ...validatedData })

    return {
      success: true,
      refundId,
      amount,
      status,
    }
  } catch (error) {
    console.error("Refund payment error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(", "),
      }
    }

    return {
      success: false,
      error: "Failed to process refund. Please try again.",
    }
  }
}
