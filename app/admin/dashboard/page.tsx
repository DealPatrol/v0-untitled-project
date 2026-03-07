'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { BarChart3, Package, Users, DollarSign, TrendingUp, Loader2, Eye, Download } from 'lucide-react'

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalCustomers: 0,
  })
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch orders
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data)

        // Calculate stats
        const stats = {
          totalOrders: data.length,
          totalRevenue: data.reduce((sum: number, order: any) => sum + order.total, 0),
          pendingOrders: data.filter((order: any) => order.payment_status === 'pending').length,
          totalCustomers: new Set(data.map((order: any) => order.customer_email)).size,
        }
        setStats(stats)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching orders:', error)
        toast({
          title: 'Error',
          description: 'Failed to load orders',
          variant: 'destructive',
        })
        setIsLoading(false)
      })
  }, [toast])

  const filteredOrders = orders.filter(order => {
    if (filter !== 'all' && order.payment_status !== filter) return false
    if (searchQuery && !order.order_number.includes(searchQuery) && !order.customer_email.includes(searchQuery)) {
      return false
    }
    return true
  })

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, any> = {
      paid: { color: 'bg-green-100 text-green-800', label: 'Paid' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed' },
      refunded: { color: 'bg-gray-100 text-gray-800', label: 'Refunded' },
    }
    const statusInfo = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
  }

  const getFulfillmentBadge = (status: string) => {
    const statusMap: Record<string, any> = {
      unfulfilled: { color: 'bg-blue-100 text-blue-800', label: 'Unfulfilled' },
      partially_fulfilled: { color: 'bg-purple-100 text-purple-800', label: 'Partial' },
      fulfilled: { color: 'bg-green-100 text-green-800', label: 'Shipped' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    }
    const statusInfo = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Header />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage orders and dropship operations</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-gray-500 mt-1">All time orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-gray-500 mt-1">Total revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</div>
                <p className="text-xs text-gray-500 mt-1">Pending orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalCustomers}</div>
                <p className="text-xs text-gray-500 mt-1">Unique customers</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Manage and track all orders</CardDescription>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Search order or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Filter Tabs */}
              <div className="flex gap-2 mb-6 pb-4 border-b">
                {['all', 'paid', 'pending', 'failed'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                      filter === tab
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Payment</th>
                      <th className="text-left py-3 px-4 font-semibold">Fulfillment</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{order.order_number}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{order.customer_name}</div>
                              <div className="text-gray-500 text-xs">{order.customer_email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">{getStatusBadge(order.payment_status)}</td>
                          <td className="py-3 px-4">{getFulfillmentBadge(order.fulfillment_status)}</td>
                          <td className="py-3 px-4 text-gray-600 text-xs">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Dropship Integration Info */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Dropship Integration</CardTitle>
              <CardDescription>
                Orders are automatically submitted to Printful/Gooten for fulfillment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">Current Setup:</p>
                  <ul className="mt-2 space-y-2 text-gray-700">
                    <li>✓ Products synced from Printful</li>
                    <li>✓ Orders automatically submitted</li>
                    <li>✓ Tracking updates in real-time</li>
                    <li>✓ Fulfillment management active</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
