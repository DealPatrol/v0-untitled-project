import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerSupabaseClient } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.strip_webhook_secret || ""

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature") || ""

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        // Update order status in database
        await supabase.from("orders").update({ status: "paid" }).eq("stripe_session_id", session.id)

        // Create QR codes for the order
        const plan = session.metadata?.plan || "premium"
        const quantity = Number.parseInt(session.metadata?.quantity || "1")

        // Check if QR codes already exist for this order
        const { data: existingQrCodes } = await supabase.from("qr_codes").select("id").eq("order_id", session.id)

        // Only create QR codes if they don't exist yet
        if (!existingQrCodes || existingQrCodes.length === 0) {
          const qrCodePromises = []
          for (let i = 0; i < quantity; i++) {
            const uniqueCode = `QR-${Math.floor(100000 + Math.random() * 900000)}`
            qrCodePromises.push(
              supabase.from("qr_codes").insert({
                order_id: session.id,
                unique_code: uniqueCode,
                design_type: plan,
                status: "pending",
              }),
            )
          }

          await Promise.all(qrCodePromises)
        }

        break
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Update order status in database
        await supabase.from("orders").update({ status: "failed" }).eq("stripe_session_id", paymentIntent.id)

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
