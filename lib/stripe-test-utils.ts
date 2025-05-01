import Stripe from "stripe"

// Initialize Stripe with test API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

// Function to verify Stripe connection
export async function verifyStripeConnection() {
  try {
    // Try to fetch a simple resource from Stripe to verify connection
    const balance = await stripe.balance.retrieve()
    return {
      success: true,
      message: "Successfully connected to Stripe API",
      data: balance,
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to connect to Stripe: ${error.message}`,
      error,
    }
  }
}

// Function to list recent test events
export async function listRecentTestEvents(limit = 5) {
  try {
    const events = await stripe.events.list({
      limit,
    })
    return {
      success: true,
      events: events.data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to fetch events: ${error.message}`,
      error,
    }
  }
}

// Function to check webhook configuration
export async function checkWebhookConfig() {
  try {
    const webhooks = await stripe.webhookEndpoints.list()
    return {
      success: true,
      webhooks: webhooks.data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to fetch webhook configurations: ${error.message}`,
      error,
    }
  }
}
