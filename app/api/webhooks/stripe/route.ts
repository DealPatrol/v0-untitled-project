import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment succeeded:", paymentIntent.id)

        // Here you would typically:
        // 1. Update your database with the successful payment
        // 2. Send confirmation email to customer
        // 3. Create the memorial record
        // 4. Log the transaction

        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log("Payment failed:", failedPayment.id)

        // Handle failed payment
        // 1. Log the failure
        // 2. Notify customer if needed
        // 3. Update any relevant records

        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
