"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { updateOrderFulfillment } from "@/app/actions/order-fulfillment"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"

interface OrderTrackingProps {
  initialFulfillments: any[]
}

const FULFILLMENT_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "failed", label: "Failed" },
]

export function OrderTracking({ initialFulfillments }: OrderTrackingProps) {
  const [fulfillments, setFulfillments] = useState(initialFulfillments)
  const [currentFulfillment, setCurrentFulfillment] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredFulfillments = statusFilter ? fulfillments.filter((f) => f.status === statusFilter) : fulfillments

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentFulfillment((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCurrentFulfillment((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await updateOrderFulfillment(currentFulfillment.id, {
        status: currentFulfillment.status,
        tracking_number: currentFulfillment.tracking_number,
        tracking_url: currentFulfillment.tracking_url,
        shipping_carrier: currentFulfillment.shipping_carrier,
        estimated_delivery_date: currentFulfillment.estimated_delivery_date,
        notes: currentFulfillment.notes,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      setFulfillments(
        fulfillments.map((f) =>
          f.id === result.fulfillment?.id
            ? {
                ...f,
                ...result.fulfillment,
              }
            : f,
        ),
      )

      toast({ title: "Fulfillment updated successfully" })
      setIsDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (fulfillment: any) => {
    setCurrentFulfillment(fulfillment)
    setIsDialogOpen(true)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Filter by status:</span>
          <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {FULFILLMENT_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="ml-auto">
          <span className="text-sm text-muted-foreground">
            Showing {filteredFulfillments.length} of {fulfillments.length} fulfillments
          </span>
        </div>
      </div>

      {filteredFulfillments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No fulfillments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFulfillments.map((fulfillment) => (
            <Card key={fulfillment.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">Order #{fulfillment.order_id.substring(0, 8)}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(fulfillment.status)}`}
                      >
                        {fulfillment.status.charAt(0).toUpperCase() + fulfillment.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Supplier: {fulfillment.suppliers?.name || "Unknown"}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Created: {format(new Date(fulfillment.created_at), "MMM d, yyyy")}
                    </p>

                    {fulfillment.orders?.amount && (
                      <p className="text-sm">Order Amount: ${Number(fulfillment.orders.amount).toFixed(2)}</p>
                    )}

                    {fulfillment.supplier_order_id && (
                      <p className="text-sm">Supplier Order ID: {fulfillment.supplier_order_id}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    {fulfillment.tracking_number && (
                      <div>
                        <p className="text-sm font-medium">Tracking: {fulfillment.tracking_number}</p>
                        <p className="text-sm text-muted-foreground">
                          Carrier: {fulfillment.shipping_carrier || "Unknown"}
                        </p>
                        {fulfillment.tracking_url && (
                          <a
                            href={fulfillment.tracking_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Track Package
                          </a>
                        )}
                      </div>
                    )}

                    {fulfillment.estimated_delivery_date && (
                      <p className="text-sm">
                        Est. Delivery: {format(new Date(fulfillment.estimated_delivery_date), "MMM d, yyyy")}
                      </p>
                    )}
                  </div>

                  <div>
                    <Button onClick={() => openEditDialog(fulfillment)}>Update Status</Button>
                  </div>
                </div>

                {fulfillment.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm">{fulfillment.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Fulfillment</DialogTitle>
          </DialogHeader>

          {currentFulfillment && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <Select
                  value={currentFulfillment.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {FULFILLMENT_STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="shipping_carrier" className="block text-sm font-medium mb-1">
                  Shipping Carrier
                </label>
                <Input
                  id="shipping_carrier"
                  name="shipping_carrier"
                  value={currentFulfillment.shipping_carrier || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="tracking_number" className="block text-sm font-medium mb-1">
                  Tracking Number
                </label>
                <Input
                  id="tracking_number"
                  name="tracking_number"
                  value={currentFulfillment.tracking_number || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="tracking_url" className="block text-sm font-medium mb-1">
                  Tracking URL
                </label>
                <Input
                  id="tracking_url"
                  name="tracking_url"
                  value={currentFulfillment.tracking_url || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={currentFulfillment.notes || ""}
                  onChange={handleInputChange}
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
