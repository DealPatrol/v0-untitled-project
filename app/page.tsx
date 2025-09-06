"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Heart, QrCode, Smartphone, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Video */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/XsWR_-Yv96Y?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1"
                    title="Memorial QR Introduction"
                    className="w-full h-64 sm:h-80"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Limited Time Offer</Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">Digital Memorial</span>
                <span className="block text-blue-600">Plaques</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Honor your loved ones with beautiful, personalized memorial plaques featuring QR codes that link to
                digital tributes, photos, and memories.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  <Link href="/pricing">
                    Create Memorial - $149
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                  <Link href="/memorial/glenda-kelso">View Sample Memorial</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Lifetime Digital Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Weather Resistant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limited Time Special Pricing</h2>
          <CountdownTimer />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create a lasting digital memorial in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">1. Order Your Plaque</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Choose your memorial plaque design and provide the details of your loved one
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">2. Create Digital Memorial</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Upload photos, write memories, and create a beautiful digital tribute page
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">3. Share & Remember</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Visitors scan the QR code to access the digital memorial and leave their own tributes
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
            <StarRating rating={5} size="lg" className="justify-center mb-4" />
            <p className="text-lg text-gray-600">Over 1,000 families have created lasting memorials</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} size="sm" />
                </div>
                <p className="text-gray-600 mb-4">
                  "The memorial plaque is beautiful and the digital tribute allows our whole family to share memories.
                  It's brought us so much comfort."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-sm">Sarah Johnson</p>
                    <p className="text-gray-500 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} size="sm" />
                </div>
                <p className="text-gray-600 mb-4">
                  "Amazing quality and the QR code works perfectly. Friends and family can easily access Dad's memorial
                  page."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-sm">Michael Chen</p>
                    <p className="text-gray-500 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} size="sm" />
                </div>
                <p className="text-gray-600 mb-4">
                  "The customer service was exceptional and the final product exceeded our expectations. Highly
                  recommend."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-sm">Emily Rodriguez</p>
                    <p className="text-gray-500 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Create a Lasting Memorial Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Honor your loved one with a beautiful memorial that will be treasured forever
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            <Link href="/pricing">
              Get Started - $149
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <HomepageStickyCTA />
    </div>
  )
}
