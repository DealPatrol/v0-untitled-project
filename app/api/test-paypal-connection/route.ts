import { NextResponse } from "next/server"

const PAYPAL_API_BASE =
  process.env.PAYPAL_ENVIRONMENT === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

export async function GET() {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET
    const environment = process.env.PAYPAL_ENVIRONMENT

    if (!clientId || !clientSecret) {
      return NextResponse.json({
        success: false,
        error: "PayPal credentials not found in environment variables",
        message: "Please add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to continue",
      })
    }

    if (!environment) {
      return NextResponse.json({
        success: false,
        error: "PayPal environment not configured",
        message: "Please add PAYPAL_ENVIRONMENT (sandbox or live) to continue",
      })
    }

    try {
      // Test the connection by getting an access token
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

      const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error_description || "Failed to authenticate with PayPal")
      }

      const tokenData = await response.json()

      return NextResponse.json({
        success: true,
        message: `Successfully connected to PayPal ${environment.toUpperCase()} environment`,
        details: {
          environment: environment,
          api_base: PAYPAL_API_BASE,
          token_type: tokenData.token_type,
          expires_in: tokenData.expires_in,
          client_id_prefix: clientId.substring(0, 8) + "...",
        },
      })
    } catch (paypalError: any) {
      console.error("PayPal API error:", paypalError)

      return NextResponse.json({
        success: false,
        error: paypalError.message || "Unknown PayPal error",
        message: "Failed to connect to PayPal API",
        details: {
          environment: environment,
          api_base: PAYPAL_API_BASE,
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
