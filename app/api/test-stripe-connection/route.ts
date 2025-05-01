import { NextResponse } from "next/server"
import { verifyStripeConnection, listRecentTestEvents, checkWebhookConfig } from "@/lib/stripe-test-utils"

export async function GET() {
  try {
    // Check Stripe connection
    const connectionStatus = await verifyStripeConnection()

    // Only proceed if connection is successful
    if (!connectionStatus.success) {
      return NextResponse.json(connectionStatus, { status: 500 })
    }

    // Get recent events and webhook config
    const [eventsResult, webhookResult] = await Promise.all([listRecentTestEvents(), checkWebhookConfig()])

    return NextResponse.json({
      connection: connectionStatus,
      events: eventsResult,
      webhooks: webhookResult,
      environment: process.env.NODE_ENV,
      stripeMode: process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") ? "test" : "live",
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Error testing Stripe connection: ${error.message}`,
        error: error.toString(),
      },
      { status: 500 },
    )
  }
}
