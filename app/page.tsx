import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { QrCode, Shield, Clock, Users, CheckCircle, ArrowRight, Play, MessageCircle, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ⚡ Limited Time Offer - Save $50
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Honor Their Memory with a<span className="text-purple-600"> Digital Memorial</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create a beautiful, lasting tribute that family and friends can access anytime, anywhere. Share memories,
            photos, and stories that celebrate a life well-lived.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
              <Link href="/checkout">
                Create Memorial - $149
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/memorial/glenda-kelso">
                <Play className="mr-2 h-5 w-5" />
                View Sample Memorial
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Free Shipping Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span>Lifetime Hosting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Limited Time Special Pricing</h2>
          <CountdownTimer />
          <p className="text-purple-100 mt-4">Don't miss out on this special introductory price!</p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need for $149</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our complete memorial package includes everything to create and share a beautiful digital tribute.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <QrCode className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Custom QR Memorial Plaque</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Weather-resistant 8x6" aluminum plaque with custom QR code linking to your memorial page.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Digital Memorial Page</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Beautiful, personalized memorial website with unlimited photos, videos, and stories.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Guest Message Book</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Allow visitors to leave heartfelt messages and share their own memories and photos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Family Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Multiple family members can contribute photos, stories, and updates to the memorial.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Lifetime Hosting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your memorial will be hosted forever with no recurring fees or subscription costs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Free setup assistance and ongoing customer support whenever you need help.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="inline-block bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-2xl font-bold text-green-800 mb-2">Special Launch Price: $149</p>
              <p className="text-green-700">
                <span className="line-through text-gray-500">Regular Price: $199</span> - You Save $50!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Creating your memorial is simple and takes just minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Order Your Memorial</h3>
              <p className="text-gray-600">Complete your order and we'll send you a custom QR memorial plaque.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Memorial</h3>
              <p className="text-gray-600">Upload photos, videos, and stories to create a beautiful digital tribute.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Remember</h3>
              <p className="text-gray-600">Place the plaque and let family and friends scan to visit the memorial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
            <StarRating rating={5} size="lg" className="justify-center mb-4" />
            <p className="text-xl text-gray-600">Trusted by thousands of families worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-0">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "This gave us such a beautiful way to honor my mother's memory. Family members from around the world
                  can now share their memories and photos."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Martinez</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "The QR code plaque is perfect for the cemetery. Visitors can instantly access Dad's memorial and
                  leave their own messages."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Johnson</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "So easy to set up and the customer service was amazing. They helped us create something truly special
                  for our grandmother."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">LC</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lisa Chen</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Create a Lasting Memorial Today</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Honor their memory with a beautiful digital tribute that will be treasured by family and friends forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Link href="/checkout">
                Get Started - $149
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6 bg-transparent"
            >
              <Link href="/memorial/glenda-kelso">View Sample Memorial</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-purple-100">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free Shipping & Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Lifetime Hosting Included</span>
            </div>
          </div>
        </div>
      </section>

      <HomepageStickyCTA />
    </div>
  )
}
