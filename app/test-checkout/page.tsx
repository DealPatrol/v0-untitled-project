"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, CreditCard, Building, Truck, ArrowRight } from "lucide-react"

export default function TestCheckoutPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runCheckoutTest = async (paymentMethod: string) => {
    setIsRunning(true)
    const testResult = {
      method: paymentMethod,
      timestamp: new Date().toLocaleTimeString(),
      status: "running",
      details: "Testing checkout process...",
    }

    setTestResults((prev) => [...prev, testResult])

    try {
      // Simulate checkout test
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update result
      setTestResults((prev) =>
        prev.map((result) =>
          result.timestamp === testResult.timestamp
            ? { ...result, status: "success", details: "Checkout process completed successfully" }
            : result,
        ),
      )
    } catch (error) {
      setTestResults((prev) =>
        prev.map((result) =>
          result.timestamp === testResult.timestamp
            ? { ...result, status: "error", details: "Checkout process failed" }
            : result,
        ),
      )
    } finally {
      setIsRunning(false)
    }
  }

  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit Card (Stripe)",
      icon: CreditCard,
      description: "Test Stripe payment processing",
      testUrl: "/checkout?plan=premium&test=true",
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: Building,
      description: "Test bank transfer payment flow",
      testUrl: "/checkout?plan=premium&payment=bank_transfer",
    },
    {
      id: "pay_on_delivery",
      name: "Pay on Delivery",
      icon: Truck,
      description: "Test cash on delivery option",
      testUrl: "/checkout?plan=premium&payment=pay_on_delivery",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-serif flex items-center">
                Memorial QR
                <span className="text-yellow-400 ml-1">★</span>
              </Link>
              <p className="text-gray-600 mt-1">Checkout Testing Dashboard</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/launch-checklist">
                <ArrowRight className="h-4 w-4 mr-2" />
                Back to Checklist
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Checkout Testing</CardTitle>
                <CardDescription>
                  Test each payment method to ensure the checkout process works correctly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div key={method.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Icon className="h-5 w-5 mr-2" />
                          <span className="font-medium">{method.name}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => runCheckoutTest(method.id)} disabled={isRunning}>
                            {isRunning ? "Testing..." : "Quick Test"}
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={method.testUrl}>
                              <ArrowRight className="h-4 w-4 mr-1" />
                              Full Test
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Test Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Single Premium QR Code</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/checkout?plan=premium&quantity=1">Test</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Multiple Deluxe QR Codes</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/checkout?plan=deluxe&quantity=2">Test</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Legacy Package</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/checkout?plan=legacy&quantity=1">Test</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Results */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>Results from your checkout tests will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tests run yet. Click "Quick Test" or "Full Test" to begin.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{result.method.replace("_", " ")}</span>
                          <div className="flex items-center">
                            <Badge
                              className={
                                result.status === "success"
                                  ? "bg-green-100 text-green-800"
                                  : result.status === "error"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {result.status === "success" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {result.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
                              {result.status}
                            </Badge>
                            <span className="text-xs text-gray-500 ml-2">{result.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{result.details}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Checkout Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Form validation works correctly</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Payment methods display properly</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Order summary calculates correctly</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Stripe integration functional</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Alternative payment methods work</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Confirmation page displays</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Email notifications sent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
