import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerSupabaseClient } from "@/lib/supabase"
import { headers } from "next/headers"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

// Get webhook secret from environment variables
const webhookSecret = process.env.strip_webhook_secret || ""

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const headersList = headers()
    const signature = headersList.get("stripe-signature") || ""

    let event: Stripe.Event

    try {
      // Verify the event came from Stripe
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      console.log(`✅ Webhook verified: ${event.type}`)
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Handle specific event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`💰 Payment successful for session: ${session.id}`)

        // Retrieve customer information
        const customerEmail = session.customer_details?.email || ""
        const customerName = session.customer_details?.name || ""

        // Update order status in database
        const { data: order, error: updateError } = await supabase
          .from("orders")
          .update({
            status: "paid",
            customer_email: customerEmail,
            customer_name: customerName,
            payment_date: new Date().toISOString(),
          })
          .eq("stripe_session_id", session.id)
          .select()
          .single()

        if (updateError) {
          console.error(`❌ Error updating order: ${updateError.message}`)
          return NextResponse.json({ error: "Error updating order" }, { status: 500 })
        }

        if (order) {
          // Create QR codes for the order
          const plan = session.metadata?.plan || "premium"
          const quantity = Number.parseInt(session.metadata?.quantity || "1")

          // Check if QR codes already exist for this order
          const { data: existingQrCodes } = await supabase.from("qr_codes").select("id").eq("order_id", order.id)

          // Only create QR codes if they don't exist yet
          if (!existingQrCodes || existingQrCodes.length === 0) {
            const qrCodePromises = []
            for (let i = 0; i < quantity; i++) {
              const uniqueCode = `QR-${Math.floor(100000 + Math.random() * 900000)}`
              qrCodePromises.push(
                supabase.from("qr_codes").insert({
                  order_id: order.id,
                  unique_code: uniqueCode,
                  design_type: plan,
                  status: "active",
                }),
              )
            }

            await Promise.all(qrCodePromises)
            console.log(`✅ Created ${quantity} QR codes for order ${order.id}`)
          }

          // Create fulfillment record for drop shipping
          if (order.metadata?.product_type) {
            const { error: fulfillmentError } = await supabase.from("order_fulfillments").insert({
              order_id: order.id,
              supplier_id: "default-supplier-id", // You'll need to set this up
              status: "pending",
              notes: `Order for ${quantity} ${plan} QR codes`,
            })

            if (fulfillmentError) {
              console.error("Error creating fulfillment:", fulfillmentError)
            }
          }
        }

        break
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`⏰ Checkout session expired: ${session.id}`)

        // Update order status in database
        await supabase.from("orders").update({ status: "expired" }).eq("stripe_session_id", session.id)

        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`❌ Payment failed: ${paymentIntent.id}`)

        // Update order status in database
        await supabase.from("orders").update({ status: "failed" }).eq("stripe_payment_intent_id", paymentIntent.id)

        break
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge
        console.log(`💸 Payment refunded: ${charge.id}`)

        // Find the order associated with this charge
        const paymentIntentId = charge.payment_intent as string

        if (paymentIntentId) {
          // Update order status in database
          await supabase.from("orders").update({ status: "refunded" }).eq("stripe_payment_intent_id", paymentIntentId)
        }

        break
      }

      // Add more event handlers as needed
      default:
        // Unexpected event type
        console.log(`🤷‍♂️ Unhandled event type: ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true, type: event.type })
  } catch (error: any) {
    console.error(`❌ Error handling webhook: ${error.message}`)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
