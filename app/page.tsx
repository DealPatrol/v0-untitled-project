"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import {
  ArrowRight,
  QrCode,
  Heart,
  Shield,
  Smartphone,
  Users,
  CheckCircle,
  Clock,
  Award,
  Zap,
  Globe,
} from "lucide-react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* YouTube Video - Fixed Position */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="w-80 h-48 rounded-lg overflow-hidden shadow-2xl border-4 border-white">
          <iframe
            width="320"
            height="192"
            src="https://www.youtube.com/embed/XsWR_-Yv96Y?si=example&controls=1&rel=0&modestbranding=1"
            title="Memorial QR Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/subtle-memorial-pattern.png')] opacity-5"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 ml-0 lg:ml-40">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge className="mb-6 bg-orange-100 text-orange-800 border-orange-200 px-6 py-2 text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Honor Their Memory Forever
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Digital Memorial
                <span className="block text-orange-600">QR Plaques</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Create a lasting tribute with our beautiful memorial plaques featuring QR codes that connect to digital
                memories, photos, and stories.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                  <Link href="/pricing">
                    Create Memorial Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-orange-200 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg bg-transparent"
                >
                  <Link href="/how-it-works">See How It Works</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free QR Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Easy Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-300 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </section>

      {/* Limited Time Offer */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white text-orange-600 px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Launch Pricing - Save $30!</h2>
            <p className="text-xl mb-8 opacity-90">
              Get your memorial plaque for just <span className="font-bold text-2xl">$119.99</span> instead of $149.99
            </p>
            <CountdownTimer />
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4">
                <Link href="/pricing">
                  Claim Your Discount Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Order Your Plaque</h3>
              <p className="text-gray-600">Choose your memorial plaque and provide the details of your loved one</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Create Digital Memorial</h3>
              <p className="text-gray-600">
                Upload photos, stories, and memories to create a beautiful digital tribute
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Share & Remember</h3>
              <p className="text-gray-600">
                Visitors scan the QR code to access the digital memorial and leave their own memories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most meaningful way to honor and remember your loved ones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-orange-100 hover:border-orange-200 transition-colors">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Permanent & Secure</h3>
                <p className="text-gray-600">Your memorial is hosted securely and will remain accessible forever</p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:border-orange-200 transition-colors">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Memories</h3>
                <p className="text-gray-600">
                  Family and friends can leave comments, share stories, and upload their own photos
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:border-orange-200 transition-colors">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessible Anywhere</h3>
                <p className="text-gray-600">
                  Anyone with a smartphone can scan the QR code and access the memorial instantly
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:border-orange-200 transition-colors">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy to Use</h3>
                <p className="text-gray-600">Simple setup process with no technical knowledge required</p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:border-orange-200 transition-colors">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Quality</h3>
                <p className="text-gray-600">High-quality materials and professional engraving for lasting beauty</p>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:border-orange-200 transition-colors">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Meaningful Tribute</h3>
                <p className="text-gray-600">
                  Create a lasting legacy that celebrates their life and keeps memories alive
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real stories from families who chose Memorial QR</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-8">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  "The memorial plaque for my mother is absolutely beautiful. The QR code makes it so easy for family
                  members to share their favorite memories of her."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                    <div className="text-gray-500 text-sm">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-8">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  "I was amazed by how easy it was to set up. Now our whole family can visit dad's memorial page and see
                  all the wonderful stories people have shared."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Michael Johnson</div>
                    <div className="text-gray-500 text-sm">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-8">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  "The quality exceeded my expectations. It's a beautiful way to honor my husband's memory and keep his
                  stories alive for future generations."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">LR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Lisa Rodriguez</div>
                    <div className="text-gray-500 text-sm">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Memorial */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See a Sample Memorial</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience how a digital memorial looks and works</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-orange-100 to-orange-200">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2181-W2nQQTXll54HpT6hDYhnsFVDRgelfh.jpeg"
                  alt="Sample Memorial"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Glenda Jane Kelso</h3>
                  <p className="text-lg opacity-90">March 15, 1943 - December 28, 2023</p>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Interactive Digital Memorial</h4>
                    <p className="text-gray-600 mb-6">
                      This sample memorial shows how families can create a beautiful tribute with photos, stories, and
                      memories that visitors can access by scanning the QR code.
                    </p>
                    <Button asChild className="bg-orange-600 hover:bg-orange-700">
                      <Link href="/memorial/glenda-kelso">
                        View Sample Memorial
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                      <Image
                        src="/qr-code-sample.png"
                        alt="Sample QR Code"
                        width={150}
                        height={150}
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Scan to visit memorial</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Honor Their Memory Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Create a lasting tribute that celebrates their life and keeps their memory alive forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4">
                <Link href="/pricing">
                  Get Started - $119.99
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 bg-transparent"
              >
                <Link href="/contact">Have Questions?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "cursive" }}>
                Memorial QR
              </h3>
              <p className="text-gray-400 mb-4">
                Creating lasting digital memorials that honor and celebrate the lives of your loved ones.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/memorial/glenda-kelso" className="hover:text-white transition-colors">
                    Sample Memorial
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <HomepageStickyCTA />
    </div>
  )
}
