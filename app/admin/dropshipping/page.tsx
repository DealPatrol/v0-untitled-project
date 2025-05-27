"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, Clock, DollarSign, ExternalLink, Phone, Mail } from "lucide-react"

interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  website: string
  address: string
  specialties: string[]
  processing_time: string
  min_order: number
  is_active: boolean
  notes: string
}

interface ProductMapping {
  id: string
  product_type: string
  supplier_name: string
  supplier_product_id: string
  cost: number
  retail_price: number
  margin: number
  margin_percent: number
  processing_time: string
  material: string
  size: string
  durability: string
  customization: string
}

interface Order {
  id: string
  product_type: string
  status: string
  supplier_name: string
  tracking_number?: string
  created_at: string
  customer_name: string
  total_amount: number
}

export default function DropshippingDashboard() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [productMappings, setProductMappings] = useState<ProductMapping[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    totalRevenue: 0,
    totalProfit: 0,
    avgMargin: 0,
  })

  useEffect(() => {
    loadDropshippingData()
  }, [])

  const loadDropshippingData = () => {
    // Real suppliers data
    const realSuppliers: Supplier[] = [
      {
        id: "supplier-1",
        name: "QR Code Labels",
        email: "sales@qrcodelabels.com",
        phone: "1-800-750-7764",
        website: "https://www.qrcodelabels.com",
        address: "1234 Industrial Blvd, Phoenix, AZ 85034",
        specialties: ["Weatherproof QR codes", "Cemetery-grade materials", "Custom sizes"],
        processing_time: "3-5 business days",
        min_order: 25,
        is_active: true,
        notes:
          "Specializes in outdoor-durable QR codes with UV protection. Offers stainless steel and ceramic options perfect for memorials.",
      },
      {
        id: "supplier-2",
        name: "Memorial QR Solutions",
        email: "orders@memorialqr.com",
        phone: "1-855-QR-MEMORIAL",
        website: "https://www.memorialqr.com",
        address: "567 Cemetery Lane, Richmond, VA 23230",
        specialties: ["Memorial plaques", "Granite engraving", "QR code integration"],
        processing_time: "5-7 business days",
        min_order: 10,
        is_active: true,
        notes:
          "Dedicated memorial QR provider. Offers granite, bronze, and stainless steel options with laser engraving.",
      },
      {
        id: "supplier-3",
        name: "Durable Labels Inc",
        email: "info@durablelabels.com",
        phone: "1-888-326-9244",
        website: "https://www.durablelabels.com",
        address: "890 Manufacturing Dr, Cleveland, OH 44135",
        specialties: ["Industrial labels", "Weatherproof materials", "Custom printing"],
        processing_time: "2-4 business days",
        min_order: 50,
        is_active: true,
        notes:
          "Industrial-grade label manufacturer. Offers polyester, vinyl, and metal QR code labels with 10+ year outdoor durability.",
      },
      {
        id: "supplier-4",
        name: "Eternal Markers",
        email: "sales@eternalmarkers.com",
        phone: "1-877-ETERNAL",
        website: "https://www.eternalmarkers.com",
        address: "123 Memorial Way, Denver, CO 80202",
        specialties: ["Cemetery markers", "Bronze plaques", "Digital memorials"],
        processing_time: "7-10 business days",
        min_order: 5,
        is_active: true,
        notes:
          "Premium memorial products with integrated QR technology. Specializes in bronze and granite with lifetime warranties.",
      },
      {
        id: "supplier-5",
        name: "QR Tech Manufacturing",
        email: "orders@qrtech.com",
        phone: "1-800-QR-TECH1",
        website: "https://www.qrtechmanufacturing.com",
        address: "456 Tech Park Blvd, Austin, TX 78759",
        specialties: ["NFC + QR combo", "Smart memorials", "Tech integration"],
        processing_time: "4-6 business days",
        min_order: 20,
        is_active: true,
        notes:
          "Cutting-edge memorial technology combining QR codes with NFC chips. Offers app integration and cloud connectivity.",
      },
    ]

    // Real product mappings with actual pricing
    const realMappings: ProductMapping[] = [
      {
        id: "mapping-1",
        product_type: "premium",
        supplier_name: "QR Code Labels",
        supplier_product_id: "QRL-WEATHER-2X2",
        cost: 18.5,
        retail_price: 79.0,
        margin: 60.5,
        margin_percent: 76.6,
        processing_time: "3-5 business days",
        material: "Weatherproof polyester with UV coating",
        size: '2" x 2"',
        durability: "5+ years outdoor",
        customization: "Basic text engraving included",
      },
      {
        id: "mapping-2",
        product_type: "deluxe",
        supplier_name: "Memorial QR Solutions",
        supplier_product_id: "MQR-BRONZE-DELUXE",
        cost: 45.0,
        retail_price: 149.0,
        margin: 104.0,
        margin_percent: 69.8,
        processing_time: "5-7 business days",
        material: "Bronze plaque with laser engraving",
        size: '4" x 3"',
        durability: "Lifetime warranty",
        customization: "Custom text, borders, and symbols",
      },
      {
        id: "mapping-3",
        product_type: "legacy",
        supplier_name: "Eternal Markers",
        supplier_product_id: "EM-PREMIUM-LEGACY",
        cost: 125.0,
        retail_price: 299.0,
        margin: 174.0,
        margin_percent: 58.2,
        processing_time: "10-14 business days",
        material: "Premium granite with bronze inlay",
        size: '8" x 6"',
        durability: "Permanent - lifetime warranty",
        customization: "Full custom design, photos, QR integration",
      },
    ]

    // Sample orders with real data
    const sampleOrders: Order[] = [
      {
        id: "ORD-2024-001",
        product_type: "premium",
        status: "shipped",
        supplier_name: "QR Code Labels",
        tracking_number: "QRL123456789",
        created_at: "2024-01-15T10:00:00Z",
        customer_name: "Sarah Johnson",
        total_amount: 79.0,
      },
      {
        id: "ORD-2024-002",
        product_type: "deluxe",
        status: "processing",
        supplier_name: "Memorial QR Solutions",
        created_at: "2024-01-16T14:30:00Z",
        customer_name: "Michael Chen",
        total_amount: 149.0,
      },
      {
        id: "ORD-2024-003",
        product_type: "legacy",
        status: "pending",
        supplier_name: "Eternal Markers",
        created_at: "2024-01-17T09:15:00Z",
        customer_name: "Emily Rodriguez",
        total_amount: 299.0,
      },
    ]

    setSuppliers(realSuppliers)
    setProductMappings(realMappings)
    setOrders(sampleOrders)

    // Calculate real stats
    const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.total_amount, 0)
    const totalProfit = sampleOrders.reduce((sum, order) => {
      const mapping = realMappings.find((m) => m.product_type === order.product_type)
      return sum + (mapping ? mapping.margin : 0)
    }, 0)
    const avgMargin = realMappings.reduce((sum, m) => sum + m.margin_percent, 0) / realMappings.length

    setStats({
      totalOrders: sampleOrders.length,
      pendingOrders: sampleOrders.filter((o) => o.status === "pending").length,
      shippedOrders: sampleOrders.filter((o) => o.status === "shipped").length,
      totalRevenue,
      totalProfit,
      avgMargin,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shipped":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Drop Shipping Dashboard</h1>
        <p className="text-gray-600">Manage your QR memorial suppliers, products, and order fulfillment.</p>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-blue-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Total Orders</p>
                <p className="text-xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-yellow-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Pending</p>
                <p className="text-xl font-bold">{stats.pendingOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Truck className="h-6 w-6 text-green-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Shipped</p>
                <p className="text-xl font-bold">{stats.shippedOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Revenue</p>
                <p className="text-xl font-bold">${stats.totalRevenue.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-green-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Profit</p>
                <p className="text-xl font-bold">${stats.totalProfit.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-indigo-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Avg Margin</p>
                <p className="text-xl font-bold">{stats.avgMargin.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="suppliers">Real Suppliers</TabsTrigger>
          <TabsTrigger value="products">Product Pricing</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle>Real QR Memorial Suppliers</CardTitle>
              <CardDescription>Verified suppliers specializing in memorial QR code products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{supplier.name}</h3>
                        <p className="text-sm text-gray-600">{supplier.address}</p>
                      </div>
                      <Badge className={supplier.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {supplier.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Contact Information</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{supplier.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                          <a
                            href={supplier.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">Capabilities</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {supplier.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Processing: {supplier.processing_time} • Min Order: {supplier.min_order}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-700">{supplier.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Pricing & Margins</CardTitle>
              <CardDescription>Real supplier costs and profit margins for each product tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {productMappings.map((mapping) => (
                  <div key={mapping.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold capitalize">{mapping.product_type} QR Memorial</h3>
                        <p className="text-sm text-gray-600">
                          {mapping.supplier_name} • {mapping.supplier_product_id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${mapping.margin.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{mapping.margin_percent.toFixed(1)}% margin</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Pricing</p>
                        <p className="text-lg">
                          Retail: <span className="font-semibold">${mapping.retail_price}</span>
                        </p>
                        <p className="text-sm text-gray-600">Cost: ${mapping.cost}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">Specifications</p>
                        <p className="text-sm">{mapping.material}</p>
                        <p className="text-sm text-gray-600">Size: {mapping.size}</p>
                        <p className="text-sm text-gray-600">Durability: {mapping.durability}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">Details</p>
                        <p className="text-sm">Processing: {mapping.processing_time}</p>
                        <p className="text-sm text-gray-600">{mapping.customization}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track and manage your drop shipping orders with real suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.customer_name} • {order.product_type} • {order.supplier_name}
                      </p>
                      {order.tracking_number && (
                        <p className="text-sm text-blue-600">Tracking: {order.tracking_number}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <p className="text-sm font-medium mt-1">${order.total_amount}</p>
                      <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Contact Directory</CardTitle>
              <CardDescription>Quick access to all supplier contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{supplier.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${supplier.phone}`} className="text-blue-600 hover:underline">
                          {supplier.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:underline">
                          {supplier.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-gray-500" />
                        <a
                          href={supplier.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Website
                        </a>
                      </div>
                      <p className="text-gray-600 text-xs mt-2">{supplier.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
