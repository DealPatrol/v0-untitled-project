import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { z } from "zod"

const createPaymentIntentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default("usd"),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  plan: z.enum(["basic", "premium", "family"]),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createPaymentIntentSchema.parse(body)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: validatedData.amount,
      currency: validatedData.currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone || "",
        plan: validatedData.plan,
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

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
