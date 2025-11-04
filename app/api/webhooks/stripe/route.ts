import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

/**
 * Enhanced logging utility for webhook events
 */
function logWebhookEvent(level: "info" | "warn" | "error", message: string, data?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const logData = {
    timestamp,
    level,
    message,
    service: "stripe-webhook",
    ...data,
  }
  
  if (level === "error") {
    console.error(JSON.stringify(logData))
  } else if (level === "warn") {
    console.warn(JSON.stringify(logData))
  } else {
    console.log(JSON.stringify(logData))
  }
}

/**
 * Process successful payment intent
 * This is called when a payment succeeds on Stripe
 */
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  const metadata = paymentIntent.metadata
  
  logWebhookEvent("info", "Processing successful payment", {
    paymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    customerEmail: metadata.customer_email,
    orderId: metadata.order_id,
    requestId: metadata.request_id,
  })

  try {
    // Step 1: Update database with successful payment
    // This should be implemented with your database logic
    // Example: await updateOrderPaymentStatus(metadata.order_id, 'succeeded', paymentIntent.id)
    
    logWebhookEvent("info", "Database update would occur here", {
      paymentIntentId: paymentIntent.id,
      orderId: metadata.order_id,
      status: "succeeded",
    })

    // Step 2: Send confirmation email to customer
    // Example: await sendPaymentConfirmationEmail(metadata.customer_email, paymentIntent.id)
    
    logWebhookEvent("info", "Confirmation email would be sent", {
      paymentIntentId: paymentIntent.id,
      customerEmail: metadata.customer_email,
    })

    // Step 3: Create memorial record or fulfill order
    // Example: await createMemorialRecord(metadata.order_id, paymentIntent.id)
    
    logWebhookEvent("info", "Order fulfillment would be triggered", {
      paymentIntentId: paymentIntent.id,
      orderId: metadata.order_id,
    })

    logWebhookEvent("info", "Payment success processing completed", {
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    // Log error but don't throw - webhook should still return 200 to Stripe
    // Failed processing can be retried via webhook replay or manual reconciliation
    logWebhookEvent("error", "Error processing payment success", {
      paymentIntentId: paymentIntent.id,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })
    
    // In production, you might want to:
    // 1. Store this event in a "failed webhooks" queue for retry
    // 2. Send an alert to operations team
    // 3. Mark the order as "needs_manual_review" in the database
  }
}

/**
 * Process failed payment intent
 */
async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  const metadata = paymentIntent.metadata
  const lastError = paymentIntent.last_payment_error
  
  logWebhookEvent("warn", "Processing failed payment", {
    paymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount,
    customerEmail: metadata.customer_email,
    orderId: metadata.order_id,
    failureCode: lastError?.code,
    failureMessage: lastError?.message,
  })

  try {
    // Step 1: Update database with failed payment status
    logWebhookEvent("info", "Database update for failed payment", {
      paymentIntentId: paymentIntent.id,
      orderId: metadata.order_id,
      status: "failed",
      failureReason: lastError?.message,
    })

    // Step 2: Notify customer if needed (optional, they already see error in UI)
    logWebhookEvent("info", "Customer notification for failed payment (optional)", {
      paymentIntentId: paymentIntent.id,
      customerEmail: metadata.customer_email,
    })

    logWebhookEvent("info", "Payment failure processing completed", {
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    logWebhookEvent("error", "Error processing payment failure", {
      paymentIntentId: paymentIntent.id,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * Process payment intent requiring action (e.g., 3D Secure)
 */
async function handlePaymentRequiresAction(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  const metadata = paymentIntent.metadata
  
  logWebhookEvent("info", "Payment requires customer action", {
    paymentIntentId: paymentIntent.id,
    orderId: metadata.order_id,
    customerEmail: metadata.customer_email,
    nextAction: paymentIntent.next_action?.type,
  })

  // Customer will be prompted in the UI to complete authentication
  // No action needed here, just log for tracking
}

/**
 * Process payment intent that was canceled
 */
async function handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  const metadata = paymentIntent.metadata
  
  logWebhookEvent("info", "Payment was canceled", {
    paymentIntentId: paymentIntent.id,
    orderId: metadata.order_id,
    cancellationReason: paymentIntent.cancellation_reason,
  })

  // Update order status to canceled if needed
}

export async function POST(request: NextRequest) {
  const webhookId = `wh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  logWebhookEvent("info", "Webhook received", {
    webhookId,
    userAgent: request.headers.get("user-agent"),
  })

  let body: string
  let signature: string | null

  try {
    body = await request.text()
    signature = request.headers.get("stripe-signature")

    if (!signature) {
      logWebhookEvent("error", "Missing Stripe signature header", { webhookId })
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    logWebhookEvent("info", "Webhook signature present", { webhookId })
  } catch (error) {
    logWebhookEvent("error", "Failed to read webhook request", {
      webhookId,
      error: error instanceof Error ? error.message : "Unknown error",
    })
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    
    logWebhookEvent("info", "Webhook signature verified", {
      webhookId,
      eventId: event.id,
      eventType: event.type,
      livemode: event.livemode,
    })
  } catch (error) {
    logWebhookEvent("error", "Webhook signature verification failed", {
      webhookId,
      error: error instanceof Error ? error.message : "Unknown error",
    })
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    // Process webhook event based on type
    switch (event.type) {
      case "payment_intent.succeeded":
        const successfulPayment = event.data.object as Stripe.PaymentIntent
        await handlePaymentSuccess(successfulPayment)
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailure(failedPayment)
        break

      case "payment_intent.requires_action":
        const actionRequired = event.data.object as Stripe.PaymentIntent
        await handlePaymentRequiresAction(actionRequired)
        break

      case "payment_intent.canceled":
        const canceledPayment = event.data.object as Stripe.PaymentIntent
        await handlePaymentCanceled(canceledPayment)
        break

      case "payment_intent.created":
        // Just log, no action needed
        const createdPayment = event.data.object as Stripe.PaymentIntent
        logWebhookEvent("info", "Payment intent created", {
          webhookId,
          eventId: event.id,
          paymentIntentId: createdPayment.id,
        })
        break

      case "payment_intent.processing":
        // Payment is being processed, log for tracking
        const processingPayment = event.data.object as Stripe.PaymentIntent
        logWebhookEvent("info", "Payment intent processing", {
          webhookId,
          eventId: event.id,
          paymentIntentId: processingPayment.id,
        })
        break

      default:
        logWebhookEvent("info", "Unhandled webhook event type", {
          webhookId,
          eventId: event.id,
          eventType: event.type,
        })
    }

    logWebhookEvent("info", "Webhook processed successfully", {
      webhookId,
      eventId: event.id,
      eventType: event.type,
    })

    // Always return 200 to Stripe to acknowledge receipt
    // Even if internal processing fails, we've logged it for manual review
    return NextResponse.json({ received: true, webhookId, eventId: event.id })
  } catch (error) {
    // Log the error but still return 200 to Stripe
    // This prevents Stripe from retrying due to our internal errors
    // The error is logged and can be handled via monitoring/alerts
    logWebhookEvent("error", "Error processing webhook event", {
      webhookId,
      eventId: event.id,
      eventType: event.type,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    // Return 200 to acknowledge receipt even on processing error
    // Stripe will not retry if we return 200
    // Failed events should be handled via manual reconciliation or event replay
    return NextResponse.json(
      { 
        received: true, 
        webhookId,
        eventId: event.id,
        warning: "Event received but processing encountered errors. Check logs.",
      },
      { status: 200 }
    )
  }
}
