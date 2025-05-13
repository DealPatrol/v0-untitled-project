import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Safely check environment variables
    const config = {
      stripeConfigured: typeof process.env.STRIPE_SECRET_KEY === "string" && process.env.STRIPE_SECRET_KEY.length > 0,
      stripeWebhookConfigured:
        typeof process.env.strip_webhook_secret === "string" && process.env.strip_webhook_secret.length > 0,
      publicUrlConfigured:
        typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL.length > 0,
      publicStripeConfigured:
        typeof process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === "string" &&
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.length > 0,
      nodeEnv: process.env.NODE_ENV || "unknown",
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error("Error in debug config route:", error)
    return NextResponse.json(
      { error: "Failed to check configuration", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
