"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { CountdownTimer } from "@/components/countdown-timer"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Heart, QrCode, Users, Clock, Shield, Smartphone, CheckCircle, ArrowRight, Play } from "lucide-react"

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Hero Section with Cemetery Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/peaceful-cemetery.png"
            alt="Peaceful cemetery background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30">
              ⭐ Trusted by 10,000+ Families
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Honor Their Memory with a<span className="text-orange-400 block">Digital Memorial</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Create a beautiful, lasting tribute that family and friends can access anytime, anywhere with a simple QR
              code scan.
            </p>

            {/* Countdown Timer */}
            <div className="mb-8">
              <CountdownTimer />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/create-profile">
                  Create Memorial Now - $119.99
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <span>Setup in 10 Minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Preview Card */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <Card className="w-48 backdrop-blur-sm bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <div className="w-24 h-24 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-black" />
              </div>
              <p className="text-white text-sm font-medium">Scan to visit memorial</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Families Worldwide</h2>
            <div className="flex justify-center items-center gap-2 mb-6">
              <StarRating rating={5} />
              <span className="text-lg font-semibold">4.9/5 from 2,847 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={5} size="sm" />
                </div>
                <p className="text-gray-600 mb-4">
                  "Creating my father's memorial was so easy and meaningful. The QR code on his headstone lets everyone
                  share their memories."
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-gray-500">Verified Customer</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={5} size="sm" />
                </div>
                <p className="text-gray-600 mb-4">
                  "The family tree feature helped us connect with relatives we hadn't spoken to in years. Truly brought
                  our family together."
                </p>
                <div className="font-semibold">Michael R.</div>
                <div className="text-sm text-gray-500">Verified Customer</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={5} size="sm" />
                </div>
                <p className="text-gray-600 mb-4">
                  "Beautiful design and so easy to use. My grandmother's memorial page is exactly what she would have
                  wanted."
                </p>
                <div className="font-semibold">Jennifer L.</div>
                <div className="text-sm text-gray-500">Verified Customer</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Honor Their Memory</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools to create a beautiful, lasting digital memorial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Unique QR Code</h3>
                <p className="text-gray-600">
                  Each memorial gets a unique QR code for easy sharing and access from anywhere in the world.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Unlimited Media</h3>
                <p className="text-gray-600">
                  Upload unlimited photos, videos, and documents to create a comprehensive life story.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Family Tree</h3>
                <p className="text-gray-600">
                  Build an interactive family tree that connects generations and preserves family history.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Life Timeline</h3>
                <p className="text-gray-600">
                  Create a beautiful timeline of important life events, milestones, and achievements.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Privacy Controls</h3>
                <p className="text-gray-600">
                  Full control over who can view and contribute to the memorial with advanced privacy settings.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mobile Optimized</h3>
                <p className="text-gray-600">Perfect experience on all devices - desktop, tablet, and mobile phones.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to create a lasting memorial</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Profile</h3>
              <p className="text-gray-600">
                Fill out the simple form with your loved one's information, photos, and memories.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Get QR Code</h3>
              <p className="text-gray-600">
                Receive your unique QR code that can be placed on headstones, programs, or shared digitally.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Share & Remember</h3>
              <p className="text-gray-600">
                Family and friends can scan the code to visit the memorial and share their own memories.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/how-it-works">
                Learn More About Our Process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sample Memorial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See a Sample Memorial</h2>
            <p className="text-xl text-gray-600">Experience how beautiful and meaningful a digital memorial can be</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src="/elderly-person-portrait.png"
                    alt="Sample memorial portrait"
                    width={400}
                    height={300}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-bold mb-4">Robert Johnson</h3>
                  <p className="text-gray-600 mb-6">
                    "A loving father, devoted husband, and respected community member who touched the lives of everyone
                    he met."
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Life timeline with 47 milestones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>156 photos and 12 videos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Family tree with 23 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>89 condolence messages</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                    <Link href="/memorial/sample">
                      View Sample Memorial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Create a Lasting Memorial Today</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of families who have chosen to honor their loved ones with a beautiful digital memorial.
          </p>

          <div className="mb-8">
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="px-8 py-4 text-lg">
              <Link href="/create-profile">
                Start Creating Memorial - $119.99
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/browse-memorials">Browse Sample Memorials</Link>
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>✓ 30-Day Money Back Guarantee ✓ Secure Payment ✓ Instant Setup</p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Memorial QR Demo</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowVideo(false)}>
                ✕
              </Button>
            </div>
            <div className="aspect-video">
              <video controls autoPlay className="w-full h-full" src="/videos/memorial-qr-demo.mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
