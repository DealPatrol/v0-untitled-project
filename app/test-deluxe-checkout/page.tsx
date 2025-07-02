"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ExternalLink, CreditCard } from "lucide-react"
import Link from "next/link"

export default function TestDeluxeCheckoutPage() {
  const router = useRouter()

  const handleRedirectToCheckout = () => {
    router.push("/checkout?plan=deluxe")
  }

  const handleDirectStripeRedirect = () => {
    window.open("https://buy.stripe.com/test_aFa14geYWep85HAeQC8og00", "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Test Deluxe Checkout Flow</h1>
          <p className="text-gray-600">This page helps you test the Deluxe plan checkout with Stripe integration</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Test Checkout Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Test Full Checkout Flow
              </CardTitle>
              <CardDescription>Test the complete checkout experience with Deluxe plan pre-selected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">What this tests:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Deluxe plan pre-selection</li>
                  <li>• Credit card payment option</li>
                  <li>• Stripe redirect functionality</li>
                  <li>• Plan switching capabilities</li>
                  <li>• Alternative payment methods</li>
                </ul>
              </div>

              <Button onClick={handleRedirectToCheckout} className="w-full" size="lg">
                Go to Checkout (Deluxe Pre-selected)
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>

              <div className="text-sm text-gray-600 text-center">
                This will take you to: <code className="bg-gray-100 px-2 py-1 rounded">/checkout?plan=deluxe</code>
              </div>
            </CardContent>
          </Card>

          {/* Direct Stripe Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                Test Direct Stripe Link
              </CardTitle>
              <CardDescription>Test the Deluxe Stripe payment link directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">Direct Stripe Link:</h3>
                <code className="text-sm text-yellow-700 break-all">
                  https://buy.stripe.com/test_aFa14geYWep85HAeQC8og00
                </code>
              </div>

              <Button
                onClick={handleDirectStripeRedirect}
                className="w-full bg-transparent"
                size="lg"
                variant="outline"
              >
                Open Stripe Link Directly
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>

              <div className="text-sm text-gray-600 text-center">This opens the Stripe payment page in a new tab</div>
            </CardContent>
          </Card>
        </div>

        {/* Test Scenarios */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test Scenarios to Try</CardTitle>
            <CardDescription>Here are the key scenarios you should test with the Deluxe checkout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3 text-green-700">✅ Should Work:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Deluxe plan + Credit Card → Stripe redirect</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Deluxe plan + Bank Transfer → Internal system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Deluxe plan + Pay on Delivery → Internal system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Switch from Deluxe to Premium → Credit card still works</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-red-700">❌ Expected Restrictions:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ExternalLink className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Legacy plan + Credit Card → Shows error message</span>
                  </li>
                  <li className="flex items-start">
                    <ExternalLink className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Missing shipping info + Alternative payment → Form validation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/checkout?plan=premium">
            <Button variant="outline">Test Premium Checkout</Button>
          </Link>
          <Link href="/checkout?plan=deluxe">
            <Button variant="outline">Test Deluxe Checkout</Button>
          </Link>
          <Link href="/checkout?plan=legacy">
            <Button variant="outline">Test Legacy Checkout</Button>
          </Link>
          <Link href="/checkout">
            <Button variant="outline">Test Default Checkout</Button>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
