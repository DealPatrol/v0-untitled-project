"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import PreservationInfo from "@/components/preservation-info"
import TestimonialSection from "@/components/testimonial-section"
import {
  Heart,
  QrCode,
  Smartphone,
  Clock,
  Shield,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"

// Analytics tracking function
const trackEvent = async (eventName: string, data: any) => {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: eventName, data }),
    })
  } catch (error) {
    console.error("Analytics tracking failed:", error)
  }
}

// Video interaction tracking
const trackVideoInteraction = (action: string, videoId: string) => {
  try {
    trackEvent("video_interaction", {
      action,
      videoId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Video tracking failed:", error)
  }
}

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [videoCurrentTime, setVideoCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [showVideoControls, setShowVideoControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Track homepage view
  useEffect(() => {
    try {
      trackEvent("homepage_view", {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        page: "/",
        url: window.location.href,
      })
    } catch (error) {
      console.error("Homepage view tracking failed:", error)
    }
  }, [])

  // Video control functions with analytics
  const handlePlayPause = () => {
    try {
      if (videoRef.current) {
        if (isVideoPlaying) {
          videoRef.current.pause()
          trackVideoInteraction("pause", "homepage-hero-video")
        } else {
          videoRef.current.play()
          trackVideoInteraction("play", "homepage-hero-video")
        }
        setIsVideoPlaying(!isVideoPlaying)
      }
    } catch (error) {
      console.error("Video play/pause failed:", error)
    }
  }

  const handleMuteToggle = () => {
    try {
      if (videoRef.current) {
        videoRef.current.muted = !isVideoMuted
        setIsVideoMuted(!isVideoMuted)
        trackVideoInteraction(isVideoMuted ? "unmute" : "mute", "homepage-hero-video")
      }
    } catch (error) {
      console.error("Video mute toggle failed:", error)
    }
  }

  const handleVideoRestart = () => {
    try {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        setVideoCurrentTime(0)
        trackVideoInteraction("restart", "homepage-hero-video")
      }
    } catch (error) {
      console.error("Video restart failed:", error)
    }
  }

  const handleTimeUpdate = () => {
    try {
      if (videoRef.current) {
        setVideoCurrentTime(videoRef.current.currentTime)
        setVideoDuration(videoRef.current.duration)
      }
    } catch (error) {
      console.error("Video time update failed:", error)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const features = [
    {
      icon: QrCode,
      title: "QR Code Memorial Plaques",
      description: "Beautiful, weather-resistant plaques with QR codes that link to digital memorials",
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly Memorials",
      description: "Visitors can easily scan and view memorials on any smartphone or device",
    },
    {
      icon: Heart,
      title: "Share Memories & Stories",
      description: "Family and friends can contribute photos, videos, and stories to honor your loved one",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your memorial content is protected with enterprise-grade security and privacy controls",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Denver, CO",
      text: "Memorial QR helped us create a beautiful tribute for my father. The QR plaque at his gravesite allows visitors to see his life story and photos.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      location: "Seattle, WA",
      text: "The digital memorial has brought our family closer together. We can all contribute memories and stories in one place.",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      location: "Austin, TX",
      text: "Professional service and beautiful results. The memorial plaque looks elegant and the digital content is easy to manage.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "How long do the QR codes last?",
      answer:
        "Our QR codes are designed to last indefinitely. The physical plaques are made from weather-resistant materials, and your digital memorial is hosted on our secure servers with 99.9% uptime guarantee.",
    },
    {
      question: "Can family members add content to the memorial?",
      answer:
        "Yes! You can invite family members and friends to contribute photos, videos, stories, and memories. You maintain full control over what gets published to the memorial.",
    },
    {
      question: "What happens if someone scans the QR code?",
      answer:
        "When someone scans the QR code with their smartphone, they'll be taken directly to your loved one's digital memorial page where they can view photos, read stories, and learn about their life.",
    },
    {
      question: "Is there a monthly fee?",
      answer:
        "No monthly fees! You pay once for the memorial plaque and digital memorial setup. Your memorial will remain active indefinitely at no additional cost.",
    },
    {
      question: "How do I update the memorial content?",
      answer:
        "You'll receive login credentials to easily update your memorial anytime. Add new photos, stories, or information through our user-friendly dashboard.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Military Background */}
      <section className="relative min-h-screen flex items-center justify-center memorial-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-pulse" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                Honor Their Memory Forever
              </Badge>
              <Sparkles className="w-8 h-8 text-yellow-400 ml-3 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg">
              Digital Memorial
              <span className="block text-yellow-400 font-dancing">Plaques</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create lasting tributes with QR code memorial plaques that connect visitors to photos, videos, and stories
              of your loved one's life.
            </p>

            {/* Enhanced Video Section */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div
                  className="relative video-container rounded-xl overflow-hidden cursor-pointer"
                  onMouseEnter={() => setShowVideoControls(true)}
                  onMouseLeave={() => setShowVideoControls(false)}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster="/military-veterans-memorial-ceremony.png"
                    muted={isVideoMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source src="/memorial-demo-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${showVideoControls ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handlePlayPause}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleMuteToggle}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleVideoRestart}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Video Progress Bar */}
                  {videoDuration > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <div className="flex items-center space-x-2 text-white text-xs">
                        <span>{formatTime(videoCurrentTime)}</span>
                        <div className="flex-1 bg-white/20 rounded-full h-1">
                          <div
                            className="bg-white rounded-full h-1 transition-all duration-300"
                            style={{ width: `${(videoCurrentTime / videoDuration) * 100}%` }}
                          ></div>
                        </div>
                        <span>{formatTime(videoDuration)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-white/80 text-sm mt-3 text-center">
                  See how Memorial QR plaques honor your loved ones
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg btn-hover-lift"
              >
                <Link href="/create-profile">
                  Create Memorial Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg btn-hover-lift bg-transparent"
              >
                <Link href="/browse-memorials">View Sample Memorials</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
              <div className="flex items-center">
                <StarRating rating={5} size="sm" />
                <span className="ml-2 text-sm">4.9/5 from 500+ families</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Setup in 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <CountdownTimer />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Memorial QR Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our digital memorial plaques combine traditional remembrance with modern technology to create lasting
              tributes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="memorial-card text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-slate-700" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preservation Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <PreservationInfo />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <TestimonialSection />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              One-time payment. No monthly fees. Your memorial lasts forever.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="memorial-card border-2 border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-center py-2 font-semibold text-sm">
                Most Popular Choice
              </div>

              <CardHeader className="text-center pt-12">
                <CardTitle className="text-2xl mb-2">Premium Memorial Package</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  $119.99
                  <span className="text-lg font-normal text-slate-500 line-through ml-2">$149.99</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Save $30 - Limited Time
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Weather-resistant QR memorial plaque",
                    "Custom digital memorial website",
                    "Unlimited photos and videos",
                    "Family collaboration features",
                    "Secure cloud hosting forever",
                    "Mobile-optimized viewing",
                    "24/7 customer support",
                    "Free content updates",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <Button
                    asChild
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold btn-hover-lift"
                  >
                    <Link href="/create-profile">
                      Create Your Memorial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                <p className="text-center text-sm text-slate-500">Free shipping • 30-day money-back guarantee</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about Memorial QR plaques and digital memorials.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg border border-slate-200"
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-slate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Honor Your Loved One?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Create a beautiful digital memorial that will preserve their memory for generations to come.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg btn-hover-lift"
              >
                <Link href="/create-profile">
                  Start Your Memorial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg btn-hover-lift bg-transparent"
              >
                <Link href="/browse-memorials">See Examples</Link>
              </Button>
            </div>

            <p className="text-slate-400 mt-6">Join over 500 families who have created lasting digital memorials</p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
