"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Shield, Clock, Heart, Users, Camera, QrCode, ArrowRight, Zap, Award, Infinity } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 text-sm font-bold rounded-full border border-blue-200">
              ⭐ LIMITED TIME: Save $80 Today!
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create a Lasting
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Digital Memorial
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Honor your loved one with a beautiful QR code memorial that preserves their memory forever. 
              One simple price includes everything you need.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 mb-12">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-medium">30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Infinity className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Lifetime Hosting</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="relative border-0 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg">
                  🏆 MOST POPULAR CHOICE
                </div>
              </div>

              {/* Header */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 pt-12 text-center border-b">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Complete Memorial Package</h3>
                <p className="text-gray-600 mb-6">Everything included • No hidden fees • Lifetime access</p>
                
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-gray-400 line-through text-2xl mr-4">$199.99</span>
                    <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-bold">
                      SAVE $80
                    </Badge>
                  </div>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      $119
                    </span>
                    <span className="text-2xl text-gray-600">.99</span>
                  </div>
                  <p className="text-gray-500">One-time payment • No monthly fees</p>
                </div>

                {/* Primary CTA */}
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
                  asChild
                >
                  <Link href="/create-profile">
                    🚀 Create Memorial Now - $119.99
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <p className="text-xs text-gray-500">
                  ✅ Secure payment • 🔒 SSL encrypted • 💳 All major cards accepted
                </p>
              </div>

              {/* Features List */}
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Weather-Resistant QR Plaque</h4>
                      <p className="text-sm text-gray-600">Laser-engraved, UV-resistant plaque that lasts decades outdoors</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Beautiful Memorial Website</h4>
                      <p className="text-sm text-gray-600">Professional, mobile-friendly memorial page with custom design</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Unlimited Photos & Videos</h4>
                      <p className="text-sm text-gray-600">Upload and organize unlimited memories with family collaboration</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Interactive Family Tree</h4>
                      <p className="text-sm text-gray-600">Build and share your family history with detailed relationships</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Guest Book & Timeline</h4>
                      <p className="text-sm text-gray-600">Allow visitors to share memories and view life milestones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Lifetime Hosting Included</h4>
                      <p className="text-sm text-gray-600">Your memorial stays online forever with no recurring fees</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">24/7 Customer Support</h4>
                      <p className="text-sm text-gray-600">Get help whenever you need it with our dedicated support team</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">30-Day Money-Back Guarantee</h4>
                      <p className="text-sm text-gray-600">Not satisfied? Get a full refund within 30 days, no questions asked</p>
                    </div>
                  </div>
                </div>

                {/* Secondary CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/create-profile">
                      💳 Buy Now - Only $119.99
                      <Zap className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">4.9/5</span>
            </div>
            <p className="text-xl text-gray-600">Trusted by over 10,000 families worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Worth every penny of the $119.99. The QR code works perfectly and the memorial website is beautiful. 
                Our whole family can contribute memories."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold text-sm">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Sarah Mitchell</p>
                  <p className="text-xs text-gray-500">Verified Purchase</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "The weather-resistant plaque has been on Dad's headstone for 2 years now and still looks brand new. 
                Amazing quality for $119.99."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-sm">MR</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Michael Rodriguez</p>
                  <p className="text-xs text-gray-500">Verified Purchase</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Setup was so easy and the family tree feature is incredible. Best $119.99 I've ever spent. 
                Highly recommend to anyone creating a memorial."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-semibold text-sm">JL</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Jennifer Lee</p>
                  <p className="text-xs text-gray-500">Verified Purchase</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Why is it only $119.99 when competitors charge $200+?</h3>
                <p className="text-gray-600">
                  We believe preserving memories shouldn't be expensive. By focusing on quality and efficiency, 
                  we can offer premium memorial services at an affordable price. No compromises on quality - 
                  just better value for families.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What's included in the $119.99 price?</h3>
                <p className="text-gray-600">
                  Everything! Weather-resistant QR plaque, beautiful memorial website, unlimited photo/video storage, 
                  family tree, guest book, timeline, lifetime hosting, and 24/7 support. No hidden fees or monthly charges.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How long will the QR code last outdoors?</h3>
                <p className="text-gray-600">
                  Our laser-engraved QR plaques are designed to last 20+ years outdoors. They're UV-resistant, 
                  waterproof, and freeze-proof. We use premium materials specifically chosen for cemetery environments.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Is there really no monthly fee?</h3>
                <p className="text-gray-600">
                  Absolutely no monthly fees! Your $119.99 payment includes lifetime hosting. Your memorial will 
                  stay online forever with no additional costs. We believe memories should be preserved permanently, 
                  not held hostage by subscription fees.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What if I'm not satisfied?</h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee. If you're not completely satisfied with your memorial, 
                  contact us within 30 days for a full refund. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Their Memorial?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join thousands of families who have chosen Memorial QR to honor their loved ones. 
            Start creating a lasting tribute today.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto mb-8">
            <div className="text-center">
              <p className="text-blue-100 mb-2">Limited Time Offer</p>
              <div className="flex items-center justify-center mb-4">
                <span className="text-blue-200 line-through text-2xl mr-3">$199.99</span>
                <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-bold">
                  Save $80
                </Badge>
              </div>
              <div className="text-5xl font-bold mb-4">$119.99</div>
              <p className="text-blue-100 text-sm">One-time payment • Lifetime hosting • No hidden fees</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6"
            asChild
          >
            <Link href="/create-profile">
              🚀 Start Creating Now - $119.99
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </Button>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-blue-100">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              30-Day Guarantee
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 fill-current" />
              4.9/5 Rating
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              10,000+ Families
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
