'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { QrCode, Check, Lock, ArrowRight, Loader2, GiftIcon } from 'lucide-react'

export default function ActivateMemorialPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const memorialId = searchParams.get('memorial_id')
  const [memorial, setMemorial] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!memorialId) {
      router.push('/create-memorial')
      return
    }

    // Fetch memorial data
    fetch(`/api/memorials?id=${memorialId}`)
      .then(res => res.json())
      .then(data => {
        setMemorial(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching memorial:', error)
        toast({
          title: 'Error',
          description: 'Failed to load memorial',
          variant: 'destructive',
        })
        setIsLoading(false)
      })
  }, [memorialId, router, toast])

  const handleActivatePayment = async () => {
    setIsProcessing(true)

    try {
      // Create payment intent for activation
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 99, // $99 activation fee
          currency: 'usd',
          memorialId: memorialId,
          type: 'activation',
          customerInfo: {
            name: memorial?.creator_name || 'Guest',
            email: memorial?.creator_email || 'unknown@example.com',
            phone: memorial?.creator_phone || '',
            address: {
              line1: '123 Main St',
              city: 'City',
              state: 'ST',
              postal_code: '12345',
              country: 'US',
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Failed to create payment')

      const { paymentIntentId } = await response.json()

      // Redirect to checkout
      router.push(`/checkout?payment_intent=${paymentIntentId}&memorial_id=${memorialId}&type=activation`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process payment',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100">
        <Header />
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </div>
    )
  }

  if (!memorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-red-600">Memorial not found</p>
          <Button asChild className="mt-4">
            <Link href="/create-memorial">Create New Memorial</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100">
      <Header />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Activate Your Memorial
              </h1>
              <p className="text-lg text-gray-600">
                Go live with a QR code and share your loved one's story
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Memorial Preview */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Your Memorial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="text-lg font-semibold">
                        {memorial.first_name} {memorial.last_name}
                      </p>
                    </div>

                    {memorial.date_of_birth && (
                      <div>
                        <p className="text-sm text-gray-600">Dates</p>
                        <p className="text-lg font-semibold">
                          {memorial.date_of_birth} – {memorial.date_of_death}
                        </p>
                      </div>
                    )}

                    {memorial.location && (
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-lg font-semibold">{memorial.location}</p>
                      </div>
                    )}

                    {memorial.biography && (
                      <div>
                        <p className="text-sm text-gray-600">Biography</p>
                        <p className="text-gray-700 line-clamp-3">
                          {memorial.biography}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Status:</strong> {memorial.status === 'draft' ? 'Draft (Not Published)' : 'Active'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Activation Card */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    Activation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-3xl font-bold text-purple-600 mb-1">$99</p>
                    <p className="text-sm text-gray-600">One-time activation fee</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Publish memorial online</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Generate QR code</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Guest messages</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleActivatePayment}
                    disabled={isProcessing || memorial.status === 'active'}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : memorial.status === 'active' ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Already Active
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Activate Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Add Products Section */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GiftIcon className="w-5 h-5" />
                  Add Memorial Products
                </CardTitle>
                <CardDescription>
                  Order memorial products like necklaces, plaques, and keepsakes to accompany your memorial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full md:w-auto">
                  <Link href={`/products?memorial_id=${memorialId}`}>
                    Browse Products
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">QR Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get a unique QR code linking to your memorial. Perfect for plaques and products.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Share Your Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Let family and friends view photos, videos, and share memories on your memorial.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lifetime Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your memorial stays online forever. No recurring fees, no expiration dates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
