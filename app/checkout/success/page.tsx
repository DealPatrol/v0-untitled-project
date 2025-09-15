"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Mail, ArrowRight, Gift } from "lucide-react"

export default function CheckoutSuccessPage() {
  const [orderData, setOrderData] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order")

  useEffect(() => {
    if (!orderId) {
      router.push("/checkout")
      return
    }

    // Get order data from session storage
    const storedOrderData = sessionStorage.getItem("orderData")
    if (storedOrderData) {
      const data = JSON.parse(storedOrderData)
      setOrderData(data)
    } else {
      router.push("/checkout")
    }
  }, [orderId, router])

  const handleCreateProfile = () => {
    router.push(`/create-profile?order=${orderId}&plan=${orderData?.plan || "premium"}`)
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
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
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

                <div className="flex justify-between items-center">
                  <span className="font-medium">Transaction ID:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{orderData.transactionId}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Date:</span>
                  <span>{new Date(orderData.timestamp).toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <span className="text-green-600 font-medium">Confirmed</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Premium Memorial Package</span>
                    <span>${orderData.amount}</span>
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
                  <span>${orderData.amount}</span>
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
                        Add photos, stories, and memories to create a beautiful memorial.
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
                        Get your custom QR code and physical plaque shipped to you.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Share with Family & Friends</h3>
                      <p className="text-sm text-gray-600">Invite others to view and contribute to the memorial.</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateProfile}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
                  <button className="text-purple-600 hover:text-purple-700">
                    <Download className="w-4 h-4 inline mr-1" />
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
