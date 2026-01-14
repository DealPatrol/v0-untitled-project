import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { z } from "zod"

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
})

export async function POST(request: NextRequest) {
  try {
    // Validate Stripe configuration at runtime
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not configured")
      return NextResponse.json(
        { error: "Payment processing is not configured. Please contact support." },
        { status: 503 },
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    })

    const body = await request.json()
    const { amount, currency, customerInfo } = createPaymentIntentSchema.parse(body)

    const paymentIntent = await stripe.paymentIntents.create({
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
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
