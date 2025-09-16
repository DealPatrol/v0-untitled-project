"use client"

import { useEffect } from "react"
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
import { Heart, QrCode, Smartphone, Clock, Shield, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

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

export default function HomePage() {
  // Track homepage view
  useEffect(() => {
    try {
      trackEvent("homepage_view", {
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        page: "/",
        url: typeof window !== "undefined" ? window.location.href : "",
      })
    } catch (error) {
      console.error("Homepage view tracking failed:", error)
    }
  }, [])

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

            {/* YouTube Video Section */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-white">See How Memorial QR Works</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/XsWR_-Yv96Y?autoplay=0&mute=1&controls=1&rel=0&modestbranding=1"
                    title="Memorial QR Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-white/80 text-sm mt-3 text-center">
                  Watch how families create lasting digital memorials
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
              <AccordionItem value="item-0" className="bg-white rounded-lg border border-slate-200">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:no-underline">
                  How long do the QR codes last?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-600">
                  Our QR codes are designed to last indefinitely. The physical plaques are made from weather-resistant
                  materials, and your digital memorial is hosted on our secure servers with 99.9% uptime guarantee.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-1" className="bg-white rounded-lg border border-slate-200">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:no-underline">
                  Can family members add content to the memorial?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-600">
                  Yes! You can invite family members and friends to contribute photos, videos, stories, and memories.
                  You maintain full control over what gets published to the memorial.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg border border-slate-200">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:no-underline">
                  What happens if someone scans the QR code?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-600">
                  When someone scans the QR code with their smartphone, they'll be taken directly to your loved one's
                  digital memorial page where they can view photos, read stories, and learn about their life.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg border border-slate-200">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:no-underline">
                  Is there a monthly fee?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-600">
                  No monthly fees! You pay once for the memorial plaque and digital memorial setup. Your memorial will
                  remain active indefinitely at no additional cost.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg border border-slate-200">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-slate-900 hover:no-underline">
                  How do I update the memorial content?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-600">
                  You'll receive login credentials to easily update your memorial anytime. Add new photos, stories, or
                  information through our user-friendly dashboard.
                </AccordionContent>
              </AccordionItem>
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
