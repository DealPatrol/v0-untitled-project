"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import {
  Heart,
  QrCode,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Play,
  Smartphone,
  Globe,
  Lock,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useAnalytics } from "@/lib/analytics"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Dynamic imports for better performance
const PreservationInfo = dynamic(() => import("@/components/preservation-info"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>,
})
const TestimonialSection = dynamic(() => import("@/components/testimonial-section"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>,
})

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoStartTime, setVideoStartTime] = useState<number | null>(null)

  const { trackEvent } = useAnalytics()
  const { toast } = useToast()

  useEffect(() => {
    try {
      // Track page view
      trackEvent("homepage_view", {
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      })

      // Register performance check (server-side only)
      const registerCheck = async () => {
        try {
          await fetch("/api/register-check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "homepage_load",
              externalId: `homepage-${Date.now()}`,
            }),
          })
        } catch (error) {
          console.error("Failed to register homepage check:", error)
        }
      }

      registerCheck()
    } catch (error) {
      console.error("Homepage initialization error:", error)
    }
  }, [trackEvent])

  const handleVideoPlay = () => {
    try {
      const newPlayState = !isVideoPlaying
      setIsVideoPlaying(newPlayState)

      if (newPlayState) {
        setVideoStartTime(Date.now())
        trackEvent("video_play", {
          video_id: "memorial_demo",
          timestamp: new Date().toISOString(),
          muted: isMuted,
        })
      } else {
        const watchTime = videoStartTime ? Date.now() - videoStartTime : 0
        trackEvent("video_pause", {
          video_id: "memorial_demo",
          watch_time_ms: watchTime,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Video play error:", error)
    }
  }

  const handleVideoMute = () => {
    try {
      const newMuteState = !isMuted
      setIsMuted(newMuteState)

      trackEvent("video_mute_toggle", {
        video_id: "memorial_demo",
        muted: newMuteState,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Video mute error:", error)
    }
  }

  const handleMemorialCreation = () => {
    try {
      trackEvent("cta_click", {
        button: "create_memorial_now",
        location: "hero_section",
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("CTA click tracking error:", error)
    }
  }

  const handleViewExamples = () => {
    try {
      trackEvent("cta_click", {
        button: "view_examples",
        location: "hero_section",
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("CTA click tracking error:", error)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Military Background */}
      <section className="memorial-bg min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="mb-8">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                ✨ Trusted by 10,000+ Families
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg">
                Honor Their Memory with a <span className="gradient-text">Digital Memorial</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-shadow-lg">
                Create a beautiful QR code memorial plaque that connects visitors to photos, videos, and stories of your
                loved one's life.
              </p>
            </div>

            {/* Star Rating */}
            <div className="mb-8 flex justify-center">
              <StarRating rating={5} showReviews={true} reviewCount={10247} size="lg" />
            </div>

            {/* YouTube Video - Centered with Enhanced Controls */}
            <div className="mb-8 flex justify-center">
              <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl w-full">
                <h3 className="text-xl font-semibold mb-4 text-white">See How Memorial QR Works</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/XsWR_-Yv96Y?autoplay=${isVideoPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                    title="Memorial QR Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Custom Video Controls */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleVideoPlay}
                      className="bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-sm"
                    >
                      {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleVideoMute}
                      className="bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-sm"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-2 text-center">
                  Watch how families create lasting digital memorials
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 btn-hover-lift"
                onClick={handleMemorialCreation}
              >
                <Link href="/pricing">
                  Create Memorial Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 bg-transparent"
                onClick={handleViewExamples}
              >
                <Link href="/browse-memorials">
                  <Play className="mr-2 w-5 h-5" />
                  View Examples
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium drop-shadow-md">30-Day Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium drop-shadow-md">Lifetime Access</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium drop-shadow-md">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer - Bottom Right */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <CountdownTimer />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create a lasting digital memorial in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Create Your Memorial</h3>
              <p className="text-gray-600">
                Upload photos, videos, and stories to create a beautiful digital memorial page for your loved one.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Get Your QR Code</h3>
              <p className="text-gray-600">
                Receive a custom QR code that links directly to your memorial page, ready for your plaque.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Share Their Story</h3>
              <p className="text-gray-600">
                Visitors can scan the QR code to view photos, videos, and memories, keeping their legacy alive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our memorial plaques come with powerful features to honor your loved one
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="memorial-card">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Unlimited Photos & Videos</h3>
                <p className="text-gray-600">Upload unlimited photos and videos to create a comprehensive memorial.</p>
              </CardContent>
            </Card>

            <Card className="memorial-card">
              <CardContent className="p-6">
                <Lock className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy Controls</h3>
                <p className="text-gray-600">Control who can view and contribute to your loved one's memorial page.</p>
              </CardContent>
            </Card>

            <Card className="memorial-card">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Collaboration</h3>
                <p className="text-gray-600">Invite family members to contribute photos, videos, and memories.</p>
              </CardContent>
            </Card>

            <Card className="memorial-card">
              <CardContent className="p-6">
                <QrCode className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom QR Codes</h3>
                <p className="text-gray-600">Beautiful, customizable QR codes that match your memorial design.</p>
              </CardContent>
            </Card>

            <Card className="memorial-card">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lifetime Hosting</h3>
                <p className="text-gray-600">Your memorial page will be hosted forever, ensuring lasting access.</p>
              </CardContent>
            </Card>

            <Card className="memorial-card">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Guest Book</h3>
                <p className="text-gray-600">Allow visitors to leave messages and share their own memories.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preservation Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PreservationInfo />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Honor Your Loved One?</h2>
          <p className="text-xl text-white/90 mb-8">
            Create a lasting digital memorial that celebrates their life and keeps their memory alive forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/pricing">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <span className="memorial-logo text-xl font-bold">Memorial QR</span>
              </div>
              <p className="text-gray-400">Creating lasting digital memorials to honor and remember your loved ones.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
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
                    Examples
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
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
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
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

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
