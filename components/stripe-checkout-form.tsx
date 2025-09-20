"use client"

import type React from "react"
import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CreditCard, Lock, Shield } from "lucide-react"

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
          return_url: `${window.location.origin}/checkout/success`,
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
          description: "Your memorial order has been processed successfully.",
        })
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
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <span className="ml-3 text-gray-600">Loading secure payment form...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Complete Your Payment
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Secure payment processing powered by Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-gray-900">Memorial QR Package</span>
                <p className="text-sm text-gray-600 mt-1">Includes QR code, memorial page, and physical plaque</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-purple-600">${amount}</span>
                <p className="text-xs text-gray-500">One-time payment</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Element */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Payment Information</h3>
            </div>
            <div className="border rounded-lg p-4 bg-white">
              <PaymentElement
                options={{
                  layout: "tabs",
                  defaultValues: {
                    billingDetails: {
                      name: "",
                      email: "",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Test Mode Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Test Mode Active</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Use card number <code className="bg-yellow-100 px-1 rounded">4242 4242 4242 4242</code> with any
                  future date and CVC for testing.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-red-800">{message}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !stripe || !elements}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-5 w-5" />
                Pay ${amount} Securely
              </>
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">
              Your payment information is secure and encrypted. We never store your card details.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span>256-bit SSL</span>
              <span>•</span>
              <span>PCI Compliant</span>
              <span>•</span>
              <span>Stripe Secure</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default StripeCheckoutForm
