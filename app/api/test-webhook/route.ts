import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function GET() {
  try {
    // List all webhook endpoints
    const webhookEndpoints = await stripe.webhookEndpoints.list()

    // Check if we have a webhook endpoint for our site
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ""
    const webhookPath = "/api/webhooks/stripe"
    const expectedWebhookUrl = siteUrl + webhookPath

    const matchingEndpoint = webhookEndpoints.data.find((endpoint) => endpoint.url === expectedWebhookUrl)

    if (matchingEndpoint) {
      return NextResponse.json({
        success: true,
        message: "Webhook endpoint found",
        endpoint: {
          id: matchingEndpoint.id,
          url: matchingEndpoint.url,
          status: matchingEndpoint.status,
          enabledEvents: matchingEndpoint.enabled_events,
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "No webhook endpoint found for this site",
        expectedUrl: expectedWebhookUrl,
        existingEndpoints: webhookEndpoints.data.map((endpoint) => endpoint.url),
      })
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Error checking webhook endpoints: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
