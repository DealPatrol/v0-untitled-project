import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Check, Star, Clock, Shield, Heart, QrCode, Phone } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-lg">
            🎯 Special Launch Pricing
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            One price, everything included. Create a beautiful digital memorial with a weatherproof QR code plaque for
            just $119.99. No hidden fees, no monthly charges, lifetime access guaranteed.
          </p>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Primary Pricing Card */}
            <Card className="border-4 border-orange-200 shadow-2xl relative overflow-hidden mb-16">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-center py-3">
                <span className="font-bold text-lg">🔥 LIMITED TIME OFFER - Save $80!</span>
              </div>

              <CardHeader className="text-center pt-16 pb-8">
                <div className="mb-4">
                  <div className="text-6xl font-bold text-orange-600 mb-2">$119.99</div>
                  <div className="text-2xl text-gray-500 line-through mb-2">$199.99</div>
                  <div className="text-lg text-gray-600">One-time payment • Lifetime access</div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">Complete Memorial Package</CardTitle>
                <p className="text-xl text-gray-600 mt-4">Everything you need to create a lasting digital tribute</p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Digital Memorial Features */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-orange-600" />
                      Digital Memorial
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Unlimited photo uploads</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Complete life story & biography</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Guest message board</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Timeline of important events</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Mobile-optimized design</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Privacy controls</span>
                      </li>
                    </ul>
                  </div>

                  {/* Physical QR Code Features */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-orange-600" />
                      QR Code Plaque
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Weatherproof metal plaque</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Professional laser engraving</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">UV-resistant coating</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Multiple mounting options</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Free shipping included</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">5-year durability guarantee</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Support & Guarantees */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    Support & Guarantees
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Lifetime Access</div>
                      <div className="text-sm text-gray-600">No monthly fees ever</div>
                    </div>
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">30-Day Guarantee</div>
                      <div className="text-sm text-gray-600">Full money back</div>
                    </div>
                    <div className="text-center">
                      <Phone className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">24/7 Support</div>
                      <div className="text-sm text-gray-600">Always here to help</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl font-bold mb-4"
                  >
                    <Link href="/create-profile">Create Memorial Now - $119.99</Link>
                  </Button>
                  <p className="text-sm text-gray-600">
                    ✓ Secure payment • ✓ Instant access • ✓ 30-day money back guarantee
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What's Included Timeline */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Happens After You Order</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Immediate Access</h3>
                    <p className="text-gray-600">
                      Start creating your memorial right away. Upload photos, write their story, and customize the
                      design.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">QR Code Generation</h3>
                    <p className="text-gray-600">
                      Once your memorial is complete, we generate a custom QR code and prepare your weatherproof plaque.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
                    <p className="text-gray-600">
                      Your professionally engraved QR code plaque ships within 3-5 business days with free shipping
                      included.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Are there any monthly fees?</h3>
                    <p className="text-gray-600">
                      No! This is a one-time payment of $119.99 with lifetime access. No hidden fees, no monthly
                      charges, ever.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How long does the QR code plaque last?</h3>
                    <p className="text-gray-600">
                      Our weatherproof metal plaques are designed to last for decades. They come with a 5-year
                      durability guarantee.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Can I update the memorial after it's created?</h3>
                    <p className="text-gray-600">
                      Yes! You can add photos, update information, and moderate guest messages anytime through your
                      account.
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/faq">View All FAQs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands of Families</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xl font-semibold text-gray-900 ml-2">4.9/5 Rating</span>
            </div>
            <p className="text-gray-600">Based on 1,200+ customer reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">10,000+</div>
              <div className="text-gray-600">Memorials Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.8%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">5 Years</div>
              <div className="text-gray-600">Durability Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Honor Their Memory?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of families who have chosen Memorial QR to create lasting tributes for their loved ones.
          </p>

          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold">
            <Link href="/create-profile">Get Started Today - $119.99</Link>
          </Button>

          <div className="text-lg opacity-90 mt-6">
            ✓ 30-Day Money Back Guarantee • ✓ Lifetime Access • ✓ Free Shipping
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Memorial QR</h3>
              <p className="text-gray-400 text-sm">Honoring memories with digital memorials that last forever.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/browse-memorials" className="hover:text-white">
                    Sample Memorials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
