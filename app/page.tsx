"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PreservationInfo } from "@/components/preservation-info"
import { TestimonialSection } from "@/components/testimonial-section"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import {
  Heart,
  QrCode,
  Shield,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined") {
      // Analytics tracking would go here
      console.log("Homepage viewed")
    }
  }, [])

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
            ✨ Limited Time: Save $30 on Premium Package
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Honor Their Memory
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Forever
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create a beautiful digital memorial with QR code access. Share memories, photos, and stories that celebrate
            a life well-lived. Preserve their legacy for generations to come.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/create-memorial">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Memorial Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/browse-memorials">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 hover:bg-gray-50 bg-transparent"
              >
                View Sample Memorials
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <StarRating rating={5} size="sm" />
              <span className="font-medium">4.9/5 from 2,847 families</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Lifetime hosting guaranteed</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Setup in under 10 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See How It Works</h2>
            <p className="text-gray-600 text-lg">Watch how easy it is to create a beautiful memorial in minutes</p>
          </div>

          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video relative">
              <Image
                src="/placeholder.svg?height=400&width=700&text=Memorial+Demo+Video"
                alt="Memorial QR Demo Video"
                fill
                className="object-cover"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={toggleVideo}
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full p-4"
                  >
                    {isVideoPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>
                  <Button
                    onClick={toggleMute}
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full p-4"
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Memorials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beautiful Memorial Examples</h2>
            <p className="text-gray-600 text-lg">See how families are honoring their loved ones</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Rodriguez",
                years: "1952 - 2023",
                image: "/placeholder.svg?height=300&width=300&text=Maria+Rodriguez",
                description: "Beloved mother and grandmother who touched countless lives",
                memories: 47,
                visitors: 1203,
              },
              {
                name: "James Wilson",
                years: "1945 - 2023",
                image: "/placeholder.svg?height=300&width=300&text=James+Wilson",
                description: "Veteran and community leader who served with honor",
                memories: 62,
                visitors: 856,
              },
              {
                name: "Sarah Chen",
                years: "1978 - 2023",
                image: "/placeholder.svg?height=300&width=300&text=Sarah+Chen",
                description: "Loving teacher who inspired generations of students",
                memories: 89,
                visitors: 2341,
              },
            ].map((memorial, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={memorial.image || "/placeholder.svg"}
                    alt={memorial.name}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{memorial.name}</h3>
                    <p className="text-sm opacity-90">{memorial.years}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{memorial.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{memorial.memories} memories</span>
                    <span>{memorial.visitors.toLocaleString()} visitors</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/browse-memorials">
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                View All Memorials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
            <p className="text-gray-600 text-lg">Create a lasting memorial in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Share Their Story",
                description: "Upload photos, write memories, and add personal details that celebrate their life",
                icon: Heart,
                color: "text-red-500",
              },
              {
                step: "2",
                title: "Get Your QR Code",
                description: "Receive a custom QR code that links to their beautiful memorial page",
                icon: QrCode,
                color: "text-blue-500",
              },
              {
                step: "3",
                title: "Share & Remember",
                description: "Place the QR code anywhere - headstones, programs, or share digitally",
                icon: Users,
                color: "text-green-500",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg">One price, everything included, no hidden fees</p>
          </div>

          <Card className="max-w-md mx-auto shadow-xl border-2 border-purple-200">
            <CardHeader className="text-center pb-2">
              <Badge className="w-fit mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Most Popular
              </Badge>
              <CardTitle className="text-2xl">Premium Memorial Package</CardTitle>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-4xl font-bold text-gray-900">$119.99</span>
                <div className="text-left">
                  <div className="text-sm text-gray-500 line-through">$149.99</div>
                  <div className="text-sm text-green-600 font-medium">Save $30</div>
                </div>
              </div>
              <p className="text-gray-600 mt-2">One-time payment, lifetime access</p>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited photo uploads",
                  "Custom memorial page design",
                  "QR code generation",
                  "Guest book & condolences",
                  "Video memory uploads",
                  "Lifetime hosting",
                  "Physical QR code plaque",
                  "24/7 customer support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <CountdownTimer />

              <Link href="/create-memorial" className="block mt-6">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold">
                  Create Memorial Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <p className="text-center text-sm text-gray-500 mt-4">30-day money-back guarantee</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Preservation Info */}
      <PreservationInfo />

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Start Honoring Their Memory Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who have created lasting memorials for their loved ones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-memorial">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/browse-memorials">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
              >
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
