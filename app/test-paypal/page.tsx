"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createOrder } from "@/app/actions/paypal-payment"
import { AlertCircle, CheckCircle, CreditCard } from "lucide-react"

export default function TestPayPalPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("test@example.com")
  const [plan, setPlan] = useState("premium")

  const testPayPalCheckout = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const items = [
        {
          name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Memorial QR`,
          description: "Test QR code for memorial",
          price: plan === "premium" ? 79.99 : plan === "deluxe" ? 99.99 : 249.99,
          quantity: 1,
          product_type: plan,
        },
      ]

      const shipping = {
        name: "Test Customer",
        address: {
          line1: "123 Test Street",
          city: "Test City",
          state: "CA",
          postal_code: "12345",
          country: "US",
        },
      }

      const metadata = {
        plan,
        email,
        quantity: "1",
        product_type: plan,
      }

      const orderResult = await createOrder(items, shipping, "paypal", metadata)

      if (orderResult.redirectUrl) {
        setResult({
          success: true,
          message: "PayPal order created successfully!",
          orderId: orderResult.orderId,
          paypalOrderId: orderResult.paypalOrderId,
          redirectUrl: orderResult.redirectUrl,
        })
      } else {
        throw new Error("No redirect URL returned")
      }
    } catch (err: any) {
      console.error("Test failed:", err)
      setError(err.message || "Test failed")
    } finally {
      setLoading(false)
    }
  }

  const testBankTransfer = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const items = [
        {
          name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Memorial QR`,
          description: "Test QR code for memorial",
          price: plan === "premium" ? 79.99 : plan === "deluxe" ? 99.99 : 249.99,
          quantity: 1,
          product_type: plan,
        },
      ]

      const shipping = {
        name: "Test Customer",
        address: {
          line1: "123 Test Street",
          city: "Test City",
          state: "CA",
          postal_code: "12345",
          country: "US",
        },
      }

      const metadata = {
        plan,
        email,
        quantity: "1",
        product_type: plan,
      }

      const orderResult = await createOrder(items, shipping, "bank_transfer", metadata)

      setResult({
        success: true,
        message: "Bank transfer order created successfully!",
        orderId: orderResult.orderId,
        redirectUrl: orderResult.redirectUrl,
      })
    } catch (err: any) {
      console.error("Test failed:", err)
      setError(err.message || "Test failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">PayPal Integration Test</h1>
          <p className="text-gray-600">Test your PayPal payment integration</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>Configure your test parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Test Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            <div>
              <Label htmlFor="plan">Test Plan</Label>
              <select
                id="plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="premium">Premium ($79.99)</option>
                <option value="deluxe">Deluxe ($99.99)</option>
                <option value="legacy">Legacy ($249.99)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Tests</CardTitle>
            <CardDescription>Test different payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testPayPalCheckout} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Testing PayPal...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Test PayPal Checkout
                </>
              )}
            </Button>

            <Button onClick={testBankTransfer} disabled={loading} variant="outline" className="w-full bg-transparent">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Testing Bank Transfer...
                </>
              ) : (
                "Test Bank Transfer"
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Test Failed</p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Test Successful</p>
                  <p className="text-green-700 text-sm mt-1">{result.message}</p>
                  {result.orderId && <p className="text-green-700 text-sm">Order ID: {result.orderId}</p>}
                  {result.paypalOrderId && (
                    <p className="text-green-700 text-sm">PayPal Order ID: {result.paypalOrderId}</p>
                  )}
                  {result.redirectUrl && (
                    <div className="mt-2">
                      <Button
                        size="sm"
                        onClick={() => window.open(result.redirectUrl, "_blank")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Open PayPal Checkout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>PayPal Test Accounts</CardTitle>
            <CardDescription>Use these test accounts in PayPal sandbox</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Test Buyer Email:</span>
                <code>sb-buyer@personal.example.com</code>
              </div>
              <div className="flex justify-between">
                <span>Test Buyer Password:</span>
                <code>password123</code>
              </div>
              <div className="text-gray-600 mt-2">
                Note: You can create your own test accounts in the PayPal Developer Dashboard
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
