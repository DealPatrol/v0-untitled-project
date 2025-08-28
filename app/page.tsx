import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { CountdownTimer } from "@/components/countdown-timer"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Header } from "@/components/header"
import { CheckCircle, Heart, Shield, Users, Clock, Star, ArrowRight, Play } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HomepageStickyCTA />

      {/* Hero Section with Cemetery Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cemetery-hero.png"
            alt="Peaceful cemetery background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-orange-500/90 text-white border-orange-400 hover:bg-orange-600/90">
            ✨ Revolutionary Memorial Technology
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Honor Their Memory with
            <span className="text-orange-400 block">QR Code Memorials</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Create beautiful, lasting digital memorials that connect the physical and digital worlds. Share stories,
            photos, and memories that will be treasured forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold">
              Create Memorial Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <StarRating rating={5} readonly size="sm" />
              <span>4.9/5 from 2,847 families</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-400" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-orange-400" />
              <span>Trusted by 10,000+ families</span>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-red-500 text-white">🔥 Limited Time Offer</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Special Launch Pricing - Save 60%</h2>
          <p className="text-xl text-gray-700 mb-8">
            Get your memorial QR code for just <span className="text-orange-600 font-bold text-2xl">$119.99</span>
            <span className="line-through text-gray-500 ml-2">$299.99</span>
          </p>

          <CountdownTimer />

          <div className="mt-8">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-xl font-bold">
              Claim Your Discount Now
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Creating a lasting digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 hover:border-orange-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Share Their Story</h3>
                <p className="text-gray-600">
                  Upload photos, write their biography, and share precious memories that celebrate their life.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-orange-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Get Your QR Code</h3>
                <p className="text-gray-600">
                  Receive a beautiful, weatherproof QR code plaque that links to their digital memorial.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-orange-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Connect & Remember</h3>
                <p className="text-gray-600">
                  Family and friends can scan the code to view memories, leave messages, and stay connected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Everything You Need to Honor Their Memory
            </h2>
            <p className="text-xl text-gray-600">Comprehensive features designed with love and respect</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Beautiful Memorial Pages</h3>
                <p className="text-gray-600">Elegant, respectful designs that honor their memory with dignity.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Family Collaboration</h3>
                <p className="text-gray-600">Multiple family members can contribute stories and photos.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Privacy Controls</h3>
                <p className="text-gray-600">Choose who can view and contribute to the memorial.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Lifetime Access</h3>
                <p className="text-gray-600">Your memorial will be preserved forever, no recurring fees.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Weatherproof QR Codes</h3>
                <p className="text-gray-600">Durable, outdoor-rated plaques that last for decades.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Premium Support</h3>
                <p className="text-gray-600">Compassionate, dedicated support when you need it most.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Trusted by Thousands of Families</h2>
            <p className="text-xl text-gray-600">See how we've helped families honor their loved ones</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <CardContent className="pt-6">
                <StarRating rating={5} readonly className="mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  "This gave us a beautiful way to share Dad's stories with future generations. The QR code at his
                  gravesite has brought our family closer together."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Daughter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="pt-6">
                <StarRating rating={5} readonly className="mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  "The memorial page is absolutely beautiful. It's comforting to know that Mom's memory will be
                  preserved forever in such a meaningful way."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-600">Son</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="pt-6">
                <StarRating rating={5} readonly className="mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  "The customer service was exceptional during such a difficult time. They helped us create something
                  truly special for Grandpa."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Emily Rodriguez</p>
                    <p className="text-sm text-gray-600">Granddaughter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Create a Lasting Tribute Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who have chosen to honor their loved ones with beautiful, lasting digital
            memorials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold"
            >
              Start Creating Memorial
            </Button>
            <p className="text-sm opacity-75">30-day money-back guarantee • Lifetime access • Premium support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Memorial QR</h3>
              <p className="text-gray-400 text-sm">Honoring memories with dignity and technology.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
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
