"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, ExternalLink, Copy, RefreshCw, CreditCard } from "lucide-react"
import Link from "next/link"

interface PayPalConfig {
  environment_variables: {
    [key: string]: {
      present: boolean
      value: string | null
      required: boolean
    }
  }
  paypal_environment: string
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

export default function PayPalDebugPage() {
  const [config, setConfig] = useState<PayPalConfig | null>(null)
  const [connectionTest, setConnectionTest] = useState<ConnectionTest | null>(null)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/debug/paypal-config")
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
      const response = await fetch("/api/test-paypal-connection")
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
          Loading PayPal configuration...
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <CreditCard className="h-8 w-8 mr-3 text-blue-600" />
          PayPal Configuration Debug
        </h1>
        <p className="text-gray-600">Check your PayPal setup and troubleshoot payment issues</p>
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
              ? "All required PayPal environment variables are configured"
              : "Some required environment variables are missing"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {config?.all_required_present ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✅ PayPal is properly configured!</p>
              <p className="text-green-700 text-sm mt-1">
                All required environment variables are present. You can now process payments.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">❌ PayPal configuration incomplete</p>
              <p className="text-red-700 text-sm mt-1">Missing required environment variables. See details below.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>Required configuration for PayPal integration</CardDescription>
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

          {config?.paypal_environment && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="font-medium">PayPal Environment: {config.paypal_environment}</div>
              <div className="text-sm text-gray-600">
                {config.paypal_environment === "sandbox" &&
                  "You're using sandbox mode - no real payments will be processed"}
                {config.paypal_environment === "live" && "⚠️ You're using live mode - real payments will be processed"}
                {config.paypal_environment === "not_set" && "Environment not configured"}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connection Test</CardTitle>
          <CardDescription>Test if your PayPal credentials work correctly</CardDescription>
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
                "Test PayPal Connection"
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
            <CardDescription>Follow these steps to configure PayPal</CardDescription>
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
                    <code className="text-sm">PAYPAL_CLIENT_ID=your_paypal_client_id_here</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() => copyToClipboard("PAYPAL_CLIENT_ID=")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <code className="text-sm">PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() => copyToClipboard("PAYPAL_CLIENT_SECRET=")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <code className="text-sm">PAYPAL_ENVIRONMENT=sandbox</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() => copyToClipboard("PAYPAL_ENVIRONMENT=sandbox")}
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>PayPal Setup Guide</CardTitle>
          <CardDescription>How to get your PayPal credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium">Create PayPal Developer Account</p>
                <p className="text-gray-600">Go to developer.paypal.com and sign up</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium">Create an Application</p>
                <p className="text-gray-600">Create a new app to get your Client ID and Secret</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium">Copy Credentials</p>
                <p className="text-gray-600">Copy the Client ID and Client Secret to your environment variables</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                4
              </div>
              <div>
                <p className="font-medium">Set Environment</p>
                <p className="text-gray-600">Use "sandbox" for testing, "live" for production</p>
              </div>
            </div>
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
              <Link href="/test-paypal">Test PayPal Integration</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://developer.paypal.com" target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                PayPal Developer
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
