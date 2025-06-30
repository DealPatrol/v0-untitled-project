import { NextResponse } from "next/server"

export async function GET() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || process.env.strip_webhook_secret
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    const environmentVariables = {
      STRIPE_SECRET_KEY: {
        present: !!stripeSecretKey,
        value: stripeSecretKey ? `${stripeSecretKey.substring(0, 12)}...` : null,
        required: true,
      },
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: {
        present: !!stripePublishableKey,
        value: stripePublishableKey ? `${stripePublishableKey.substring(0, 12)}...` : null,
        required: true,
      },
      STRIPE_WEBHOOK_SECRET: {
        present: !!webhookSecret,
        value: webhookSecret ? `whsec_...` : null,
        required: false,
      },
      NEXT_PUBLIC_SITE_URL: {
        present: !!siteUrl,
        value: siteUrl,
        required: true,
      },
    }

    const allRequiredPresent = Object.entries(environmentVariables)
      .filter(([, config]) => config.required)
      .every(([, config]) => config.present)

    // Determine Stripe mode
    let stripeMode = "unknown"
    if (stripeSecretKey?.startsWith("sk_test_")) {
      stripeMode = "test"
    } else if (stripeSecretKey?.startsWith("sk_live_")) {
      stripeMode = "live"
    }

    const recommendations = []

    if (!stripeSecretKey) {
      recommendations.push({
        type: "error",
        message: "Missing Stripe Secret Key",
        action: "Add STRIPE_SECRET_KEY to your environment variables",
      })
    }

    if (!stripePublishableKey) {
      recommendations.push({
        type: "error",
        message: "Missing Stripe Publishable Key",
        action: "Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables",
      })
    }

    if (!webhookSecret) {
      recommendations.push({
        type: "warning",
        message: "Missing Webhook Secret",
        action: "Add STRIPE_WEBHOOK_SECRET for webhook verification (recommended for production)",
      })
    }

    if (!siteUrl) {
      recommendations.push({
        type: "error",
        message: "Missing Site URL",
        action: "Add NEXT_PUBLIC_SITE_URL for Stripe redirects",
      })
    }

    if (stripeMode === "live") {
      recommendations.push({
        type: "warning",
        message: "Live Mode Active",
        action: "You're using live Stripe keys. Real payments will be processed!",
      })
    }

    return NextResponse.json({
      environment_variables: environmentVariables,
      stripe_mode: stripeMode,
      all_required_present: allRequiredPresent,
      recommendations,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error checking Stripe config:", error)
    return NextResponse.json(
      {
        error: "Failed to check configuration",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
