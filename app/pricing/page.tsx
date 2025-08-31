import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Check, Star, Clock, Shield, Heart } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-100 to-purple-100">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-lg">
            🎯 Three Memorial Options
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Choose Your Memorial Plan</h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Select the perfect memorial solution for your needs. From basic QR plaques to premium granite monuments, we
            offer lasting tributes with guaranteed hosting.
          </p>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Memorial */}
              <Card className="border-2 border-slate-200 shadow-lg relative">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-4">Basic Memorial</CardTitle>
                  <div className="text-5xl font-bold text-slate-900 mb-2">$149</div>
                  <div className="text-slate-600">One-time payment</div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">5GB Storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Up to 10 Photos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Up to 3 Videos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">5 Year Hosting Guarantee</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Basic QR Plaque</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Guest Message Board</span>
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    <Link href="/create-profile?plan=basic">Select Basic Plan</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Memorial - Most Popular */}
              <Card className="border-4 border-purple-500 shadow-2xl relative transform scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-6 py-2 text-sm font-bold">MOST POPULAR</Badge>
                </div>

                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-4">Premium Memorial</CardTitle>
                  <div className="text-5xl font-bold text-purple-600 mb-2">$299</div>
                  <div className="text-slate-600">One-time payment</div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">20GB Storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Unlimited Photos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Up to 10 Videos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">25 Year Hosting Guarantee</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Premium Granite QR Stone</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Custom Design Options</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Priority Support</span>
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    <Link href="/create-profile?plan=premium">Select Premium Plan</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Family Memorial */}
              <Card className="border-2 border-slate-200 shadow-lg relative">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-4">Family Memorial</CardTitle>
                  <div className="text-5xl font-bold text-slate-900 mb-2">$499</div>
                  <div className="text-slate-600">One-time payment</div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">50GB Storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Unlimited Photos & Videos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Lifetime Hosting Guarantee</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Large Granite QR Monument</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Multiple Family Profiles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Custom Design & Installation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">White-Glove Service</span>
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    <Link href="/create-profile?plan=family">Select Family Plan</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hosting Guarantees */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Hosting Guarantees</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We guarantee your memorial will remain accessible for the full duration of your plan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">5 Years</h3>
              <p className="text-slate-600">Basic Plan hosting guarantee with renewal options</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">25 Years</h3>
              <p className="text-slate-600">Premium Plan extended hosting for a generation</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Lifetime</h3>
              <p className="text-slate-600">Family Plan permanent hosting guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">How long will the QR code remain active?</h3>
                  <p className="text-slate-600">
                    We guarantee the QR code will remain active for the duration of your hosting plan (5, 25, or
                    lifetime years). We also offer renewal options when your plan is nearing expiration.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    What's the difference between the memorial types?
                  </h3>
                  <p className="text-slate-600">
                    Basic includes a weather-resistant plaque, Premium features a granite stone with custom design, and
                    Family offers a large monument with installation service and multiple profiles.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Can I upgrade my plan later?</h3>
                  <p className="text-slate-600">
                    Yes! You can upgrade from Basic to Premium or Family at any time. We'll credit your original payment
                    toward the higher tier.
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
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Thousands of Families</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xl font-semibold text-slate-900 ml-2">4.9/5 Rating</span>
            </div>
            <p className="text-slate-600">Based on 1,200+ customer reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-slate-600">Memorials Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.8%</div>
              <div className="text-slate-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">25+ Years</div>
              <div className="text-slate-600">Hosting Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Honor Their Memory?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Choose the memorial plan that best fits your needs and create a lasting tribute for your loved one.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold"
            >
              <Link href="/create-profile">Get Started Today</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          <div className="text-lg opacity-90 mt-6">
            ✓ 30-Day Money Back Guarantee • ✓ Guaranteed Hosting • ✓ Free Shipping
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Memorial QR</h3>
              <p className="text-slate-400 text-sm">Honoring memories with digital memorials that last forever.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
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
              <ul className="space-y-2 text-sm text-slate-400">
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
              <ul className="space-y-2 text-sm text-slate-400">
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

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
