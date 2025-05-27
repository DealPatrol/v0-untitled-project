"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react"

export default function PaymentDebugPage() {
  const [config, setConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConfig = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/debug/config")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch configuration")
      }

      setConfig(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching configuration")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const testPayment = async () => {
    try {
      // Redirect to test Stripe page
      window.location.href = "/test-stripe"
    } catch (err) {
      console.error("Error testing payment:", err)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-800 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking payment configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Payment System Diagnostics</h1>
          <Button variant="outline" size="sm" onClick={fetchConfig} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-700 flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                Configuration Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}

        {config && (
          <>
            {/* Environment Configuration */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Environment Configuration</CardTitle>
                <CardDescription>Check if all required environment variables are set</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span>Stripe Secret Key</span>
                    {config.stripeConfigured ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Stripe Publishable Key</span>
                    {config.publicStripeConfigured ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Webhook Secret</span>
                    {config.stripeWebhookConfigured ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Site URL</span>
                    {config.publicUrlConfigured ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Environment:</strong> {config.nodeEnv}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Configuration Issues */}
            {(!config.stripeConfigured || !config.publicStripeConfigured || !config.stripeWebhookConfigured) && (
              <Card className="mb-6 border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Configuration Issues Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-yellow-800">
                    {!config.stripeConfigured && <p>• Missing STRIPE_SECRET_KEY environment variable</p>}
                    {!config.publicStripeConfigured && (
                      <p>• Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable</p>
                    )}
                    {!config.stripeWebhookConfigured && <p>• Missing strip_webhook_secret environment variable</p>}
                    {!config.publicUrlConfigured && <p>• Missing NEXT_PUBLIC_SITE_URL environment variable</p>}
                  </div>
                  <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>To fix these issues:</strong>
                    </p>
                    <ol className="list-decimal pl-5 mt-2 text-sm text-yellow-800">
                      <li>Go to your Stripe Dashboard and get your API keys</li>
                      <li>Add the missing environment variables to your project</li>
                      <li>Set up a webhook endpoint in Stripe pointing to your site</li>
                      <li>Refresh this page to verify the configuration</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Test Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Test Payment Processing</CardTitle>
                <CardDescription>Test your Stripe integration with a sample payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Click the button below to test your payment processing with Stripe's test mode.
                  </p>
                  <Button onClick={testPayment} className="w-full">
                    Test Payment Processing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-lg mb-4">How to Fix Payment Issues</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Get Stripe API Keys:</strong> Go to your{" "}
              <a
                href="https://dashboard.stripe.com/apikeys"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Stripe Dashboard
              </a>{" "}
              and copy your publishable and secret keys
            </li>
            <li>
              <strong>Set Environment Variables:</strong> Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
              to your environment
            </li>
            <li>
              <strong>Configure Webhook:</strong> Create a webhook endpoint in Stripe pointing to{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">your-domain.com/api/webhooks/stripe</code>
            </li>
            <li>
              <strong>Add Webhook Secret:</strong> Copy the webhook signing secret and add it as strip_webhook_secret
            </li>
            <li>
              <strong>Test Integration:</strong> Use the test payment button above to verify everything works
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
