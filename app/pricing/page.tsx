import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Check, ArrowRight, QrCode, Globe, MessageCircle, Users, Clock, Shield, Camera, Heart } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Complete Memorial Package</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a beautiful, lasting digital memorial that honors their memory forever.
            </p>
          </div>

          {/* Single Pricing Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="relative border-2 border-purple-200 shadow-2xl">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  ⚡ LIMITED TIME OFFER
                </span>
              </div>

              <CardHeader className="text-center pt-8">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Memorial QR Package</CardTitle>
                <p className="text-gray-600 mb-6">Complete digital memorial solution</p>

                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold text-purple-600">$149</span>
                    <div className="text-left">
                      <div className="text-gray-500 line-through text-lg">$199</div>
                      <div className="text-green-600 font-semibold text-sm">Save $50</div>
                    </div>
                  </div>
                  <p className="text-gray-600">One-time payment • No recurring fees</p>
                </div>

                <Button asChild size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6 mb-6">
                  <Link href="/checkout">
                    Create Memorial Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* What's Included */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-center">What's Included:</h3>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <QrCode className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Custom QR Memorial Plaque</p>
                        <p className="text-sm text-gray-600">
                          Weather-resistant 8x6" aluminum plaque with custom engraving
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Digital Memorial Website</p>
                        <p className="text-sm text-gray-600">
                          Beautiful, personalized memorial page with unlimited content
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Camera className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Unlimited Photos & Videos</p>
                        <p className="text-sm text-gray-600">
                          Share memories, stories, and moments that celebrate their life
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MessageCircle className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Guest Message Book</p>
                        <p className="text-sm text-gray-600">
                          Visitors can leave heartfelt messages and share their own memories
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Family Collaboration</p>
                        <p className="text-sm text-gray-600">
                          Multiple family members can contribute and manage content
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Lifetime Hosting</p>
                        <p className="text-sm text-gray-600">
                          Your memorial will be preserved forever with no recurring costs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Free Setup & Support</p>
                        <p className="text-sm text-gray-600">We'll help you create and customize your memorial</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Heart className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Free Shipping</p>
                        <p className="text-sm text-gray-600">
                          We'll ship your memorial plaque anywhere in the US for free
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Our Guarantees:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="h-4 w-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="h-4 w-4" />
                      <span>Lifetime hosting with no recurring fees</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="h-4 w-4" />
                      <span>Free customer support whenever you need help</span>
                    </div>
                  </div>
                </div>

                {/* Final CTA */}
                <div className="text-center pt-4">
                  <Button asChild size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6">
                    <Link href="/checkout">
                      Get Started Today - $149
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">Secure checkout • Free shipping • 30-day guarantee</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">What size is the memorial plaque?</h3>
                <p className="text-gray-600">
                  Our memorial plaques are 8x6 inches, made from weather-resistant aluminum with a professional finish
                  that will last for years.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">How long does shipping take?</h3>
                <p className="text-gray-600">
                  We typically ship within 3-5 business days, and standard shipping takes 5-7 business days. Expedited
                  shipping options are available.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Is there really no recurring cost?</h3>
                <p className="text-gray-600">
                  Your $149 payment includes lifetime hosting. Your memorial will be preserved forever with no monthly
                  or annual fees.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Can multiple family members contribute?</h3>
                <p className="text-gray-600">
                  Yes! We provide collaboration tools so multiple family members can add photos, videos, stories, and
                  manage the memorial together.
                </p>
              </div>
            </div>
          </div>

          {/* Sample Memorial Link */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Want to see what a memorial looks like?</p>
            <Button asChild variant="outline" size="lg">
              <Link href="/memorial/glenda-kelso">View Sample Memorial</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
