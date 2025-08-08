"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Heart, QrCode, Users, Camera, Star, Shield, Clock, ArrowRight, Play } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cemetery-hero.png')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-rose-100 text-rose-800 hover:bg-rose-200 px-4 py-2 text-sm font-medium">
              ✨ Revolutionary Memorial Technology
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Honor Their Memory with a<span className="text-rose-600 block mt-2">QR Code Memorial</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create a beautiful digital memorial that family and friends can access instantly. Share photos, stories,
              and memories that last forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/create-profile">
                <Button
                  size="lg"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started - $119.99
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/memorial/sample">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-rose-600 text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  View Sample Memorial
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Setup in Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-600" />
                <span>Unlimited Memories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">See How It Works</h2>
            <p className="text-xl text-gray-600 mb-8">
              Watch how easy it is to create a lasting memorial that brings families together
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              <iframe
                src="https://www.youtube.com/embed/1rTi4fdWLEg"
                title="Memorial QR Code Demo - How It Works"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Honor Their Memory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive memorial platform includes all the tools you need to create a beautiful, lasting tribute
              that brings family and friends together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <QrCode className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom QR Code</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get a unique QR code that links directly to your loved one's memorial. Perfect for gravestones,
                  funeral programs, or memorial cards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Photo & Video Memories</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload unlimited photos and videos to create a rich, multimedia tribute. Family members can contribute
                  their own memories and stories.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Family Tree</h3>
                <p className="text-gray-600 leading-relaxed">
                  Build a comprehensive family tree that shows relationships and connections. Help preserve family
                  history for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Guest Stories</h3>
                <p className="text-gray-600 leading-relaxed">
                  Allow friends and family to share their own memories and stories. Create a collaborative space for
                  healing and remembrance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your memorial is secure and private by default. You control who can view and contribute to your loved
                  one's memorial page.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Forever Accessible</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your memorial will be available forever. No monthly fees, no expiration dates. A one-time payment for
                  a lifetime of memories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">
                One payment, lifetime access. No hidden fees or monthly subscriptions.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto border-2 border-rose-200 shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-rose-100 text-rose-800 px-4 py-2 text-sm font-medium">Most Popular</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Memorial Package</h3>
                  <div className="text-5xl font-bold text-rose-600 mb-2">$119.99</div>
                  <p className="text-gray-600">One-time payment • Lifetime access</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Custom QR code for gravestone or memorial</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Beautiful memorial website</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited photo and video uploads</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Interactive family tree</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Guest story submissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Mobile-friendly design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">30-day money-back guarantee</span>
                  </div>
                </div>

                <Link href="/create-profile" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">Secure payment powered by Stripe • SSL encrypted</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Trusted by Families Worldwide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our memorial QR codes have helped families honor their loved ones and bring comfort during
              difficult times.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic">
                  "This memorial QR code has been such a blessing. Family members from around the world can easily
                  access Dad's memorial and share their memories. It's brought us closer together during our grief."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                    <div className="text-sm text-gray-600">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic">
                  "The setup was incredibly easy, and the memorial looks beautiful. We've received so many touching
                  stories from friends who found the QR code on Mom's headstone. Highly recommend this service."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Michael Johnson</div>
                    <div className="text-sm text-gray-600">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic">
                  "What a wonderful way to preserve memories! The family tree feature helped us document our family
                  history, and the photo galleries bring back so many beautiful memories of Grandpa."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">LD</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Lisa Davis</div>
                    <div className="text-sm text-gray-600">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Honor Their Memory?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Create a lasting tribute that brings family and friends together. Start building your memorial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create-profile">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg"
              >
                Get Started - $119.99
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/memorial/sample">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
              >
                View Sample Memorial
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>30-day money-back guarantee • No monthly fees • Lifetime access</p>
          </div>
        </div>
      </section>
    </div>
  )
}
