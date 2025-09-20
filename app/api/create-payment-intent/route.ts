import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { z } from "zod"

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
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, customerInfo } = createPaymentIntentSchema.parse(body)

    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: customerInfo.email,
      limit: 1,
    })

    let customer
    if (customers.data.length > 0) {
      customer = customers.data[0]
    } else {
      customer = await stripe.customers.create({
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        metadata: {
          source: "memorial_qr_website",
        },
      })
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount should already be in cents
      currency,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone || "",
        product: "memorial_qr_package",
        package_type: "premium",
      },
      description: "Memorial QR Premium Package - Digital memorial with QR code and physical plaque",
      receipt_email: customerInfo.email,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      customerId: customer.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
        },
        { status: 400 },
      )
    }

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: "Payment processing error",
          details: error.message,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to create payment intent",
        details: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    )
  }
}
