"use client"

import type React from "react"

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface StripeCheckoutFormProps {
  clientSecret: string
  amount: number
  onSuccess?: (paymentIntentId: string) => void
  onError?: (error: string) => void
}

export function StripeCheckoutForm({ clientSecret, amount, onSuccess, onError }: StripeCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please try again.")
      return
    }

    setIsLoading(true)
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
        const errorMessage = error.message || "An unexpected error occurred."
        setMessage(errorMessage)
        onError?.(errorMessage)
        toast({
          title: "Payment Failed",
          description: errorMessage,
          variant: "destructive",
        })
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded!")
        onSuccess?.(paymentIntent.id)
        toast({
          title: "Payment Successful",
          description: "Your memorial order has been processed.",
        })

        // Redirect to memorial creation
        window.location.href = `/create-profile?payment_intent=${paymentIntent.id}`
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred during payment processing."
      setMessage(errorMessage)
      onError?.(errorMessage)
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!stripe || !elements) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
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

          {/* Error Message */}
          {message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !stripe || !elements}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              `Pay $${amount}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default StripeCheckoutForm
