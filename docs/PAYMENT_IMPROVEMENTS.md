# Payment Processing Improvements

This document describes the improvements made to the Stripe payment processing system to address critical production issues.

## Issues Addressed

1. **Enhanced Logging (#4)**: Added structured logging throughout the payment flow
2. **Better Error Handling (#5)**: Improved exception handling to prevent 500 errors after successful payments
3. **Idempotency Keys (#6)**: Implemented idempotency key generation to prevent duplicate charges
4. **Webhook Reconciliation (#7)**: Enhanced webhook handler with comprehensive event processing
5. **Client UI Improvements (#8)**: Added payment status polling and better error recovery

## Key Changes

### 1. Payment Intent API (`/api/create-payment-intent/route.ts`)

**Improvements:**
- Added structured logging with unique request IDs for tracing
- Implemented idempotency key support to prevent duplicate payment intents
- Enhanced error handling with specific handling for Stripe errors vs validation errors
- Added metadata tracking for order reconciliation
- Returns request ID to client for support queries

**Idempotency:**
```typescript
// Generate idempotency key based on order ID or create a new one
const idempotencyKey = orderId ? `pi_${orderId}` : `pi_${requestId}`

// Pass to Stripe
const paymentIntent = await stripe.paymentIntents.create(
  { /* payment data */ },
  { idempotencyKey }
)
```

### 2. Webhook Handler (`/api/webhooks/stripe/route.ts`)

**Improvements:**
- Comprehensive event handling for all payment states
- Structured logging for all webhook events
- Always returns 200 to Stripe to prevent unnecessary retries
- Separate handlers for different payment states:
  - `handlePaymentSuccess`: Process successful payments
  - `handlePaymentFailure`: Log and handle failed payments
  - `handlePaymentRequiresAction`: Track payments requiring 3D Secure
  - `handlePaymentCanceled`: Handle canceled payments

**Error Handling:**
- Errors during webhook processing are logged but don't cause webhook failures
- This prevents Stripe from retrying due to internal errors
- Failed processing can be handled via manual reconciliation or event replay

### 3. Client Checkout Form (`components/stripe-checkout-form.tsx`)

**Improvements:**
- Added payment state machine: `idle → processing → verifying → succeeded/failed`
- Implemented polling mechanism to verify payment status
- Better error messaging with recovery instructions
- Visual indicators for each payment state
- Automatic status checking every 2 seconds during verification
- Prevents user confusion during async payment processing

**State Management:**
```typescript
// Payment states
type PaymentState = "idle" | "processing" | "verifying" | "succeeded" | "failed"

// Poll for status when verifying
useEffect(() => {
  if (paymentState === "verifying") {
    const interval = setInterval(async () => {
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
      // Update state based on status
    }, 2000)
    return () => clearInterval(interval)
  }
}, [paymentState])
```

### 4. Payment Utilities (`lib/payment-utils.ts`)

**New utility functions:**
- `mapStripeStatus`: Convert Stripe statuses to internal statuses
- `isPaymentFinal`: Check if payment is in terminal state
- `getStatusMessage`: Get user-friendly status messages
- `generateIdempotencyKey`: Generate unique idempotency keys
- `logPaymentEvent`: Structured logging helper
- `validatePaymentConfig`: Validate environment variables

## Logging Format

All payment-related logs use structured JSON format:

```json
{
  "timestamp": "2025-11-04T22:00:00.000Z",
  "level": "info",
  "message": "Payment intent created successfully",
  "service": "payment-intent-api",
  "requestId": "uuid-here",
  "paymentIntentId": "pi_xxx",
  "amount": 14900,
  "customerEmail": "customer@example.com"
}
```

This allows for:
- Easy parsing and searching in log aggregation tools
- Correlation of events across services using request IDs
- Better debugging and root cause analysis

## Error Handling Strategy

### Payment Intent API
- **Validation errors**: Return 400 with details
- **Stripe errors**: Return 500 with user-friendly message (details in logs)
- **Unknown errors**: Return 500 with generic message (full details in logs)
- **All errors**: Include request ID for support queries

### Webhook Handler
- **Signature verification failed**: Return 400 immediately
- **Processing errors**: Log error but return 200 to acknowledge receipt
- **Rationale**: Prevents Stripe from retrying on our internal errors
- **Recovery**: Manual reconciliation or event replay for failed processing

### Client UI
- **Payment processing**: Show loading state
- **Payment verifying**: Poll for status with loading indicator
- **Payment failed**: Show error with retry option and support contact
- **Uncertain state**: Guide user not to retry, contact support instead

## Idempotency

Idempotency keys prevent duplicate charges when users retry:

1. **Client provides order ID** (recommended):
   - Key: `pi_{orderId}`
   - Multiple retries with same order ID = same payment intent

2. **No order ID** (fallback):
   - Key: `pi_{requestId}`
   - Each API call gets unique key, but retries should include order ID

## Best Practices

1. **Always log with context**: Include request ID, payment intent ID, order ID
2. **Never expose sensitive data**: Log only necessary information
3. **Return 200 for webhooks**: Even if processing fails, acknowledge receipt
4. **Use idempotency keys**: Prevent duplicate charges on retries
5. **Poll for status**: Don't rely solely on redirect-based flows
6. **Guide users**: Provide clear instructions when payment state is uncertain

## Database Integration

The current implementation includes placeholders for database operations:

```typescript
// TODO: Implement these functions with your database
// await updateOrderPaymentStatus(orderId, 'succeeded', paymentIntentId)
// await sendPaymentConfirmationEmail(email, paymentIntentId)
// await createMemorialRecord(orderId, paymentIntentId)
```

When implementing database operations:
1. Create order record BEFORE calling Stripe (if possible)
2. Update order status in webhook handler
3. Use transactions for atomic updates
4. Handle race conditions between client flow and webhook

## Monitoring and Alerts

Consider setting up alerts for:
- High rate of payment failures
- Webhook processing errors
- Payments stuck in "processing" state for >2 minutes
- Missing webhook events (compare Stripe dashboard to logs)

## Testing

Test scenarios:
1. **Successful payment**: Use card `4242 4242 4242 4242`
2. **Declined payment**: Use card `4000 0000 0000 0002`
3. **3D Secure**: Use card `4000 0025 0000 3155`
4. **Slow processing**: Simulate with card `4000 0000 0000 3220`
5. **Network timeout**: Disconnect during payment confirmation
6. **Duplicate submission**: Submit payment multiple times with same order ID

## Support Queries

When users contact support about payment issues:
1. Ask for request ID (displayed in error messages)
2. Search logs for request ID to see full event chain
3. Check Stripe dashboard for payment intent status
4. Verify webhook delivery in Stripe dashboard
5. Manually reconcile if needed using order ID

## Production Checklist

- [ ] Set `STRIPE_SECRET_KEY` environment variable
- [ ] Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` environment variable  
- [ ] Set `STRIPE_WEBHOOK_SECRET` environment variable
- [ ] Configure webhook endpoint in Stripe dashboard
- [ ] Test webhook delivery in production
- [ ] Set up log monitoring/aggregation
- [ ] Configure alerts for payment failures
- [ ] Test with real payment methods (in test mode first)
- [ ] Document support procedures for payment issues
