"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import StripeCheckoutForm from "@/components/stripe-checkout-form"

export default function PaymentPage() {
  const [orderData, setOrderData] = useState<any>(null)
  const [clientSecret, setClientSecret] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const orderId = searchParams.get("order")

  useEffect(() => {
    if (!orderId) {
      router.push("/checkout")
      return
    }

    // Get order data from session storage
    const storedOrderData = sessionStorage.getItem("orderData")
    if (!storedOrderData) {
      router.push("/checkout")
      return
    }

    const data = JSON.parse(storedOrderData)
    setOrderData(data)

    // Create payment intent
    createPaymentIntent(data)
  }, [orderId, router])

  const createPaymentIntent = async (orderData: any) => {
    try {
      setIsLoading(true)
      setError("")

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(orderData.amount * 100), // Convert to cents
          currency: "usd",
          customerInfo: {
            name: `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`,
            email: orderData.customerInfo.email,
            phone: orderData.customerInfo.phone,
            address: {
              line1: orderData.customerInfo.address,
              city: orderData.customerInfo.city,
              state: orderData.customerInfo.state,
              postal_code: orderData.customerInfo.zipCode,
              country: "US",
            },
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create payment intent")
      }

      const { clientSecret: secret } = await response.json()
      setClientSecret(secret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize payment"
      setError(errorMessage)
      toast({
        title: "Payment Initialization Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = (paymentIntentId: string) => {
    // Update order data with payment info
    const updatedOrderData = {
      ...orderData,
      paymentStatus: "completed",
      paymentMethod: "stripe",
      paymentIntentId,
      transactionId: paymentIntentId,
    }

    sessionStorage.setItem("orderData", JSON.stringify(updatedOrderData))

    // Redirect to success page
    router.push(`/checkout/success?order=${orderId}&payment_intent=${paymentIntentId}`)
  }

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    })
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="text-gray-600">Loading order details...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => router.back()} className="bg-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
              <p className="text-gray-600">Order #{orderId}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              {isLoading ? (
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                      <span className="ml-3 text-gray-600">Initializing secure payment...</span>
                    </div>
                  </CardContent>
                </Card>
              ) : error ? (
                <Card>
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="text-red-600 mb-4">Payment initialization failed</div>
                      <p className="text-gray-600 mb-4">{error}</p>
                      <Button onClick={() => createPaymentIntent(orderData)} variant="outline">
                        Try Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#7c3aed",
                        colorBackground: "#ffffff",
                        colorText: "#1f2937",
                        colorDanger: "#ef4444",
                        fontFamily: "system-ui, sans-serif",
                        spacingUnit: "4px",
                        borderRadius: "8px",
                      },
                    },
                  }}
                >
                  <StripeCheckoutForm
                    clientSecret={clientSecret}
                    amount={orderData.amount}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              ) : null}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Premium Memorial Package</h3>
                      <p className="text-sm text-gray-600">Complete digital memorial with QR code</p>
                    </div>
                    <span className="font-semibold">${orderData.amount}</span>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${orderData.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>${orderData.amount}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {orderData.customerInfo.firstName}{" "}
                    {orderData.customerInfo.lastName}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {orderData.customerInfo.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {orderData.customerInfo.phone}
                  </div>
                  <div>
                    <span className="font-medium">Address:</span> {orderData.customerInfo.address},{" "}
                    {orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.zipCode}
                  </div>
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">SSL Encrypted Connection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Powered by Stripe</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">30-Day Money Back Guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
