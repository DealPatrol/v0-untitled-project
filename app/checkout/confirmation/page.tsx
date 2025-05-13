"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getOrderDetails, getCheckoutSession } from "@/app/actions/payment"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const sessionId = searchParams.get("session_id")
        const orderId = searchParams.get("order_id")

        if (sessionId) {
          // Stripe checkout
          const sessionDetails = await getCheckoutSession(sessionId)
          setOrder(sessionDetails)
        } else if (orderId) {
          // Direct order
          const orderDetails = await getOrderDetails(orderId)
          setOrder(orderDetails)
        } else {
          setError("No order information found")
        }
      } catch (err: any) {
        console.error("Error fetching order details:", err)
        setError(err.message || "Failed to load order details")
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center">
                <AlertCircle className="mr-2" /> Error
              </CardTitle>
              <CardDescription>We encountered a problem with your order</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{error}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/checkout">Return to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  const isStripePayment = order?.payment_method === "stripe"
  const isPaid = order?.status === "paid" || order?.status === "processing"
  const isAwaitingPayment = order?.status === "awaiting_payment"
  const orderItems = order?.metadata?.items || []
  const orderTotal = order?.amount || 0

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Thank You for Your Order!</CardTitle>
            <CardDescription className="text-center">
              {isPaid
                ? "Your payment has been processed successfully."
                : isAwaitingPayment
                  ? "We've received your order and are waiting for payment."
                  : "Your order has been received and is being processed."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Order Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Order Reference:</div>
                <div className="font-medium">{order?.reference_number || "N/A"}</div>
                <div className="text-gray-600">Payment Method:</div>
                <div className="font-medium capitalize">{order?.payment_method?.replace("_", " ") || "N/A"}</div>
                <div className="text-gray-600">Status:</div>
                <div className="font-medium capitalize">{order?.status?.replace("_", " ") || "N/A"}</div>
                <div className="text-gray-600">Total Amount:</div>
                <div className="font-medium">${orderTotal.toFixed(2)}</div>
              </div>
            </div>

            {isAwaitingPayment && order?.payment_method === "bank_transfer" && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-yellow-800">Payment Instructions</h3>
                <p className="text-sm text-yellow-800 mb-2">
                  Please complete your payment using the following bank details:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-yellow-800">Bank Name:</div>
                  <div className="font-medium">Memorial Bank</div>
                  <div className="text-yellow-800">Account Name:</div>
                  <div className="font-medium">Memorial QR Inc.</div>
                  <div className="text-yellow-800">Account Number:</div>
                  <div className="font-medium">XXXX-XXXX-1234</div>
                  <div className="text-yellow-800">Reference:</div>
                  <div className="font-medium">{order?.reference_number}</div>
                </div>
                <p className="text-sm text-yellow-800 mt-2">
                  <strong>Important:</strong> Please include your order reference number in the payment reference.
                </p>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="border rounded-lg divide-y">
                {orderItems.map((item: any, index: number) => (
                  <div key={index} className="p-3 flex justify-between">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <div className="p-3 flex justify-between bg-gray-50">
                  <div className="font-medium">Total</div>
                  <div className="font-bold">${orderTotal.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-600 text-sm">
              <p>
                We've sent a confirmation email to{" "}
                <span className="font-medium">{order?.metadata?.email || "your email address"}</span>.
              </p>
              <p className="mt-1">
                If you have any questions, please contact our{" "}
                <Link href="/contact" className="text-rose-600 hover:text-rose-800">
                  customer support
                </Link>
                .
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
