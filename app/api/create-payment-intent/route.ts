import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { z } from "zod"
import { randomUUID } from "crypto"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const createPaymentIntentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default("usd"),
  customerInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.object({
      line1: z.string(),
      city: z.string(),
      state: z.string(),
      postal_code: z.string(),
      country: z.string().default("US"),
    }),
  }),
  orderId: z.string().optional(), // Optional order ID for idempotency
})

/**
 * Enhanced logging utility for payment processing
 * Includes timestamp, request ID, and structured data
 */
function logPaymentEvent(level: "info" | "warn" | "error", message: string, data?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const logData = {
    timestamp,
    level,
    message,
    service: "payment-intent-api",
    ...data,
  }
  
  if (level === "error") {
    console.error(JSON.stringify(logData))
  } else if (level === "warn") {
    console.warn(JSON.stringify(logData))
  } else {
    console.log(JSON.stringify(logData))
  }
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID()
  
  logPaymentEvent("info", "Payment intent creation initiated", {
    requestId,
    userAgent: request.headers.get("user-agent"),
  })

  try {
    const body = await request.json()
    
    logPaymentEvent("info", "Request body parsed", {
      requestId,
      hasCustomerInfo: !!body.customerInfo,
      amount: body.amount,
      currency: body.currency,
    })

    const { amount, currency, customerInfo, orderId } = createPaymentIntentSchema.parse(body)

    // Generate idempotency key based on order ID or create a new one
    // This ensures retries with same order don't create duplicate payment intents
    const idempotencyKey = orderId ? `pi_${orderId}` : `pi_${requestId}`
    
    logPaymentEvent("info", "Creating payment intent with Stripe", {
      requestId,
      idempotencyKey,
      amount: Math.round(amount * 100),
      currency,
      customerEmail: customerInfo.email,
    })

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone || "",
          customer_address: JSON.stringify(customerInfo.address),
          order_id: orderId || "",
          request_id: requestId,
        },
      },
      {
        idempotencyKey, // Stripe will use this to prevent duplicate payment intents
      }
    )

    logPaymentEvent("info", "Payment intent created successfully", {
      requestId,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      requestId,
    })
  } catch (error) {
    // Enhanced error logging with context
    if (error instanceof z.ZodError) {
      logPaymentEvent("warn", "Validation error in payment intent request", {
        requestId,
        validationErrors: error.errors,
      })
      
      return NextResponse.json(
        { 
          error: "Invalid request data", 
          details: error.errors,
          requestId,
        }, 
        { status: 400 }
      )
    }

    if (error instanceof Stripe.errors.StripeError) {
      logPaymentEvent("error", "Stripe API error", {
        requestId,
        stripeErrorType: error.type,
        stripeErrorCode: error.code,
        stripeErrorMessage: error.message,
        stripeRequestId: error.requestId,
      })

      // Return user-friendly error without exposing internal details
      return NextResponse.json(
        {
          error: "Payment processing error. Please try again.",
          requestId,
        },
        { status: 500 }
      )
    }

    // Generic error handling
    logPaymentEvent("error", "Unexpected error creating payment intent", {
      requestId,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      { 
        error: "Failed to create payment intent. Please try again.",
        requestId,
      }, 
      { status: 500 }
    )
  }
}
