import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerSupabaseClient } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || process.env.strip_webhook_secret || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      console.error("No Stripe signature found")
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    if (!webhookSecret) {
      console.error("No webhook secret configured")
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("Received Stripe webhook event:", event.type)

    const supabase = createServerSupabaseClient()

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        console.log("Checkout session completed:", session.id)

        // Find the order by Stripe session ID
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("stripe_session_id", session.id)
          .single()

        if (orderError || !order) {
          console.error("Order not found for session:", session.id, orderError)
          return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        // Update order status to paid
        const { error: updateError } = await supabase
          .from("orders")
          .update({
            status: "paid",
            paid_at: new Date().toISOString(),
            customer_email: session.customer_details?.email,
            customer_name: session.customer_details?.name,
          })
          .eq("id", order.id)

        if (updateError) {
          console.error("Error updating order:", updateError)
          return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
        }

        // Activate QR codes for this order
        const { error: qrError } = await supabase.from("qr_codes").update({ status: "active" }).eq("order_id", order.id)

        if (qrError) {
          console.error("Error activating QR codes:", qrError)
        }

        console.log("Order updated successfully:", order.id)
        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        console.log("Payment intent succeeded:", paymentIntent.id)

        // Handle successful payment
        if (paymentIntent.metadata?.order_id) {
          const { error: updateError } = await supabase
            .from("orders")
            .update({
              status: "paid",
              paid_at: new Date().toISOString(),
              transaction_id: paymentIntent.id,
            })
            .eq("id", paymentIntent.metadata.order_id)

          if (updateError) {
            console.error("Error updating order from payment intent:", updateError)
          }
        }
        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        console.log("Payment intent failed:", paymentIntent.id)

        // Handle failed payment
        if (paymentIntent.metadata?.order_id) {
          const { error: updateError } = await supabase
            .from("orders")
            .update({
              status: "failed",
              failure_reason: paymentIntent.last_payment_error?.message || "Payment failed",
            })
            .eq("id", paymentIntent.metadata.order_id)

          if (updateError) {
            console.error("Error updating failed order:", updateError)
          }
        }
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice

        console.log("Invoice payment succeeded:", invoice.id)

        // Handle subscription payment success if needed
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice

        console.log("Invoice payment failed:", invoice.id)

        // Handle subscription payment failure if needed
        break
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription

        console.log("Subscription created:", subscription.id)

        // Handle new subscription if needed
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription

        console.log("Subscription updated:", subscription.id)

        // Handle subscription update if needed
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription

        console.log("Subscription deleted:", subscription.id)

        // Handle subscription cancellation if needed
        break
      }

      default:
        console.log("Unhandled event type:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Stripe webhook endpoint is active",
    timestamp: new Date().toISOString(),
    webhook_secret_configured: !!(process.env.STRIPE_WEBHOOK_SECRET || process.env.strip_webhook_secret),
  })
}
