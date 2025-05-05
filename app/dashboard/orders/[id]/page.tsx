import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getFulfillmentByOrderId } from "@/app/actions/order-fulfillment"
import { format } from "date-fns"
import { ArrowLeft, Package, Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "Order Details | Memorial QR",
  description: "View order details and fulfillment status",
}

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  // Get order details
  const { data: order, error } = await supabase.from("orders").select("*").eq("id", params.id).single()

  if (error || !order) {
    notFound()
  }

  // Get fulfillment details
  const { fulfillment } = await getFulfillmentByOrderId(params.id)

  // Get shipping details
  const { data: shipping } = await supabase.from("shipping").select("*").eq("order_id", params.id).maybeSingle()

  // Get QR codes for this order
  const { data: qrCodes } = await supabase.from("qr_codes").select("*, memorials(name)").eq("order_id", params.id)

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
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/orders">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Order Details</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                <dd>{order.id}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd>${Number(order.amount).toFixed(2)}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd>{format(new Date(order.created_at), "MMMM d, yyyy 'at' h:mm a")}</dd>
              </div>

              {order.stripe_payment_intent_id && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Payment ID</dt>
                  <dd className="font-mono text-sm">{order.stripe_payment_intent_id}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fulfillment Status</CardTitle>
            {fulfillment && (
              <Link href="/dashboard/fulfillments">
                <Button variant="outline" size="sm">
                  <Truck className="h-4 w-4 mr-2" />
                  Manage Fulfillment
                </Button>
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {fulfillment ? (
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(fulfillment.status)}`}
                    >
                      {fulfillment.status.charAt(0).toUpperCase() + fulfillment.status.slice(1)}
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Supplier</dt>
                  <dd>{fulfillment.suppliers?.name || "Unknown"}</dd>
                </div>

                {fulfillment.supplier_order_id && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Supplier Order ID</dt>
                    <dd>{fulfillment.supplier_order_id}</dd>
                  </div>
                )}

                {fulfillment.tracking_number && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tracking</dt>
                    <dd>
                      {fulfillment.tracking_number}
                      {fulfillment.tracking_url && (
                        <a
                          href={fulfillment.tracking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          Track
                        </a>
                      )}
                    </dd>
                  </div>
                )}

                {fulfillment.shipping_carrier && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Carrier</dt>
                    <dd>{fulfillment.shipping_carrier}</dd>
                  </div>
                )}

                {fulfillment.estimated_delivery_date && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Estimated Delivery</dt>
                    <dd>{format(new Date(fulfillment.estimated_delivery_date), "MMMM d, yyyy")}</dd>
                  </div>
                )}

                {fulfillment.notes && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="text-sm whitespace-pre-wrap">{fulfillment.notes}</dd>
                  </div>
                )}
              </dl>
            ) : (
              <div className="text-center py-6">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No fulfillment information available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            {shipping || (order.metadata && order.metadata.shipping) ? (
              <div className="grid md:grid-cols-2 gap-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Recipient</dt>
                    <dd>{shipping?.shipping_address?.name || order.metadata?.shipping?.name || "N/A"}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd>
                      <address className="not-italic">
                        {shipping?.shipping_address?.line1 || order.metadata?.shipping?.address?.line1}
                        <br />
                        {(shipping?.shipping_address?.line2 || order.metadata?.shipping?.address?.line2) && (
                          <>
                            {shipping?.shipping_address?.line2 || order.metadata?.shipping?.address?.line2}
                            <br />
                          </>
                        )}
                        {shipping?.shipping_address?.city || order.metadata?.shipping?.address?.city},{" "}
                        {shipping?.shipping_address?.state || order.metadata?.shipping?.address?.state}{" "}
                        {shipping?.shipping_address?.postal_code || order.metadata?.shipping?.address?.postal_code}
                        <br />
                        {shipping?.shipping_address?.country || order.metadata?.shipping?.address?.country}
                      </address>
                    </dd>
                  </div>
                </dl>

                {shipping && (
                  <dl className="space-y-4">
                    {shipping.tracking_number && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Tracking Number</dt>
                        <dd>{shipping.tracking_number}</dd>
                      </div>
                    )}

                    {shipping.carrier && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Carrier</dt>
                        <dd>{shipping.carrier}</dd>
                      </div>
                    )}

                    {shipping.status && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(shipping.status)}`}
                          >
                            {shipping.status.charAt(0).toUpperCase() + shipping.status.slice(1)}
                          </span>
                        </dd>
                      </div>
                    )}

                    {shipping.estimated_delivery_date && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Estimated Delivery</dt>
                        <dd>{format(new Date(shipping.estimated_delivery_date), "MMMM d, yyyy")}</dd>
                      </div>
                    )}

                    {shipping.actual_delivery_date && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Delivered On</dt>
                        <dd>{format(new Date(shipping.actual_delivery_date), "MMMM d, yyyy")}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No shipping information available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {qrCodes && qrCodes.length > 0 && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qrCodes.map((qr) => (
                  <div key={qr.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{qr.memorials?.name || "Unnamed Memorial"}</p>
                      <p className="text-sm text-gray-500">Code: {qr.unique_code}</p>
                      <p className="text-sm text-gray-500">Type: {qr.design_type}</p>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(qr.status)}`}
                      >
                        {qr.status.charAt(0).toUpperCase() + qr.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
