"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AlertCircle, CreditCard, Lock } from "lucide-react"
import { createOrder, type CheckoutItem, type ShippingInfo } from "../actions/payment"

export default function TestStripePage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("test@example.com")
  const [amount, setAmount] = useState("9.99")
  const [testMode, setTestMode] = useState("success")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsProcessing(true)

    try {
      console.log("Starting payment test...")

      // Validate inputs
      if (!email || !amount) {
        throw new Error("Please fill in all required fields")
      }

      const numAmount = Number.parseFloat(amount)
      if (isNaN(numAmount) || numAmount < 0.5) {
        throw new Error("Amount must be at least $0.50")
      }

      // Create test item
      const items: CheckoutItem[] = [
        {
          name: `Test Product (${testMode})`,
          description: `This is a test product for Stripe integration testing`,
          price: numAmount,
          quantity: 1,
          product_type: "test",
        },
      ]

      // Dummy shipping info
      const shippingInfo: ShippingInfo = {
        name: "Test User",
        address: {
          line1: "123 Test St",
          city: "Test City",
          state: "TS",
          postal_code: "12345",
          country: "US",
        },
      }

      console.log("Creating order with items:", items)

      // Create order with Stripe payment method
      const result = await createOrder(items, shippingInfo, "stripe", {
        test_mode: testMode,
        email,
        plan: "premium",
        quantity: "1",
      })

      console.log("Order created successfully:", result)

      // Redirect to Stripe checkout
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl
      } else {
        throw new Error("No redirect URL received from payment processor")
      }
    } catch (err: any) {
      console.error("Payment test error:", err)
      setError(err.message || "Test payment processing failed. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Test Stripe Integration</CardTitle>
            <CardDescription>Use this page to test your Stripe integration with test card numbers.</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-6">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="amount">Test Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0.50"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Test Scenario</Label>
                <RadioGroup
                  defaultValue="success"
                  value={testMode}
                  onValueChange={setTestMode}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="success" id="success" />
                    <Label htmlFor="success">Successful Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="decline" id="decline" />
                    <Label htmlFor="decline">Declined Payment</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 flex items-center mb-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Test Card Numbers
                </h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• Success: 4242 4242 4242 4242</p>
                  <p>• Decline: 4000 0000 0000 0002</p>
                  <p>• Any future date, any 3 digits for CVC, any postal code</p>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Lock size={16} className="mr-2" />
                This is a test environment. No real charges will be made.
              </div>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Test Stripe Payment"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-lg mb-4">Testing Instructions</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Enter any email address (it won't receive actual emails in test mode)</li>
            <li>Set a test amount (minimum $0.50)</li>
            <li>Choose a test scenario (success or decline)</li>
            <li>Click "Test Stripe Payment" to be redirected to Stripe's checkout page</li>
            <li>Use one of the test card numbers provided</li>
            <li>Complete the checkout process</li>
            <li>You'll be redirected back to your confirmation page</li>
            <li>Check your Stripe dashboard to verify the test payment was recorded</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
