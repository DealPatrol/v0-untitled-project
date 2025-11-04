/**
 * Payment utilities for handling payment status, reconciliation, and error recovery
 */

import type Stripe from "stripe"

export type PaymentStatus = 
  | "pending"
  | "processing" 
  | "succeeded"
  | "failed"
  | "canceled"
  | "requires_action"
  | "unknown"

/**
 * Map Stripe payment intent status to our internal status
 */
export function mapStripeStatus(stripeStatus: string): PaymentStatus {
  switch (stripeStatus) {
    case "succeeded":
      return "succeeded"
    case "processing":
      return "processing"
    case "requires_payment_method":
    case "requires_confirmation":
      return "pending"
    case "requires_action":
      return "requires_action"
    case "canceled":
      return "canceled"
    default:
      return "unknown"
  }
}

/**
 * Check if a payment is in a final state (won't change anymore)
 */
export function isPaymentFinal(status: PaymentStatus): boolean {
  return status === "succeeded" || status === "failed" || status === "canceled"
}

/**
 * Check if a payment is in a state that requires user action
 */
export function requiresUserAction(status: PaymentStatus): boolean {
  return status === "requires_action"
}

/**
 * Get user-friendly message for payment status
 */
export function getStatusMessage(status: PaymentStatus): string {
  switch (status) {
    case "succeeded":
      return "Payment completed successfully!"
    case "processing":
      return "Your payment is being processed..."
    case "pending":
      return "Payment is pending..."
    case "requires_action":
      return "Additional verification required"
    case "failed":
      return "Payment failed. Please try again."
    case "canceled":
      return "Payment was canceled"
    case "unknown":
      return "Payment status unknown. Please contact support."
    default:
      return "Processing payment..."
  }
}

/**
 * Determine if we should retry checking payment status
 */
const MAX_STATUS_CHECK_RETRIES = 15 // 30 seconds with 2 second intervals

export function shouldRetryStatusCheck(status: PaymentStatus, attemptCount: number): boolean {
  // Don't retry if payment is in final state
  if (isPaymentFinal(status)) {
    return false
  }
  
  // Retry up to MAX_STATUS_CHECK_RETRIES times
  return attemptCount < MAX_STATUS_CHECK_RETRIES
}

/**
 * Generate a unique idempotency key for a payment
 * This ensures retries don't create duplicate payments
 */
export function generateIdempotencyKey(orderId?: string): string {
  if (orderId) {
    return `pi_${orderId}`
  }
  
  // Fallback: generate based on timestamp and random value
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `pi_${timestamp}_${random}`
}

/**
 * Structured logging for payment events
 */
export interface PaymentLogData {
  paymentIntentId?: string
  orderId?: string
  amount?: number
  currency?: string
  status?: string
  error?: string
  [key: string]: unknown
}

export function logPaymentEvent(
  level: "info" | "warn" | "error",
  message: string,
  data?: PaymentLogData
): void {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    level,
    message,
    ...data,
  }

  if (level === "error") {
    console.error(JSON.stringify(logEntry))
  } else if (level === "warn") {
    console.warn(JSON.stringify(logEntry))
  } else {
    console.log(JSON.stringify(logEntry))
  }
}

/**
 * Extract customer email from payment intent metadata
 */
export function getCustomerEmailFromMetadata(metadata: Stripe.Metadata): string | null {
  return metadata.customer_email || null
}

/**
 * Extract order ID from payment intent metadata
 */
export function getOrderIdFromMetadata(metadata: Stripe.Metadata): string | null {
  return metadata.order_id || null
}

/**
 * Check if a webhook event should be processed
 * This helps prevent duplicate processing of the same event
 */
export function shouldProcessWebhookEvent(
  eventId: string,
  processedEvents: Set<string>
): boolean {
  return !processedEvents.has(eventId)
}

/**
 * Validate that required environment variables are set
 */
export function validatePaymentConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!process.env.STRIPE_SECRET_KEY) {
    errors.push("STRIPE_SECRET_KEY is not set")
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    errors.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set")
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    errors.push("STRIPE_WEBHOOK_SECRET is not set")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
