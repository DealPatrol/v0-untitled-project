"use client"

import { useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import StripeCheckoutForm from "@/components/stripe-checkout-form"

export default function TestStripePage() {
  const [clientSecret, setClientSecret] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
    address: {
      line1: "123 Main St",
      city: "Anytown",
      state: "CA",
      postal_code: "12345",
      country: "US",
    },
  })

  const addTestResult = (result: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  const testPaymentIntentAPI = async () => {
    setIsLoading(true)
    addTestResult("Testing Payment Intent API...")

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 149,
          currency: "usd",
          customerInfo,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setClientSecret(data.clientSecret)
        addTestResult(`✅ Payment Intent created successfully! ID: ${data.paymentIntentId}`)
      } else {
        addTestResult(`❌ API Error: ${data.error}`)
      }
    } catch (error) {
      addTestResult(`❌ Network Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const checkEnvironmentVariables = () => {
    addTestResult("Checking environment variables...")

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (publishableKey) {
      addTestResult(`✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${publishableKey.substring(0, 20)}...`)
    } else {
      addTestResult("❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing")
    }

    // Note: We can't check server-side env vars from client
    addTestResult("ℹ️ Server-side STRIPE_SECRET_KEY check requires API call")
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Stripe Integration Test</h1>
          <p className="text-gray-600">Test the Stripe payment integration and API endpoints</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Controls</CardTitle>
                <CardDescription>Run various tests to validate Stripe integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={checkEnvironmentVariables} className="w-full bg-transparent" variant="outline">
                  Check Environment Variables
                </Button>

                <Button onClick={testPaymentIntentAPI} disabled={isLoading} className="w-full">
                  {isLoading ? "Testing..." : "Test Payment Intent API"}
                </Button>

                <Button onClick={clearResults} variant="outline" className="w-full bg-transparent">
                  Clear Results
                </Button>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Test Customer Info</CardTitle>
                <CardDescription>Customer data used for testing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={customerInfo.address.line1}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>Real-time test results and logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
                  {testResults.length === 0 ? (
                    <div className="text-gray-500">No tests run yet...</div>
                  ) : (
                    testResults.map((result, index) => (
                      <div key={index} className="mb-1">
                        {result}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Test Card Numbers */}
            <Card>
              <CardHeader>
                <CardTitle>Stripe Test Cards</CardTitle>
                <CardDescription>Use these test card numbers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Success:</strong> 4242 4242 4242 4242
                  </div>
                  <div>
                    <strong>Declined:</strong> 4000 0000 0000 0002
                  </div>
                  <div>
                    <strong>Insufficient Funds:</strong> 4000 0000 0000 9995
                  </div>
                  <div>
                    <strong>3D Secure:</strong> 4000 0025 0000 3155
                  </div>
                  <div className="text-gray-600 mt-2">Use any future date for expiry and any 3-digit CVC</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripeCheckoutForm
                  clientSecret={clientSecret}
                  amount={149}
                  onSuccess={(paymentIntentId) => {
                    addTestResult(`✅ Payment succeeded! Payment Intent: ${paymentIntentId}`)
                  }}
                  onError={(error) => {
                    addTestResult(`❌ Payment failed: ${error}`)
                  }}
                />
              </Elements>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-gray-500 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">💳</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Payment Form</h3>
                    <p>Click "Test Payment Intent API" to load the payment form</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
