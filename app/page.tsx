"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { CountdownTimer } from "@/components/countdown-timer"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import {
  Heart,
  QrCode,
  Users,
  Camera,
  Music,
  Share2,
  CheckCircle,
  Star,
  ArrowRight,
  Smartphone,
  Globe,
  Shield,
} from "lucide-react"

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    {
      icon: Heart,
      title: "Beautiful Memorials",
      description: "Create stunning digital tributes with photos, stories, and memories",
    },
    {
      icon: QrCode,
      title: "QR Code Access",
      description: "Generate custom QR codes for easy sharing and access",
    },
    {
      icon: Users,
      title: "Family Collaboration",
      description: "Allow family members to contribute photos and memories",
    },
    {
      icon: Camera,
      title: "Unlimited Photos",
      description: "Upload and organize unlimited photos and videos",
    },
    {
      icon: Music,
      title: "Memorial Music",
      description: "Add meaningful songs and audio memories",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share memorial links with family and friends worldwide",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Daughter",
      content:
        "Creating mom's memorial was so meaningful. The QR code made it easy for everyone at the funeral to access and share memories.",
      rating: 5,
      image: "/hispanic-woman-smiling-professional-portrait.png",
    },
    {
      name: "Michael Chen",
      role: "Son",
      content:
        "The family collaboration feature allowed all of us to contribute. It's become our go-to place to remember dad.",
      rating: 5,
      image: "/asian-man-engineer-smiling-professional-portrait.png",
    },
    {
      name: "Lisa Rodriguez",
      role: "Wife",
      content: "The support team was incredible. They helped us create something beautiful that will last forever.",
      rating: 5,
      image: "/professional-woman-doctor-white-coat-smiling.png",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Memorials Created" },
    { number: "50,000+", label: "Families Served" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "4.9/5", label: "Customer Rating" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Video */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <Badge className="bg-purple-100 text-purple-800 mb-6 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 10,000+ Families
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Honor Their Memory with a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Digital Memorial
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-purple-100 mb-8 leading-relaxed">
                Create beautiful, lasting tributes with QR codes that make sharing memories simple and meaningful.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  <span>Unlimited Photos</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  <span>QR Code Included</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  <Link href="/pricing">
                    Create Memorial - $149
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg bg-transparent"
                >
                  <Link href="/browse-memorials">View Examples</Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <StarRating rating={4.9} />
                <span className="text-purple-200">4.9/5 from 500+ reviews</span>
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/XsWR_-Yv96Y?autoplay=0&mute=0&controls=1&rel=0"
                    title="Memorial QR Demo"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-purple-100 text-sm">See how easy it is to create a memorial</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 rounded-full p-3 animate-bounce">
                <QrCode className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 rounded-full p-3 animate-pulse">
                <Heart className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="relative border-t border-white/20 bg-black/20">
          <div className="container mx-auto px-4 py-6">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Honor Their Memory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform makes it easy to create, share, and preserve precious memories for generations
              to come.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Create a Memorial in 3 Simple Steps</h2>
            <p className="text-xl text-gray-600">Our intuitive process makes it easy to honor your loved one</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Package</h3>
              <p className="text-gray-600">
                Select our comprehensive memorial package for just $149 - everything included, no hidden fees.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Add Photos & Stories</h3>
              <p className="text-gray-600">
                Upload unlimited photos, write their story, and invite family members to contribute memories.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Share & Preserve</h3>
              <p className="text-gray-600">
                Get your custom QR code and share the memorial with family and friends worldwide.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/how-it-works">Learn More About Our Process</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of Families</h2>
            <p className="text-xl text-gray-600">See what families are saying about their memorial experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} className="mb-4" />
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-purple-100">
              One price, everything included - no hidden fees or monthly charges
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-yellow-400 shadow-2xl">
              <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-t-lg">
                <Badge className="bg-red-500 text-white mb-4">
                  <Star className="h-4 w-4 mr-2" />
                  Most Popular
                </Badge>
                <CardTitle className="text-3xl font-bold">Complete Memorial Package</CardTitle>
                <div className="text-5xl font-bold mt-4">$149</div>
                <p className="text-lg">One-time payment • Lifetime access</p>
              </CardHeader>
              <CardContent className="p-8 bg-white text-gray-900">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>Beautiful memorial website</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>Unlimited photos & videos</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>Custom QR code generation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>Family collaboration tools</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>Memorial music & audio</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>Guest book & messages</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>Lifetime hosting included</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-4"
                >
                  <Link href="/pricing">
                    Create Memorial Now - $149
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <p className="text-center text-gray-600 mt-4">
                  30-day money-back guarantee • Secure payment processing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Trusted & Secure</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">SSL Encrypted</h3>
              <p className="text-gray-600 text-sm">Your data is protected with bank-level security</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-gray-600 text-sm">Reliable hosting ensures your memorial is always accessible</p>
            </div>
            <div className="text-center">
              <Smartphone className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Mobile Optimized</h3>
              <p className="text-gray-600 text-sm">Perfect viewing experience on all devices</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Our team is here to help whenever you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Honor Your Loved One?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have created lasting digital memorials. Start preserving precious memories
            today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link href="/pricing">
                Create Memorial - $149
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/browse-memorials">View Sample Memorials</Link>
            </Button>
          </div>

          <p className="text-purple-200">
            Questions?{" "}
            <Link href="/contact" className="underline hover:text-white">
              Contact our support team
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
