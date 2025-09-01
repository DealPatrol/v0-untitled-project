import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart, Users, Clock, Shield, Star } from "lucide-react"
import CountdownTimer from "@/components/countdown-timer"
import StarRating from "@/components/star-rating"
import HomepageStickyCTA from "@/components/homepage-sticky-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Honor Their Memory with a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {" "}
                Digital Memorial
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create a beautiful, lasting tribute that family and friends can access anytime, anywhere. Share memories,
              photos, and stories that celebrate a life well-lived.
            </p>

            {/* Special Offer Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full inline-block mb-6 shadow-lg">
              <span className="font-semibold">🎉 Limited Time: Save $50 - Only $149 (Reg. $199)</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/checkout">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Create Memorial - $149
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Special pricing ends in:</p>
              <CountdownTimer />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <StarRating rating={5} />
                <span className="font-medium">4.9/5 from 500+ families</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Free Setup & Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything Included for $149</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our complete memorial package includes everything you need to create a lasting digital tribute.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom QR Memorial Plaque</h3>
                <p className="text-gray-600">
                  Beautiful 8x6" aluminum plaque with custom QR code linking to the digital memorial.
                </p>
                <div className="mt-4 text-sm text-green-600 font-medium">✓ Free shipping included</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital Memorial Website</h3>
                <p className="text-gray-600">
                  Personalized memorial website with unlimited photos, videos, and stories.
                </p>
                <div className="mt-4 text-sm text-green-600 font-medium">✓ Lifetime hosting included</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Guest Message Book</h3>
                <p className="text-gray-600">
                  Allow visitors to leave messages, share memories, and express condolences.
                </p>
                <div className="mt-4 text-sm text-green-600 font-medium">✓ Unlimited messages</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Family Collaboration</h3>
                <p className="text-gray-600">Multiple family members can contribute photos, stories, and memories.</p>
                <div className="mt-4 text-sm text-green-600 font-medium">✓ Unlimited contributors</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Setup</h3>
                <p className="text-gray-600">
                  Our team handles all the technical setup - you just provide the content.
                </p>
                <div className="mt-4 text-sm text-green-600 font-medium">✓ Ready in 3-5 business days</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Dedicated customer support and 30-day money-back guarantee.</p>
                <div className="mt-4 text-sm text-green-600 font-medium">✓ Always here to help</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
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
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
            <p className="text-xl text-gray-600">
              Creating a memorial is easy and takes just a few minutes to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Order & Pay</h3>
              <p className="text-gray-600">
                Secure your memorial package for just $149. Payment is processed securely through Stripe.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Share Memories</h3>
              <p className="text-gray-600">
                Upload photos, videos, and stories. Our guided form makes it easy to create a beautiful tribute.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Receive Memorial</h3>
              <p className="text-gray-600">
                Get your custom QR plaque shipped free within 3-5 business days, plus instant access to the digital
                memorial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Families Everywhere</h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <StarRating rating={5} />
              <span className="text-lg font-medium text-gray-700">4.9/5 from 500+ families</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 mb-4">
                  "The memorial we created for my father is absolutely beautiful. The QR code makes it so easy for
                  family members to access and share memories."
                </p>
                <div className="font-semibold text-gray-900">- Sarah M.</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 mb-4">
                  "Such a meaningful way to honor my grandmother. The whole family can contribute photos and stories.
                  It's become our digital family album."
                </p>
                <div className="font-semibold text-gray-900">- Michael R.</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 mb-4">
                  "The customer service was exceptional, and the final product exceeded our expectations. Highly
                  recommend to any family looking to create a lasting tribute."
                </p>
                <div className="font-semibold text-gray-900">- Jennifer L.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Create a Lasting Memorial Today</h2>
          <p className="text-xl text-purple-100 mb-8">
            Honor their memory with a beautiful digital tribute that will last forever.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="text-white text-lg mb-2">Limited Time Offer</div>
            <div className="text-3xl font-bold text-white mb-2">
              $149 <span className="text-lg line-through text-purple-200">$199</span>
            </div>
            <div className="text-purple-100">Save $50 - Offer ends soon!</div>
          </div>

          <Link href="/checkout">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Create Memorial - $149
            </Button>
          </Link>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-purple-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
