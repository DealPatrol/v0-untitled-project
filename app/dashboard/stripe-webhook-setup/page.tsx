"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function StripeWebhookSetup() {
  const [webhookStatus, setWebhookStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  const webhookUrl = `${siteUrl}/api/webhooks/stripe`

  const checkWebhookStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-webhook")
      const data = await response.json()
      setWebhookStatus(data)
    } catch (error) {
      console.error("Error checking webhook status:", error)
      setWebhookStatus({
        success: false,
        message: "Error checking webhook status",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    checkWebhookStatus()
  }, [])

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Stripe Webhook Setup</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Webhook URL</CardTitle>
            <CardDescription>Use this URL when setting up your webhook in the Stripe dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
              <code className="text-sm flex-1 overflow-x-auto">{webhookUrl}</code>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? "Copied!" : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Status</CardTitle>
            <CardDescription>Checking if your webhook is properly configured in Stripe</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                <span>Checking webhook status...</span>
              </div>
            ) : webhookStatus ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {webhookStatus.success ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-700">Webhook configured correctly</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="font-medium text-red-700">Webhook not configured</span>
                    </>
                  )}
                </div>

                {webhookStatus.success ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <p className="text-sm mb-2">Your webhook is properly configured with the following details:</p>
                    <ul className="text-sm space-y-1">
                      <li>
                        <span className="font-medium">URL:</span> {webhookStatus.endpoint.url}
                      </li>
                      <li>
                        <span className="font-medium">Status:</span> {webhookStatus.endpoint.status}
                      </li>
                      <li>
                        <span className="font-medium">Events:</span>{" "}
                        {webhookStatus.endpoint.enabledEvents.includes("*")
                          ? "All events"
                          : webhookStatus.endpoint.enabledEvents.join(", ")}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-sm mb-2">{webhookStatus.message}</p>
                    {webhookStatus.expectedUrl && (
                      <p className="text-sm">
                        <span className="font-medium">Expected URL:</span> {webhookStatus.expectedUrl}
                      </p>
                    )}
                    {webhookStatus.existingEndpoints && webhookStatus.existingEndpoints.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Existing webhook endpoints:</p>
                        <ul className="text-sm list-disc pl-5 mt-1">
                          {webhookStatus.existingEndpoints.map((url: string, index: number) => (
                            <li key={index}>{url}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p>Unable to check webhook status</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={checkWebhookStatus} disabled={loading}>
              {loading ? "Checking..." : "Check Again"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>Follow these steps to configure your Stripe webhook</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-4">
              <li>
                <p className="mb-1">Go to the Stripe Dashboard Webhooks section</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Stripe Dashboard
                  </Link>
                </Button>
              </li>
              <li>
                <p>
                  Click on <strong>Add endpoint</strong>
                </p>
              </li>
              <li>
                <p>Enter your webhook URL:</p>
                <div className="bg-gray-100 p-2 rounded-md my-2">
                  <code className="text-sm">{webhookUrl}</code>
                </div>
              </li>
              <li>
                <p>Select events to listen to. For a complete integration, choose:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>checkout.session.completed</li>
                  <li>checkout.session.expired</li>
                  <li>payment_intent.payment_failed</li>
                  <li>charge.refunded</li>
                </ul>
                <p className="mt-2 text-sm text-gray-600">
                  Alternatively, you can select "All events" to receive all webhook events.
                </p>
              </li>
              <li>
                <p>
                  Click <strong>Add endpoint</strong> to create your webhook
                </p>
              </li>
              <li>
                <p>
                  After creating the webhook, you'll see a <strong>Signing secret</strong>. Click{" "}
                  <strong>Reveal</strong> to view it
                </p>
              </li>
              <li>
                <p>
                  Add this signing secret to your environment variables as <code>strip_webhook_secret</code>
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-2">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Keep this signing secret secure and never share it publicly
                  </p>
                </div>
              </li>
              <li>
                <p>Return to this page and click "Check Again" to verify your webhook is properly configured</p>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Your Webhook</CardTitle>
            <CardDescription>
              After setting up your webhook, you can test it to ensure it's working correctly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              You can test your webhook by making a test purchase or by using the Stripe webhook testing tool.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Option 1: Make a test purchase</h3>
                <p className="text-sm mb-2">
                  The easiest way to test your webhook is to make a test purchase using our test page:
                </p>
                <Button asChild>
                  <Link href="/test-stripe">Go to Test Purchase Page</Link>
                </Button>
              </div>

              <div>
                <h3 className="font-medium mb-2">Option 2: Use Stripe's webhook testing tool</h3>
                <p className="text-sm mb-2">Stripe provides a tool to send test webhook events to your endpoint:</p>
                <Button variant="outline" asChild>
                  <Link href="https://dashboard.stripe.com/test/webhooks" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Stripe Webhook Testing Tool
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
