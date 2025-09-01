import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import Link from "next/link"
import { ArrowRight, Heart, QrCode, Share2, Clock, Shield, Users, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />

      {/* YouTube Video - Fixed Position Far Left */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <iframe
            width="200"
            height="356"
            src="https://www.youtube.com/embed/XsWR_-Yv96Y?autoplay=1&mute=1&loop=1&playlist=XsWR_-Yv96Y"
            title="Memorial QR Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-md"
          ></iframe>
          <p className="text-xs text-center mt-2 text-gray-600">See how it works!</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">Limited Time Offer - Save $50</Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Honor Their Memory with
            <span className="block font-cursive text-yellow-300">Memorial QR</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Create beautiful digital memorials that preserve precious memories forever. Share stories, photos, and
            tributes with a simple QR code.
          </p>

          <div className="mb-8">
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/pricing">
                Create Memorial - Only $149
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent"
            >
              <Link href="/browse-memorials">View Sample Memorials</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm opacity-80">
            <div className="flex items-center gap-1">
              <StarRating rating={5} size="sm" />
              <span>4.9/5 from 500+ families</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-white/30" />
            <span>✓ 30-day money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most beautiful and meaningful way to honor your loved ones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <QrCode className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Easy QR Code Access</CardTitle>
                <CardDescription>
                  Visitors can instantly access the memorial by scanning the QR code on the headstone or memorial plaque
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Preserve Memories</CardTitle>
                <CardDescription>
                  Upload photos, videos, and stories to create a lasting digital tribute that family and friends can
                  cherish forever
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Share2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Share & Connect</CardTitle>
                <CardDescription>
                  Allow visitors to leave tributes, share memories, and connect with other family members and friends
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Creating a memorial is simple and meaningful</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Memorial</h3>
              <p className="text-gray-600">
                Upload photos, write their story, and add personal details to create a beautiful digital memorial
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your QR Code</h3>
              <p className="text-gray-600">
                Receive a custom QR code that links directly to your loved one's memorial page
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Remember</h3>
              <p className="text-gray-600">
                Place the QR code on the headstone or share it with family and friends to keep memories alive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-0">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "Memorial QR helped us create a beautiful tribute to my mother. Now anyone who visits her grave can
                  learn about her incredible life story."
                </p>
                <div className="font-semibold">- Sarah Johnson</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "The process was so easy and the result is stunning. Our family can now share memories and photos in
                  one beautiful place."
                </p>
                <div className="font-semibold">- Michael Chen</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "This gave us a way to keep Dad's memory alive for future generations. The QR code on his headstone is
                  perfect."
                </p>
                <div className="font-semibold">- Lisa Rodriguez</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-purple-600 mb-2" />
              <h3 className="font-semibold mb-1">Secure & Private</h3>
              <p className="text-sm text-gray-600">Your memories are protected with enterprise-grade security</p>
            </div>

            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 text-purple-600 mb-2" />
              <h3 className="font-semibold mb-1">Forever Hosting</h3>
              <p className="text-sm text-gray-600">Your memorial will be preserved and accessible forever</p>
            </div>

            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-purple-600 mb-2" />
              <h3 className="font-semibold mb-1">500+ Families</h3>
              <p className="text-sm text-gray-600">Trusted by hundreds of families worldwide</p>
            </div>

            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-purple-600 mb-2" />
              <h3 className="font-semibold mb-1">Money-Back Guarantee</h3>
              <p className="text-sm text-gray-600">30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Honor Their Memory?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of families who have created lasting digital memorials for their loved ones.
          </p>

          <div className="mb-8">
            <CountdownTimer />
          </div>

          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
            <Link href="/pricing">
              Create Memorial Now - $149
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <p className="text-sm mt-4 opacity-80">
            ✓ 30-day money-back guarantee ✓ Forever hosting included ✓ Unlimited photos & videos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-cursive text-2xl text-purple-400 mb-4">Memorial QR</h3>
              <p className="text-gray-400">
                Creating beautiful digital memorials to honor and remember your loved ones.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
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
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
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

          <Separator className="my-8 bg-gray-700" />

          <div className="text-center text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <HomepageStickyCTA />
    </div>
  )
}
