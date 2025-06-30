import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      return NextResponse.json({
        success: false,
        error: "STRIPE_SECRET_KEY not found in environment variables",
        message: "Please add your Stripe secret key to continue",
      })
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    })

    try {
      // Test the connection by retrieving account information
      const account = await stripe.accounts.retrieve()

      const isLiveMode = stripeSecretKey.startsWith("sk_live_")
      const isTestMode = stripeSecretKey.startsWith("sk_test_")

      return NextResponse.json({
        success: true,
        message: `Successfully connected to Stripe ${isLiveMode ? "LIVE" : "TEST"} mode`,
        details: {
          account_id: account.id,
          business_profile: account.business_profile,
          country: account.country,
          default_currency: account.default_currency,
          email: account.email,
          mode: isLiveMode ? "live" : isTestMode ? "test" : "unknown",
          charges_enabled: account.charges_enabled,
          payouts_enabled: account.payouts_enabled,
          details_submitted: account.details_submitted,
        },
      })
    } catch (stripeError: any) {
      console.error("Stripe API error:", stripeError)

      let errorMessage = "Unknown Stripe error"
      if (stripeError.type === "StripeAuthenticationError") {
        errorMessage = "Invalid Stripe API key"
      } else if (stripeError.type === "StripePermissionError") {
        errorMessage = "Insufficient permissions for this API key"
      } else if (stripeError.message) {
        errorMessage = stripeError.message
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        message: "Failed to connect to Stripe API",
        details: {
          type: stripeError.type,
          code: stripeError.code,
          decline_code: stripeError.decline_code,
        },
      })
    }
  } catch (error) {
    console.error("Connection test error:", error)
    return NextResponse.json({
      success: false,
      error: "Connection test failed",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    })
  }
}
