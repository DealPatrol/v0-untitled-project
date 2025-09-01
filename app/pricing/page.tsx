import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield } from "lucide-react"
import CountdownTimer from "@/components/countdown-timer"
import StarRating from "@/components/star-rating"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to create a beautiful memorial, all in one package.
          </p>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full inline-block mb-6 shadow-lg">
            <span className="font-semibold">🎉 Limited Time: Save $50 - Only $149 (Reg. $199)</span>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-2">Special pricing ends in:</p>
            <CountdownTimer />
          </div>
        </div>

        {/* Single Pricing Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-lg border-4 border-purple-200 shadow-2xl relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-b-lg font-semibold text-sm">
              MOST POPULAR
            </div>

            <CardHeader className="text-center pt-12 pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Memorial QR Package</CardTitle>
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-gray-900">$149</span>
                  <div className="text-left">
                    <div className="text-lg text-gray-500 line-through">$199</div>
                    <div className="text-sm text-green-600 font-semibold">Save $50</div>
                  </div>
                </div>
                <p className="text-gray-600">Complete digital memorial solution</p>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <StarRating rating={5} size="sm" />
                  <span>4.9/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {/* What's Included */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Custom QR Memorial Plaque</div>
                    <div className="text-sm text-gray-600">Beautiful 8x6" aluminum plaque with custom QR code</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Digital Memorial Website</div>
                    <div className="text-sm text-gray-600">Personalized website with unlimited photos & videos</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Guest Message Book</div>
                    <div className="text-sm text-gray-600">Unlimited messages from family and friends</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Family Collaboration</div>
                    <div className="text-sm text-gray-600">Multiple contributors can add memories</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Lifetime Hosting</div>
                    <div className="text-sm text-gray-600">Your memorial stays online forever</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Free Shipping & Setup</div>
                    <div className="text-sm text-gray-600">Professional setup in 3-5 business days</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">24/7 Customer Support</div>
                    <div className="text-sm text-gray-600">Always here to help when you need us</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/checkout">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  Create Memorial - $149
                </Button>
              </Link>

              <div className="text-center mt-4 text-sm text-gray-500">Secure payment • 30-day money-back guarantee</div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's included in the $149 package?</h3>
              <p className="text-gray-600 text-sm">
                Everything you need: custom QR plaque, digital memorial website, unlimited storage, guest messages,
                family collaboration, lifetime hosting, free shipping, and 24/7 support.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How long does setup take?</h3>
              <p className="text-gray-600 text-sm">
                Your digital memorial is available immediately after creation. The physical QR plaque ships within 3-5
                business days with free shipping included.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a money-back guarantee?</h3>
              <p className="text-gray-600 text-sm">
                Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your
                purchase in full.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can multiple family members contribute?</h3>
              <p className="text-gray-600 text-sm">
                Family members can add photos, videos, stories, and memories. There's no limit to the number of
                contributors.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create a Lasting Memorial?</h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of families who have created beautiful digital memorials.
            </p>
            <Link href="/checkout">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started - $149
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
