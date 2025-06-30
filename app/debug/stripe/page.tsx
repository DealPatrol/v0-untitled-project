"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, ExternalLink, Copy, RefreshCw, CreditCard } from "lucide-react"
import Link from "next/link"

interface StripeConfig {
  environment_variables: {
    [key: string]: {
      present: boolean
      value: string | null
      required: boolean
    }
  }
  stripe_mode: string
  all_required_present: boolean
  recommendations: Array<{
    type: string
    message: string
    action: string
  }>
}

interface ConnectionTest {
  success: boolean
  error?: string
  details?: any
  message?: string
}

export default function StripeDebugPage() {
  const [config, setConfig] = useState<StripeConfig | null>(null)
  const [connectionTest, setConnectionTest] = useState<ConnectionTest | null>(null)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/debug/stripe-config")
      const data = await response.json()
      setConfig(data)
    } catch (error) {
      console.error("Failed to fetch config:", error)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setTesting(true)
    try {
      const response = await fetch("/api/test-stripe-connection")
      const data = await response.json()
      setConnectionTest(data)
    } catch (error) {
      setConnectionTest({
        success: false,
        error: "Failed to test connection",
      })
    } finally {
      setTesting(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          Loading Stripe configuration...
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <CreditCard className="h-8 w-8 mr-3 text-blue-600" />
          Stripe Configuration Debug
        </h1>
        <p className="text-gray-600">Check your Stripe setup and troubleshoot payment issues</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            {config?.all_required_present ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            )}
            Overall Status
          </CardTitle>
          <CardDescription>
            {config?.all_required_present
              ? "All required Stripe environment variables are configured"
              : "Some required environment variables are missing"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {config?.all_required_present ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✅ Stripe is properly configured!</p>
              <p className="text-green-700 text-sm mt-1">
                All required environment variables are present. You can now process payments.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">❌ Stripe configuration incomplete</p>
              <p className="text-red-700 text-sm mt-1">Missing required environment variables. See details below.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>Required configuration for Stripe integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {config?.environment_variables &&
              Object.entries(config.environment_variables).map(([key, info]) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    {info.present ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-3" />
                    )}
                    <div>
                      <div className="font-medium">{key}</div>
                      <div className="text-sm text-gray-500">
                        {info.required ? "Required" : "Optional"} • {info.present ? "Present" : "Missing"}
                      </div>
                      {info.value && <div className="text-xs text-gray-400 mt-1">{info.value}</div>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {info.present ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Configured</span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Missing</span>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {config?.stripe_mode && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="font-medium">Stripe Mode: {config.stripe_mode}</div>
              <div className="text-sm text-gray-600">
                {config.stripe_mode === "test" && "You're using test keys - no real payments will be processed"}
                {config.stripe_mode === "live" && "⚠️ You're using live keys - real payments will be processed"}
                {config.stripe_mode === "unknown" && "Unable to determine Stripe mode from keys"}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connection Test</CardTitle>
          <CardDescription>Test if your Stripe keys work correctly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={testConnection} disabled={testing || !config?.all_required_present}>
              {testing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  Testing...
                </>
              ) : (
                "Test Stripe Connection"
              )}
            </Button>

            {connectionTest && (
              <div
                className={`p-4 rounded-lg border ${
                  connectionTest.success
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center">
                  {connectionTest.success ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  <div className="font-medium">
                    {connectionTest.success ? "Connection Successful" : "Connection Failed"}
                  </div>
                </div>
                {connectionTest.message && <div className="mt-2 text-sm">{connectionTest.message}</div>}
                {connectionTest.error && <div className="mt-2 text-sm">{connectionTest.error}</div>}
                {connectionTest.details && (
                  <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto">
                    {JSON.stringify(connectionTest.details, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {config?.recommendations && config.recommendations.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>Follow these steps to configure Stripe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {config.recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="font-medium text-yellow-800">{rec.message}</div>
                  <div className="text-sm text-yellow-700 mt-1">{rec.action}</div>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="font-medium mb-2">Environment Variables to Add:</h3>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-3 rounded border">
                    <code className="text-sm">
                      STRIPE_SECRET_KEY=sk_test_51RG64jGSaaJtg47rgOECzc3MTYuNMilymC1KYbfXOFUGpf8DyX1s6DDzNdqZLpC2gZNpWy3Zxk1fnT85qVMhQcJ400e80J8Zj5
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() =>
                        copyToClipboard(
                          "STRIPE_SECRET_KEY=sk_test_51RG64jGSaaJtg47rgOECzc3MTYuNMilymC1KYbfXOFUGpf8DyX1s6DDzNdqZLpC2gZNpWy3Zxk1fnT85qVMhQcJ400e80J8Zj5",
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <code className="text-sm">
                      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51RG64jGSaaJtg47rJVInhLtXg2BU3zNEbaEIpMHdDA6KuiaI5ZYGDvwoiiVNUtBQOFOPaBS2neOO6G1obXIJsVYQ00PECC1YXp
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() =>
                        copyToClipboard(
                          "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51RG64jGSaaJtg47rJVInhLtXg2BU3zNEbaEIpMHdDA6KuiaI5ZYGDvwoiiVNUtBQOFOPaBS2neOO6G1obXIJsVYQ00PECC1YXp",
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <code className="text-sm">NEXT_PUBLIC_SITE_URL=http://localhost:3000</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() => copyToClipboard("NEXT_PUBLIC_SITE_URL=http://localhost:3000")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Mode Warning */}
      <Card className="mb-6 border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <AlertCircle className="h-5 w-5 mr-2" />
            Live Mode Warning
          </CardTitle>
          <CardDescription className="text-orange-700">
            You're using live Stripe keys - real payments will be processed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-orange-800">
            <p>
              ⚠️ <strong>Important:</strong> Your publishable key starts with <code>pk_live_</code>
            </p>
            <p>• Real credit cards will be charged</p>
            <p>• Real money will be transferred</p>
            <p>• Make sure your webhook endpoints are configured for production</p>
            <p>• Test thoroughly before going live</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Test your payment flow once configured</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="/checkout">Test Checkout</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/test-stripe">Test Stripe Integration</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://dashboard.stripe.com/apikeys" target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                Stripe Dashboard
              </Link>
            </Button>
            <Button variant="outline" onClick={fetchConfig}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Config
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
