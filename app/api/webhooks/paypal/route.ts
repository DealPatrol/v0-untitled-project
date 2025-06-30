import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

const PAYPAL_API_BASE =
  process.env.PAYPAL_ENVIRONMENT === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

// Verify PayPal webhook signature
async function verifyPayPalWebhook(headers: Headers, body: string) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!webhookId || !clientId || !clientSecret) {
    console.log("PayPal webhook verification skipped - credentials not configured")
    return true // Skip verification in development
  }

  try {
    // Get PayPal access token
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
    const tokenResponse = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    if (!tokenResponse.ok) {
      throw new Error("Failed to get PayPal access token for verification")
    }

    const tokenData = await tokenResponse.json()

    // Verify webhook
    const verificationData = {
      auth_algo: headers.get("paypal-auth-algo"),
      cert_id: headers.get("paypal-cert-id"),
      transmission_id: headers.get("paypal-transmission-id"),
      transmission_sig: headers.get("paypal-transmission-sig"),
      transmission_time: headers.get("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: JSON.parse(body),
    }

    const verifyResponse = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify(verificationData),
    })

    if (!verifyResponse.ok) {
      console.error("PayPal webhook verification failed")
      return false
    }

    const verifyData = await verifyResponse.json()
    return verifyData.verification_status === "SUCCESS"
  } catch (error) {
    console.error("Error verifying PayPal webhook:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headers = request.headers

    console.log("Received PayPal webhook")

    // Verify webhook (optional in development)
    const isVerified = await verifyPayPalWebhook(headers, body)
    if (!isVerified) {
      console.error("PayPal webhook verification failed")
      return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 })
    }

    const event = JSON.parse(body)
    console.log("PayPal webhook event type:", event.event_type)

    const supabase = createServerSupabaseClient()

    switch (event.event_type) {
      case "CHECKOUT.ORDER.APPROVED": {
        const orderId = event.resource.id
        console.log("PayPal order approved:", orderId)

        // Update order status to approved
        const { error } = await supabase.from("orders").update({ status: "approved" }).eq("paypal_order_id", orderId)

        if (error) {
          console.error("Error updating order to approved:", error)
        }
        break
      }

      case "PAYMENT.CAPTURE.COMPLETED": {
        const captureId = event.resource.id
        const orderId = event.resource.supplementary_data?.related_ids?.order_id

        console.log("PayPal payment captured:", captureId, "for order:", orderId)

        if (orderId) {
          // Update order status to paid
          const { data: order, error } = await supabase
            .from("orders")
            .update({
              status: "paid",
              paid_at: new Date().toISOString(),
              transaction_id: captureId,
            })
            .eq("paypal_order_id", orderId)
            .select()
            .single()

          if (error) {
            console.error("Error updating order to paid:", error)
          } else if (order) {
            // Activate QR codes
            const { error: qrError } = await supabase
              .from("qr_codes")
              .update({ status: "active" })
              .eq("order_id", order.id)

            if (qrError) {
              console.error("Error activating QR codes:", qrError)
            }
          }
        }
        break
      }

      case "PAYMENT.CAPTURE.DENIED": {
        const orderId = event.resource.supplementary_data?.related_ids?.order_id

        console.log("PayPal payment denied for order:", orderId)

        if (orderId) {
          const { error } = await supabase.from("orders").update({ status: "failed" }).eq("paypal_order_id", orderId)

          if (error) {
            console.error("Error updating order to failed:", error)
          }
        }
        break
      }

      case "PAYMENT.CAPTURE.REFUNDED": {
        const refundId = event.resource.id
        const captureId = event.resource.links
          ?.find((link: any) => link.rel === "up")
          ?.href?.split("/")
          .pop()

        console.log("PayPal payment refunded:", refundId)

        // Find order by transaction ID and update status
        const { error } = await supabase
          .from("orders")
          .update({
            status: "refunded",
            refund_id: refundId,
            refunded_at: new Date().toISOString(),
          })
          .eq("transaction_id", captureId)

        if (error) {
          console.error("Error updating order to refunded:", error)
        }
        break
      }

      case "CHECKOUT.ORDER.VOIDED": {
        const orderId = event.resource.id

        console.log("PayPal order voided:", orderId)

        const { error } = await supabase.from("orders").update({ status: "cancelled" }).eq("paypal_order_id", orderId)

        if (error) {
          console.error("Error updating order to cancelled:", error)
        }
        break
      }

      default:
        console.log("Unhandled PayPal webhook event:", event.event_type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("PayPal webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "PayPal webhook endpoint is active",
    timestamp: new Date().toISOString(),
    environment: process.env.PAYPAL_ENVIRONMENT || "sandbox",
  })
}
