import { NextResponse } from "next/server"

export async function GET() {
  try {
    const paypalClientId = process.env.PAYPAL_CLIENT_ID
    const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET
    const paypalEnvironment = process.env.PAYPAL_ENVIRONMENT
    const paypalWebhookId = process.env.PAYPAL_WEBHOOK_ID
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    const environmentVariables = {
      PAYPAL_CLIENT_ID: {
        present: !!paypalClientId,
        value: paypalClientId ? `${paypalClientId.substring(0, 12)}...` : null,
        required: true,
      },
      PAYPAL_CLIENT_SECRET: {
        present: !!paypalClientSecret,
        value: paypalClientSecret ? "***hidden***" : null,
        required: true,
      },
      PAYPAL_ENVIRONMENT: {
        present: !!paypalEnvironment,
        value: paypalEnvironment,
        required: true,
      },
      PAYPAL_WEBHOOK_ID: {
        present: !!paypalWebhookId,
        value: paypalWebhookId ? `${paypalWebhookId.substring(0, 8)}...` : null,
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

    const recommendations = []

    if (!paypalClientId) {
      recommendations.push({
        type: "error",
        message: "Missing PayPal Client ID",
        action: "Add PAYPAL_CLIENT_ID to your environment variables",
      })
    }

    if (!paypalClientSecret) {
      recommendations.push({
        type: "error",
        message: "Missing PayPal Client Secret",
        action: "Add PAYPAL_CLIENT_SECRET to your environment variables",
      })
    }

    if (!paypalEnvironment) {
      recommendations.push({
        type: "error",
        message: "Missing PayPal Environment",
        action: "Add PAYPAL_ENVIRONMENT (sandbox or live) to your environment variables",
      })
    }

    if (!paypalWebhookId) {
      recommendations.push({
        type: "warning",
        message: "Missing PayPal Webhook ID",
        action: "Add PAYPAL_WEBHOOK_ID for webhook verification (recommended for production)",
      })
    }

    if (!siteUrl) {
      recommendations.push({
        type: "error",
        message: "Missing Site URL",
        action: "Add NEXT_PUBLIC_SITE_URL for PayPal redirects",
      })
    }

    if (paypalEnvironment === "live") {
      recommendations.push({
        type: "warning",
        message: "Live Mode Active",
        action: "You're using live PayPal credentials. Real payments will be processed!",
      })
    }

    return NextResponse.json({
      environment_variables: environmentVariables,
      paypal_environment: paypalEnvironment || "not_set",
      all_required_present: allRequiredPresent,
      recommendations,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error checking PayPal config:", error)
    return NextResponse.json(
      {
        error: "Failed to check configuration",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
