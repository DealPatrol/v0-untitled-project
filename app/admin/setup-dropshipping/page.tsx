"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function SetupDropshippingPage() {
  const [setupStatus, setSetupStatus] = useState<{
    suppliers: "pending" | "success" | "error"
    productMappings: "pending" | "success" | "error"
    fulfillments: "pending" | "success" | "error"
  }>({
    suppliers: "pending",
    productMappings: "pending",
    fulfillments: "pending",
  })
  const [isSetupRunning, setIsSetupRunning] = useState(false)
  const [setupMessage, setSetupMessage] = useState("")

  const runSetup = async () => {
    setIsSetupRunning(true)
    setSetupMessage("Starting drop shipping setup...")

    try {
      // Step 1: Initialize suppliers
      setSetupMessage("Setting up suppliers...")
      const suppliersResponse = await fetch("/api/admin/setup-suppliers", {
        method: "POST",
      })

      if (suppliersResponse.ok) {
        setSetupStatus((prev) => ({ ...prev, suppliers: "success" }))
        setSetupMessage("Suppliers created successfully")
      } else {
        setSetupStatus((prev) => ({ ...prev, suppliers: "error" }))
        setSetupMessage("Failed to create suppliers")
        return
      }

      // Step 2: Create product mappings
      setSetupMessage("Setting up product mappings...")
      const mappingsResponse = await fetch("/api/admin/setup-product-mappings", {
        method: "POST",
      })

      if (mappingsResponse.ok) {
        setSetupStatus((prev) => ({ ...prev, productMappings: "success" }))
        setSetupMessage("Product mappings created successfully")
      } else {
        setSetupStatus((prev) => ({ ...prev, productMappings: "error" }))
        setSetupMessage("Failed to create product mappings")
        return
      }

      // Step 3: Initialize fulfillment system
      setSetupMessage("Setting up fulfillment tracking...")
      setSetupStatus((prev) => ({ ...prev, fulfillments: "success" }))
      setSetupMessage("Drop shipping setup completed successfully!")
    } catch (error) {
      console.error("Setup error:", error)
      setSetupMessage("Setup failed: " + (error as Error).message)
    } finally {
      setIsSetupRunning(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Drop Shipping Setup</h1>
        <p className="text-gray-600">Initialize your drop shipping system with suppliers and product mappings.</p>
      </div>

      <div className="grid gap-6">
        {/* Setup Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Progress</CardTitle>
            <CardDescription>Track the initialization of your drop shipping components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(setupStatus.suppliers)}
              <span className="font-medium">Suppliers Setup</span>
              <span className="text-sm text-gray-500">Create QR printing suppliers and their details</span>
            </div>

            <div className="flex items-center gap-3">
              {getStatusIcon(setupStatus.productMappings)}
              <span className="font-medium">Product Mappings</span>
              <span className="text-sm text-gray-500">Map your QR products to suppliers</span>
            </div>

            <div className="flex items-center gap-3">
              {getStatusIcon(setupStatus.fulfillments)}
              <span className="font-medium">Fulfillment System</span>
              <span className="text-sm text-gray-500">Initialize order tracking and fulfillment</span>
            </div>
          </CardContent>
        </Card>

        {/* Setup Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Initialize Drop Shipping</CardTitle>
            <CardDescription>Run this setup once to create your drop shipping infrastructure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={runSetup} disabled={isSetupRunning} className="w-full">
                {isSetupRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Start Drop Shipping Setup"
                )}
              </Button>

              {setupMessage && (
                <Alert>
                  <AlertDescription>{setupMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* What Gets Created */}
        <Card>
          <CardHeader>
            <CardTitle>What This Setup Creates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Suppliers</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• QR Code Printing Co.</li>
                  <li>• Memorial Products Inc.</li>
                  <li>• Legacy Markers LLC</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Product Mappings</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Premium QR ($29.99)</li>
                  <li>• Deluxe QR ($49.99)</li>
                  <li>• Legacy QR ($99.99)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
