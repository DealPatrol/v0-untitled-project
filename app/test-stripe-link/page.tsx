"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CreditCard, CheckCircle, AlertCircle } from "lucide-react"

export default function TestStripeLinkPage() {
  const [testResult, setTestResult] = useState<string | null>(null)

  const stripeLinks = {
    premium: "https://buy.stripe.com/7sIaIb5sydOxgCc144",
    deluxe: "https://buy.stripe.com/7sIaIb5sydOxgCc144", // Replace with actual deluxe link
    legacy: "https://buy.stripe.com/7sIaIb5sydOxgCc144", // Replace with actual legacy link
  }

  const testStripeLink = (plan: string) => {
    const link = stripeLinks[plan as keyof typeof stripeLinks]
    setTestResult(`Testing ${plan} plan link: ${link}`)

    // Open the Stripe link in a new tab
    window.open(link, "_blank")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Stripe Payment Link Test</h1>
          <p className="text-gray-600">Test your Stripe payment links for different plans</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Links Configuration</CardTitle>
            <CardDescription>Current Stripe payment links for each plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Premium Plan</h3>
                  <p className="text-sm text-gray-500">$79.99 - Basic memorial features</p>
                  <code className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mt-1 inline-block">
                    {stripeLinks.premium}
                  </code>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Button size="sm" onClick={() => testStripeLink("premium")}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Deluxe Plan</h3>
                  <p className="text-sm text-gray-500">$99.99 - Enhanced memorial features</p>
                  <code className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mt-1 inline-block">
                    {stripeLinks.deluxe}
                  </code>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <Button size="sm" variant="outline" onClick={() => testStripeLink("deluxe")}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Legacy Plan</h3>
                  <p className="text-sm text-gray-500">$249.99 - Full-service memorial creation</p>
                  <code className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mt-1 inline-block">
                    {stripeLinks.legacy}
                  </code>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <Button size="sm" variant="outline" onClick={() => testStripeLink("legacy")}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-800">Configuration Needed</p>
                  <p className="text-yellow-700 text-sm mt-1">
                    You need to create separate Stripe payment links for Deluxe and Legacy plans. Currently, they're
                    using the same link as Premium.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How to Create Stripe Payment Links</CardTitle>
            <CardDescription>Steps to create payment links for each plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                Go to your{" "}
                <a
                  href="https://dashboard.stripe.com/payment-links"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Stripe Dashboard → Payment Links
                </a>
              </li>
              <li>Click "Create payment link"</li>
              <li>Set up your product details (name, price, description)</li>
              <li>
                Configure success and cancel URLs:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>
                    <strong>Success URL:</strong>{" "}
                    <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                      {typeof window !== "undefined" ? window.location.origin : "https://yoursite.com"}
                      /checkout/confirmation?session_id={`{CHECKOUT_SESSION_ID}`}
                    </code>
                  </li>
                  <li>
                    <strong>Cancel URL:</strong>{" "}
                    <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                      {typeof window !== "undefined" ? window.location.origin : "https://yoursite.com"}
                      /checkout?canceled=true
                    </code>
                  </li>
                </ul>
              </li>
              <li>Copy the payment link and update your code</li>
            </ol>
          </CardContent>
        </Card>

        {testResult && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Test Initiated</p>
                  <p className="text-blue-700 text-sm mt-1">{testResult}</p>
                  <p className="text-blue-700 text-sm mt-1">The payment link should have opened in a new tab.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Test Your Checkout Flow</CardTitle>
            <CardDescription>Test the complete checkout experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <a href="/checkout?plan=premium">Test Premium Checkout Flow</a>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href="/checkout?plan=deluxe">Test Deluxe Checkout Flow</a>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href="/checkout?plan=legacy">Test Legacy Checkout Flow</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
