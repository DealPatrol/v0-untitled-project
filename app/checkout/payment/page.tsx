"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Lock, ArrowLeft, CheckCircle } from "lucide-react"

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

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
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData))
    } else {
      router.push("/checkout")
    }
  }, [orderId, router])

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      // 16 digits + 3 spaces
      handleInputChange("cardNumber", formatted)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.length <= 5) {
      // MM/YY
      handleInputChange("expiryDate", formatted)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length <= 4) {
      handleInputChange("cvv", value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Update order data with payment info
      const updatedOrderData = {
        ...orderData,
        paymentStatus: "completed",
        paymentMethod: "card",
        transactionId: `TXN-${Date.now()}`,
      }

      sessionStorage.setItem("orderData", JSON.stringify(updatedOrderData))

      toast({
        title: "Payment Successful!",
        description: "Your order has been processed. Redirecting to confirmation...",
      })

      // Redirect to success page
      setTimeout(() => {
        router.push(`/checkout/success?order=${orderId}`)
      }, 1500)
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => router.back()} className="bg-transparent">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Your payment information is secure and encrypted
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" value={paymentData.cvv} onChange={handleCvvChange} placeholder="123" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      value={paymentData.nameOnCard}
                      onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Payment - ${orderData.amount}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </CardContent>
            </Card>

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
