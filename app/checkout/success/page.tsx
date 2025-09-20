"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Mail, ArrowRight, Gift, Loader2 } from "lucide-react"

export default function CheckoutSuccessPage() {
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order")
  const paymentIntentId = searchParams.get("payment_intent")

  useEffect(() => {
    if (!orderId) {
      router.push("/checkout")
      return
    }

    // Get order data from session storage
    const storedOrderData = sessionStorage.getItem("orderData")
    if (storedOrderData) {
      const data = JSON.parse(storedOrderData)

      // Update with payment intent ID if available
      if (paymentIntentId && !data.paymentIntentId) {
        data.paymentIntentId = paymentIntentId
        data.transactionId = paymentIntentId
        sessionStorage.setItem("orderData", JSON.stringify(data))
      }

      setOrderData(data)
    } else {
      router.push("/checkout")
      return
    }

    setIsLoading(false)
  }, [orderId, paymentIntentId, router])

  const handleCreateProfile = () => {
    router.push(`/create-profile?order=${orderId}&plan=${orderData?.plan || "premium"}`)
  }

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      orderId,
      paymentIntentId: orderData?.paymentIntentId,
      customerInfo: orderData?.customerInfo,
      amount: orderData?.amount,
      timestamp: orderData?.timestamp,
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `memorial-qr-receipt-${orderId}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="text-gray-600">Loading order confirmation...</span>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-4">We couldn't find your order details.</p>
            <Button onClick={() => router.push("/checkout")}>Return to Checkout</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Thank you for your purchase. Your memorial package is ready to be created.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order Number:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{orderId}</span>
                </div>

                {orderData.paymentIntentId && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Payment ID:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {orderData.paymentIntentId.substring(0, 20)}...
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="font-medium">Date:</span>
                  <span>{new Date(orderData.timestamp).toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment Method:</span>
                  <span className="capitalize">{orderData.paymentMethod || "Stripe"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Confirmed
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Premium Memorial Package</span>
                    <span>${orderData.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Processing Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total Paid</span>
                  <span className="text-green-600">${orderData.amount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Create Your Memorial Profile</h3>
                      <p className="text-sm text-gray-600">
                        Add photos, stories, and memories to create a beautiful memorial page.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Receive Your QR Code</h3>
                      <p className="text-sm text-gray-600">
                        Get your custom QR code instantly and physical plaque shipped within 3-5 business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Share with Family & Friends</h3>
                      <p className="text-sm text-gray-600">
                        Invite others to view and contribute memories to the memorial.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateProfile}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  Create Memorial Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Contact Details</h3>
                  <div className="space-y-1 text-sm">
                    <div>
                      {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                    </div>
                    <div>{orderData.customerInfo.email}</div>
                    <div>{orderData.customerInfo.phone}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="space-y-1 text-sm">
                    <div>{orderData.customerInfo.address}</div>
                    <div>
                      {orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.zipCode}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Information */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    A confirmation email has been sent to {orderData.customerInfo.email}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm">
                  <Link href="/help" className="text-purple-600 hover:text-purple-700">
                    Need Help?
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/contact" className="text-purple-600 hover:text-purple-700">
                    Contact Support
                  </Link>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleDownloadReceipt}
                    className="text-purple-600 hover:text-purple-700 flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
