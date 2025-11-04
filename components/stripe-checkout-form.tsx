"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface StripeCheckoutFormProps {
  clientSecret: string
  amount: number
  onSuccess?: (paymentIntentId: string) => void
  onError?: (error: string) => void
}

type PaymentState = "idle" | "processing" | "verifying" | "succeeded" | "failed"

export function StripeCheckoutForm({ clientSecret, amount, onSuccess, onError }: StripeCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [paymentState, setPaymentState] = useState<PaymentState>("idle")
  const [message, setMessage] = useState<string>("")
  const [paymentIntentId, setPaymentIntentId] = useState<string>("")

  // Poll for payment status when in verifying state
  useEffect(() => {
    let pollInterval: NodeJS.Timeout | null = null

    if (paymentState === "verifying" && paymentIntentId && stripe) {
      // Poll every 2 seconds for payment status
      pollInterval = setInterval(async () => {
        try {
          const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
          
          if (paymentIntent) {
            console.log("Payment status poll:", {
              id: paymentIntent.id,
              status: paymentIntent.status,
            })

            if (paymentIntent.status === "succeeded") {
              setPaymentState("succeeded")
              setMessage("Payment confirmed!")
              onSuccess?.(paymentIntent.id)
              
              toast({
                title: "Payment Successful",
                description: "Your memorial order has been processed.",
              })

              // Redirect to memorial creation
              setTimeout(() => {
                window.location.href = `/create-profile?payment_intent=${paymentIntent.id}`
              }, 1500)
            } else if (
              paymentIntent.status === "canceled" ||
              paymentIntent.status === "requires_payment_method"
            ) {
              setPaymentState("failed")
              setMessage("Payment could not be completed. Please try again.")
              onError?.("Payment verification failed")
            }
          }
        } catch (error) {
          console.error("Error polling payment status:", error)
          // Continue polling even on error
        }
      }, 2000)
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, [paymentState, paymentIntentId, stripe, clientSecret, onSuccess, onError, toast])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please try again.")
      return
    }

    setPaymentState("processing")
    setMessage("")

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/create-profile`,
        },
        redirect: "if_required",
      })

      if (error) {
        // Payment failed
        const errorMessage = error.message || "An unexpected error occurred."
        setMessage(errorMessage)
        setPaymentState("failed")
        onError?.(errorMessage)
        
        toast({
          title: "Payment Failed",
          description: errorMessage,
          variant: "destructive",
        })
      } else if (paymentIntent) {
        setPaymentIntentId(paymentIntent.id)

        // Check immediate status
        if (paymentIntent.status === "succeeded") {
          // Payment succeeded immediately
          setPaymentState("succeeded")
          setMessage("Payment succeeded!")
          onSuccess?.(paymentIntent.id)
          
          toast({
            title: "Payment Successful",
            description: "Your memorial order has been processed.",
          })

          // Redirect to memorial creation
          setTimeout(() => {
            window.location.href = `/create-profile?payment_intent=${paymentIntent.id}`
          }, 1500)
        } else if (paymentIntent.status === "processing") {
          // Payment is being processed, enter verifying state
          setPaymentState("verifying")
          setMessage("Your payment is being processed. Please wait...")
          
          toast({
            title: "Processing Payment",
            description: "Your payment is being verified. This may take a few moments.",
          })
        } else if (paymentIntent.status === "requires_action") {
          // This shouldn't happen with redirect: "if_required", but handle it
          setPaymentState("verifying")
          setMessage("Additional verification required...")
        } else {
          // Unexpected status
          setPaymentState("verifying")
          setMessage("Verifying your payment...")
        }
      } else {
        // Unexpected state: no error and no paymentIntent
        setPaymentState("verifying")
        setMessage("Processing your payment...")
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred during payment processing."
      setMessage(errorMessage)
      setPaymentState("failed")
      onError?.(errorMessage)
      
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      })
      
      console.error("Payment error:", err)
    }
  }

  const isLoading = paymentState === "processing" || paymentState === "verifying"
  const isDisabled = isLoading || !stripe || !elements

  if (!stripe || !elements) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600">Loading payment form...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>Secure payment processing powered by Stripe</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Memorial QR Package</span>
              <span className="font-bold">${amount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Includes QR code, memorial page, and physical plaque</p>
          </div>

          <Separator />

          {/* Payment Element */}
          <div className="space-y-4">
            <h3 className="font-medium">Payment Information</h3>
            <PaymentElement
              options={{
                layout: "tabs",
              }}
            />
          </div>

          {/* Test Mode Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242 with any future date and CVC.
            </p>
          </div>

          {/* Payment State Messages */}
          {paymentState === "verifying" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Loader2 className="h-5 w-5 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Verifying Your Payment</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Your payment is being processed. Please do not close this page or refresh your browser.
                    This may take up to 30 seconds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentState === "succeeded" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Payment Successful!</p>
                  <p className="text-xs text-green-600 mt-1">Redirecting you to create your memorial...</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {message && paymentState === "failed" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Payment Failed</p>
                  <p className="text-xs text-red-600 mt-1">{message}</p>
                  <p className="text-xs text-red-600 mt-2">
                    If you were charged but still see this error, please don't try again. 
                    Contact support at support@memorialqr.com with your payment details.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {paymentState === "processing" && (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing Payment...
              </>
            )}
            {paymentState === "verifying" && (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Verifying Payment...
              </>
            )}
            {paymentState === "succeeded" && (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Payment Complete!
              </>
            )}
            {(paymentState === "idle" || paymentState === "failed") && `Pay $${amount}`}
          </Button>

          {/* Help Text */}
          {paymentState === "verifying" && (
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Having trouble? Contact us at support@memorialqr.com or call 256-595-3354
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default StripeCheckoutForm
