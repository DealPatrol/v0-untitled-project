import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Star, QrCode, Globe, Shield } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-red-100 text-red-800 border-red-200">🔥 Limited Time Offer - Save $80</Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Everything you need to create a beautiful, lasting memorial for your loved one. One price, no hidden fees,
            lifetime hosting included.
          </p>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-red-200 relative shadow-xl">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1">
                COMPLETE PACKAGE
              </Badge>

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">Memorial QR Complete</CardTitle>
                <div className="mt-4">
                  <div className="text-gray-500 line-through text-xl">$199.99</div>
                  <div className="text-5xl font-bold text-gray-900">$119.99</div>
                  <div className="text-red-600 font-semibold text-lg">Save $80 Today</div>
                  <div className="text-gray-600 mt-2">One-time payment • No monthly fees • Lifetime hosting</div>
                </div>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Physical Package */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <QrCode className="h-5 w-5 text-red-600 mr-2" />
                      Physical Package
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Weather-resistant QR plaque (3" x 4")</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Laser-engraved, fade-proof design</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Mounting hardware included</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Free shipping anywhere in the US</span>
                      </li>
                    </ul>
                  </div>

                  {/* Digital Package */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Globe className="h-5 w-5 text-red-600 mr-2" />
                      Digital Memorial
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Custom memorial website</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Unlimited photos & videos</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Life story & biography section</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Family tree integration</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Guest book for condolences</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Mobile-optimized design</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Additional Features */}
                <div className="border-t pt-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-red-600 mr-2" />
                    Lifetime Benefits
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">Lifetime hosting (no monthly fees)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">99.9% uptime guarantee</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">24/7 customer support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>

                <Link href="/create-profile">
                  <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-4">
                    Create Memorial Now - $119.99
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <div className="text-center mt-4 text-sm text-gray-500">
                  ✓ Secure checkout ✓ No hidden fees ✓ Setup assistance included
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare the Value</h2>
            <p className="text-xl text-gray-600">See how Memorial QR compares to traditional alternatives</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Traditional Memorial */}
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Traditional Memorial Service</CardTitle>
                  <div className="text-2xl font-bold text-gray-900">$3,000+</div>
                  <div className="text-sm text-gray-500">One-time event</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Limited to attendees present</li>
                    <li>• No lasting digital record</li>
                    <li>• Expensive venue costs</li>
                    <li>• Memories fade over time</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Online Memorial Sites */}
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">Online Memorial Sites</CardTitle>
                  <div className="text-2xl font-bold text-gray-900">$15-50/mo</div>
                  <div className="text-sm text-gray-500">$180-600/year</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Ongoing monthly fees</li>
                    <li>• Risk of service shutdown</li>
                    <li>• Limited customization</li>
                    <li>• No physical memorial</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Memorial QR */}
              <Card className="text-center border-2 border-red-200 relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs">
                  BEST VALUE
                </Badge>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Memorial QR</CardTitle>
                  <div className="text-2xl font-bold text-gray-900">$119.99</div>
                  <div className="text-sm text-green-600">One-time payment</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Physical + digital memorial</li>
                    <li>• Lifetime hosting included</li>
                    <li>• Weather-resistant QR plaque</li>
                    <li>• Unlimited photos & stories</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold">4.9/5 from 2,847 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "For $119.99, we got everything we needed and more. The QR plaque looks beautiful on dad's headstone,
                  and the digital memorial helps us share his stories with family across the country. Best money we've
                  ever spent during such a difficult time."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Jennifer Martinez</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "I was skeptical about the $119.99 price at first, thinking it was too good to be true. But after
                  seeing the quality of the plaque and the beautiful memorial website, I'm amazed at the value. This
                  will preserve mom's memory forever."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Robert Chen</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about Memorial QR</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">What exactly do I get for $119.99?</h3>
                <p className="text-gray-600">
                  You get a complete memorial package: a weather-resistant QR plaque (3" x 4"), a custom memorial
                  website with unlimited photos and stories, lifetime hosting with no monthly fees, and free shipping.
                  Everything you need to create a lasting tribute.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Are there any monthly fees or hidden costs?</h3>
                <p className="text-gray-600">
                  No! The $119.99 is a one-time payment that includes lifetime hosting. There are no monthly fees, no
                  annual renewals, and no hidden costs. Your memorial will stay online forever at no additional charge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">How durable is the QR plaque?</h3>
                <p className="text-gray-600">
                  Our QR plaques are laser-engraved on weather-resistant materials designed to withstand all weather
                  conditions. They're fade-proof, waterproof, and built to last for decades in outdoor environments like
                  cemeteries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Can I add more photos and stories later?</h3>
                <p className="text-gray-600">
                  Yes! You can add unlimited photos, stories, and memories to your memorial website at any time. Family
                  members can also contribute their own memories and photos to keep the memorial growing over time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">What if I'm not satisfied with my memorial?</h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee. If you're not completely satisfied with your memorial for any
                  reason, we'll refund your full $119.99 payment, no questions asked.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">How long does it take to receive my QR plaque?</h3>
                <p className="text-gray-600">
                  After you complete your memorial setup, your custom QR plaque is manufactured and shipped within 3-5
                  business days. Standard shipping takes 5-7 business days, so you'll typically receive it within 1-2
                  weeks of ordering.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create a Lasting Memorial?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who have chosen Memorial QR to honor their loved ones
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/create-profile">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Get Started Now - $119.99
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/memorial/sample">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg bg-transparent"
              >
                View Sample Memorial
              </Button>
            </Link>
          </div>

          <div className="text-sm opacity-75">
            ✓ 30-day money-back guarantee ✓ Free shipping ✓ Lifetime hosting ✓ No monthly fees
          </div>
        </div>
      </section>
    </div>
  )
}
