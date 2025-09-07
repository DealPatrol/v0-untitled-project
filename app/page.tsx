import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Heart, QrCode, Smartphone, Shield, Users, Clock, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  ✨ Limited Time: 20% Off All Plans
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Keep Their Memory <span className="memorial-logo text-purple-600">Alive Forever</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create beautiful digital memorials with QR codes for headstones, plaques, and memorial cards. Share
                  photos, stories, and memories that last for generations.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <StarRating rating={4.9} />
                  <span className="font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>10,000+ Families Served</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure & Private</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4"
                >
                  <Link href="/pricing">
                    Create Memorial Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
                  <Link href="/browse-memorials">View Sample Memorials</Link>
                </Button>
              </div>

              {/* Countdown Timer */}
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Limited Time Offer Ends In:</span>
                </div>
                <CountdownTimer />
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/XsWR_-Yv96Y?autoplay=1&mute=0&controls=1&rel=0"
                    title="Memorial QR Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">See How It Works</h3>
                  <p className="text-gray-600 text-sm">Watch how easy it is to create a digital memorial</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-purple-500 text-white p-3 rounded-full shadow-lg">
                <QrCode className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                <Heart className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for a Beautiful Memorial
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools to create, customize, and share meaningful digital memorials.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <QrCode className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Custom QR Codes</h3>
                <p className="text-gray-600 mb-4">
                  Generate beautiful, customizable QR codes in 8 colors and 3 styles for headstones, plaques, and
                  memorial cards.
                </p>
                <Link
                  href="/qr-generator"
                  className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
                >
                  Try QR Generator <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Digital Memorial Pages</h3>
                <p className="text-gray-600 mb-4">
                  Create stunning memorial websites with photos, stories, videos, and interactive features for family
                  and friends.
                </p>
                <Link
                  href="/browse-memorials"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  View Examples <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Forever Memories</h3>
                <p className="text-gray-600 mb-4">
                  Secure, permanent hosting ensures your loved one's memory is preserved and accessible for generations
                  to come.
                </p>
                <Link
                  href="/our-story"
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Our Promise <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands of Families</h2>
            <p className="text-xl text-gray-600">See what families are saying about Memorial QR</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 mb-4">
                  "Memorial QR helped us create a beautiful tribute to my father. The QR code on his headstone allows
                  visitors to see his life story and photos. It's brought our family so much comfort."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-gray-500">Daughter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 mb-4">
                  "The custom QR code feature is amazing. We chose a beautiful purple color that matches mom's favorite
                  flowers. Friends and family love being able to share memories and photos."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Johnson</p>
                    <p className="text-sm text-gray-500">Son</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 mb-4">
                  "Setting up the memorial was so easy, and the customer support was incredible. Now we have a permanent
                  way to honor grandpa's memory that will last forever."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">LR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lisa Rodriguez</p>
                    <p className="text-sm text-gray-500">Granddaughter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
            <p className="text-xl text-gray-600">Create a lasting memorial in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
              <p className="text-gray-600">
                Select from our Basic, Premium, or Family plans. All include custom QR codes and beautiful memorial
                pages.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create & Customize</h3>
              <p className="text-gray-600">
                Upload photos, write stories, and customize your QR code color and style to match your memorial
                perfectly.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Share & Remember</h3>
              <p className="text-gray-600">
                Download your QR code for headstones or plaques, and share the memorial page with family and friends.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/pricing">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Honor Their Memory with a <span className="memorial-logo">Beautiful Digital Memorial</span>
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who trust Memorial QR to preserve their loved ones' legacies forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/pricing">Start Creating Memorial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Link href="/qr-generator">Try QR Generator</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Lifetime Memorial Hosting</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-purple-400" />
                <span className="memorial-logo text-xl">Memorial QR</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Creating lasting digital memorials with beautiful QR codes for families worldwide.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <StarRating rating={4.9} size="sm" />
                <span className="text-gray-400">4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/qr-generator" className="hover:text-white">
                    QR Generator
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Memorial Plans
                  </Link>
                </li>
                <li>
                  <Link href="/browse-memorials" className="hover:text-white">
                    Browse Memorials
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/our-story" className="hover:text-white">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
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
              <h3 className="font-semibold mb-4">Legal</h3>
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
            <p>&copy; 2024 Memorial QR. All rights reserved. Made with ❤️ for families worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
