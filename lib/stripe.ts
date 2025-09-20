import Stripe from "stripe"
import { loadStripe } from "@stripe/stripe-js"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set in environment variables")
}

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
})

// Client-side Stripe promise
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Utility functions for amount formatting
export const formatAmountForDisplay = (amount: number, currency: string): string => {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(amount / 100)
}

export const formatAmountForStripe = (amount: number, currency: string): number => {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

// Stripe configuration constants
export const STRIPE_CONFIG = {
  currency: "usd",
  payment_method_types: ["card"],
  mode: "payment",
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout`,
} as const

// Product configuration
export const MEMORIAL_PACKAGE = {
  name: "Memorial QR Premium Package",
  description: "Complete digital memorial with QR code and physical plaque",
  price: 11999, // $119.99 in cents
  currency: "usd",
  features: [
    "Custom QR code memorial",
    "Unlimited photo uploads",
    "Video memories",
    "Guest book & messages",
    "Lifetime hosting",
    "Physical QR code plaque",
  ],
} as const
