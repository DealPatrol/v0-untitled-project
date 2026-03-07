'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { ShoppingCart, Heart, Star, Filter, Loader2 } from 'lucide-react'

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Memorial Necklace - Cremation Urn',
    category: 'jewelry',
    price: 34.99,
    compareAtPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Stainless steel cremation urn necklace with adjustable chain',
    features: ['Waterproof', 'Includes chain', 'Memorial keepsake'],
    supplier: 'Printful',
  },
  {
    id: '2',
    name: 'Memorial Plaque with QR Code',
    category: 'memorial_plaque',
    price: 79.99,
    compareAtPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    description: '8x10 custom engraved plaque with integrated QR code',
    features: ['Custom engraving', 'QR code integration', 'Premium materials'],
    supplier: 'Gooten',
  },
  {
    id: '3',
    name: 'Memorial Bracelet',
    category: 'jewelry',
    price: 24.99,
    compareAtPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Personalized memorial bracelet with name engraving',
    features: ['Adjustable fit', 'Personalized engraving', 'Stainless steel'],
    supplier: 'Printful',
  },
  {
    id: '4',
    name: 'Photo Frame Keepsake',
    category: 'keepsake',
    price: 44.99,
    compareAtPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop',
    description: '5x7 wooden photo frame with memorial inscription',
    features: ['Wooden construction', 'Photo included', 'Custom engraving'],
    supplier: 'Gooten',
  },
  {
    id: '5',
    name: 'Memorial Garden Stone',
    category: 'keepsake',
    price: 54.99,
    compareAtPrice: 84.99,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    description: 'Weather-resistant stone with QR code and engraving',
    features: ['Weather-resistant', 'QR code compatible', 'Long-lasting'],
    supplier: 'Printful',
  },
  {
    id: '6',
    name: 'Memorial Candle Holder',
    category: 'accessory',
    price: 29.99,
    compareAtPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop',
    description: 'Elegant memorial candle holder with personalization',
    features: ['Elegant design', 'Personalized', 'Metal construction'],
    supplier: 'Gooten',
  },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const memorialId = searchParams.get('memorial_id')
  const { toast } = useToast()

  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<any[]>([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const categories = ['all', 'jewelry', 'memorial_plaque', 'keepsake', 'accessory']

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: any) => {
    setCart([...cart, product])
    toast({
      title: 'Added to cart',
      description: `${product.name} added to cart`,
    })
  }

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add items to your cart before checkout',
        variant: 'destructive',
      })
      return
    }

    setIsCheckingOut(true)

    try {
      // Calculate total
      const total = cart.reduce((sum, item) => sum + item.price, 0)

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'usd',
          items: cart,
          memorialId: memorialId,
          type: 'products',
          customerInfo: {
            name: 'Guest',
            email: 'guest@example.com',
            phone: '',
            address: {
              line1: '',
              city: '',
              state: '',
              postal_code: '',
              country: 'US',
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Failed to create payment')

      const { paymentIntentId } = await response.json()

      // Redirect to checkout
      window.location.href = `/checkout?payment_intent=${paymentIntentId}&memorial_id=${memorialId}&type=products&items=${cart.map(p => p.id).join(',')}`
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to proceed to checkout',
        variant: 'destructive',
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  const categoryLabels: Record<string, string> = {
    'all': 'All Products',
    'jewelry': 'Jewelry',
    'memorial_plaque': 'Plaques',
    'keepsake': 'Keepsakes',
    'accessory': 'Accessories',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Header />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Memorial Products
            </h1>
            <p className="text-lg text-gray-600">
              Dropshipped memorial products paired with your digital memorial
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium block mb-2">Search</label>
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="text-sm font-medium block mb-3">Category</label>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                          }`}
                        >
                          {categoryLabels[category]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cart Summary */}
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium mb-2">Cart ({cart.length})</div>
                    {cart.length > 0 && (
                      <div>
                        <div className="text-lg font-bold text-purple-600 mb-3">
                          ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                        </div>
                        <Button
                          onClick={handleCheckout}
                          disabled={isCheckingOut}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          {isCheckingOut ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Checking out...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Checkout
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-square bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.compareAtPrice > product.price && (
                        <Badge className="absolute top-4 right-4 bg-red-600">
                          Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-purple-600">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice > product.price && (
                          <span className="text-sm line-through text-gray-500">
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <ul className="text-xs space-y-1">
                          {product.features.slice(0, 2).map((feature, i) => (
                            <li key={i} className="text-gray-600">
                              ✓ {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Supplier Badge */}
                      <Badge variant="outline" className="mb-4">
                        {product.supplier}
                      </Badge>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
