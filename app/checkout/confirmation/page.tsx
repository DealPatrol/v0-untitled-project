"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail, Package, CreditCard, Building, Truck } from "lucide-react"
import { getOrderStatus } from "../../actions/fallback-payment"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const orderId = searchParams.get("order_id")
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId && !sessionId) {
        setError("No order information found")
        setLoading(false)
        return
      }

      try {
        if (orderId) {
          // Fallback payment order
          const result = await getOrderStatus(orderId)
          if (result.success) {
            setOrder(result.order)
          } else {
            setError(result.error || "Order not found")
          }
        } else if (sessionId) {
          // Stripe payment - would need to fetch from Stripe
          setError("Stripe order confirmation not implemented yet")
        }
      } catch (err: any) {
        setError(err.message || "Failed to load order")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your order...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                <Package className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button asChild>
                <Link href="/checkout">Try Again</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "stripe":
      case "credit_card":
        return <CreditCard className="h-5 w-5" />
      case "bank_transfer":
        return <Building className="h-5 w-5" />
      case "pay_on_delivery":
        return <Truck className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "stripe":
      case "credit_card":
        return "Credit Card"
      case "bank_transfer":
        return "Bank Transfer"
      case "pay_on_delivery":
        return "Pay on Delivery"
      default:
        return "Credit Card"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-serif flex items-center justify-center">
            Memorial QR
            <span className="text-yellow-400 ml-1">★</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
                <p className="text-green-700">
                  Thank you for your purchase. We've received your order and will process it shortly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{order?.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Customer</span>
                <span className="font-medium">{order?.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Email</span>
                <span className="font-medium">{order?.customer_email}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <div className="flex items-center">
                  {getPaymentMethodIcon(order?.payment_method)}
                  <span className="font-medium ml-2">{getPaymentMethodName(order?.payment_method)}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-medium capitalize bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                  {order?.status}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>${order?.total_amount?.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Items Ordered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order?.items?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="relative w-16 h-16 mr-4">
                        <Image src="/images/qr-code-gravestone.png" alt="QR Code" fill className="object-contain" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="font-medium">{order?.customer_name}</p>
                <p>{order?.shipping_address?.line1}</p>
                <p>
                  {order?.shipping_address?.city}, {order?.shipping_address?.state}{" "}
                  {order?.shipping_address?.postal_code}
                </p>
                <p>{order?.shipping_address?.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order?.payment_method === "bank_transfer" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Bank Transfer Instructions</p>
                        <p className="text-blue-700 text-sm mt-1">
                          We'll send you bank transfer details via email within 24 hours. Your order will be processed
                          once payment is received.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {order?.payment_method === "pay_on_delivery" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Truck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Pay on Delivery</p>
                        <p className="text-green-700 text-sm mt-1">
                          Your order will be shipped and you can pay when it arrives. We'll contact you to confirm
                          delivery details.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Email Confirmation</p>
                    <p className="text-gray-600 text-sm mt-1">
                      We've sent a confirmation email to {order?.customer_email} with your order details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Package className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Processing & Shipping</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Your QR codes will be processed and shipped within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link href="/dashboard">
                <Download className="h-4 w-4 mr-2" />
                View Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>

          {/* Support */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you have any questions about your order, please don't hesitate to contact us.
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Memorial QR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
