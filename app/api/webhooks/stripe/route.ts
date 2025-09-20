import { type NextRequest, NextResponse } from "next/navigation"
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

        // Extract customer information from metadata
        const customerName = paymentIntent.metadata.customer_name
        const customerEmail = paymentIntent.metadata.customer_email
        const customerPhone = paymentIntent.metadata.customer_phone

        // Here you would typically:
        // 1. Update your database with the successful payment
        // 2. Create the memorial record in your database
        // 3. Send confirmation email to customer
        // 4. Generate QR code and memorial page
        // 5. Schedule physical plaque shipment
        // 6. Log the transaction for analytics

        console.log("Processing successful payment for:", {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          customerName,
          customerEmail,
          customerPhone,
        })

        // Example: Send confirmation email (you would implement this)
        // await sendConfirmationEmail({
        //   email: customerEmail,
        //   name: customerName,
        //   paymentIntentId: paymentIntent.id,
        //   amount: paymentIntent.amount / 100,
        // })

        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log("Payment failed:", failedPayment.id)

        // Handle failed payment
        // 1. Log the failure for analytics
        // 2. Send failure notification if needed
        // 3. Update any relevant records

        console.log("Payment failed for:", {
          paymentIntentId: failedPayment.id,
          amount: failedPayment.amount,
          lastPaymentError: failedPayment.last_payment_error,
        })

        break

      case "customer.created":
        const customer = event.data.object as Stripe.Customer
        console.log("New customer created:", customer.id)

        // Handle new customer creation
        // 1. Add customer to your database
        // 2. Set up customer profile
        // 3. Send welcome email

        break

      case "payment_intent.created":
        const createdPaymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment intent created:", createdPaymentIntent.id)

        // Handle payment intent creation
        // 1. Log the creation for tracking
        // 2. Update order status if needed

        break

      case "payment_method.attached":
        const paymentMethod = event.data.object as Stripe.PaymentMethod
        console.log("Payment method attached:", paymentMethod.id)

        // Handle payment method attachment
        // 1. Update customer payment methods
        // 2. Set as default if first method

        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
