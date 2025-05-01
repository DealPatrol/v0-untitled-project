"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"

export default function StripeTestDashboard() {
  const [loading, setLoading] = useState(true)
  const [testResults, setTestResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchTestResults = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/test-stripe-connection")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to test Stripe connection")
      }

      setTestResults(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while testing Stripe connection")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestResults()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Stripe Integration Test Dashboard</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={fetchTestResults} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/test-stripe">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Test Page
                </Link>
              </Button>
            </div>
          </div>

          {error && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-red-700 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700">{error}</p>
              </CardContent>
            </Card>
          )}

          {loading && !error ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-800 rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-600">Testing Stripe connection...</p>
            </div>
          ) : testResults ? (
            <>
              {/* Connection Status */}
              <Card
                className={`mb-6 ${testResults.connection.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle
                    className={`flex items-center ${testResults.connection.success ? "text-green-700" : "text-red-700"}`}
                  >
                    {testResults.connection.success ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2" />
                    )}
                    Stripe Connection
                  </CardTitle>
                  <CardDescription>
                    {testResults.stripeMode === "test" ? "Using Stripe Test Mode" : "Using Stripe Live Mode"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{testResults.connection.message}</p>
                </CardContent>
              </Card>

              {/* Webhook Configuration */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {testResults.webhooks.success ? (
                      testResults.webhooks.webhooks.length > 0 ? (
                        <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                      )
                    ) : (
                      <XCircle className="h-5 w-5 mr-2 text-red-600" />
                    )}
                    Webhook Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {testResults.webhooks.success ? (
                    testResults.webhooks.webhooks.length > 0 ? (
                      <div>
                        <p className="mb-2">Found {testResults.webhooks.webhooks.length} webhook endpoint(s):</p>
                        <ul className="space-y-2">
                          {testResults.webhooks.webhooks.map((webhook: any, index: number) => (
                            <li key={index} className="bg-gray-100 p-3 rounded-md">
                              <div className="font-medium">URL: {webhook.url}</div>
                              <div className="text-sm text-gray-600">Status: {webhook.status}</div>
                              <div className="text-sm text-gray-600">
                                Events:{" "}
                                {webhook.enabled_events.length === 1 && webhook.enabled_events[0] === "*"
                                  ? "All events"
                                  : webhook.enabled_events.join(", ")}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="bg-yellow-100 p-4 rounded-md text-yellow-800">
                        <p className="font-medium">No webhook endpoints configured</p>
                        <p className="text-sm mt-1">
                          You should configure a webhook endpoint to receive Stripe events. Set it to:{" "}
                          {`${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/stripe`}
                        </p>
                      </div>
                    )
                  ) : (
                    <p className="text-red-600">{testResults.webhooks.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Stripe Events</CardTitle>
                  <CardDescription>Last {testResults.events.events?.length || 0} events from Stripe</CardDescription>
                </CardHeader>
                <CardContent>
                  {testResults.events.success ? (
                    testResults.events.events.length > 0 ? (
                      <div className="space-y-3">
                        {testResults.events.events.map((event: any, index: number) => (
                          <div key={index} className="bg-gray-100 p-3 rounded-md">
                            <div className="font-medium">{event.type}</div>
                            <div className="text-sm text-gray-600">ID: {event.id}</div>
                            <div className="text-sm text-gray-600">
                              Created: {new Date(event.created * 1000).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No recent events found.</p>
                    )
                  ) : (
                    <p className="text-red-600">{testResults.events.message}</p>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <p className="text-sm text-gray-600">
                    After making a test payment, refresh this page to see the events.
                  </p>
                </CardFooter>
              </Card>
            </>
          ) : null}

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-4">How to Test Your Stripe Integration</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Verify that your Stripe connection is working (green status above)</li>
              <li>
                Go to the{" "}
                <Link href="/test-stripe" className="text-blue-600 hover:underline">
                  test page
                </Link>{" "}
                and make a test purchase
              </li>
              <li>Use the test card number 4242 4242 4242 4242 with any future expiration date and any CVC</li>
              <li>After completing the test purchase, return to this dashboard and click "Refresh"</li>
              <li>You should see new events related to your test purchase</li>
              <li>Check your Stripe dashboard to confirm the test payment was recorded</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
