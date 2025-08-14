import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Shield, Star, CheckCircle, ArrowRight, Play, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-red-100 text-red-800 border-red-200">
            🔥 Limited Time: Save $80 - Now Only $119.99
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Honor Their Memory
            <span className="block text-red-600">Forever</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create beautiful digital memorials with weather-resistant QR codes. Preserve photos, stories, and memories
            for generations to come.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/create-profile">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                Create Memorial Now - $119.99
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/memorial/sample">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                View Sample Memorial
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <img
              src="/images/cemetery-hero.png"
              alt="Memorial QR Code on gravestone"
              className="rounded-lg shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">See How Memorial QR Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <video controls poster="/images/memorial-demo.jpg" className="w-full h-full object-cover">
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/invideo-ai-1080-Revolutionizing%20Remembrance%20with%20QR%20Code%20Memorials-2025-04-22T01_24_40-QIMzvggQMa7nZRZbC8hm9PKiF8fw3z.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need for $119.99</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete memorial package with no monthly fees or hidden costs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <QrCode className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Weather-Resistant QR Plaque</h3>
                <p className="text-gray-600">Durable, engraved QR code plaque that withstands all weather conditions</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Digital Memorial Website</h3>
                <p className="text-gray-600">
                  Beautiful, personalized memorial website with photos, stories, and memories
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Lifetime Hosting</h3>
                <p className="text-gray-600">
                  Your memorial stays online forever with no monthly fees or maintenance costs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-12">Everything included for one low price</p>

          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-red-200 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white">
                BEST VALUE
              </Badge>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-gray-500 line-through text-lg">$199.99</div>
                  <div className="text-4xl font-bold text-gray-900">$119.99</div>
                  <div className="text-red-600 font-semibold">Save $80</div>
                  <div className="text-gray-600 mt-2">One-time payment • No monthly fees</div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Weather-resistant QR plaque
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Custom memorial website
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Unlimited photos & stories
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Family tree integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Lifetime hosting included
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Free shipping & setup
                  </li>
                </ul>

                <Link href="/create-profile">
                  <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of Families</h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold">4.9/5 from 2,847 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The $119.99 was worth every penny. The QR plaque looks beautiful on my father's headstone, and the
                  digital memorial helps us share his stories with family around the world."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Amazing service and quality. For $119.99, we got everything we needed to create a lasting tribute to
                  mom. The setup was easy and the support team was incredible."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The best investment we made during a difficult time. The $119.99 package included everything, and now
                  we have a beautiful way to remember grandpa forever."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">10,000+</div>
              <div className="text-gray-600">Memorials Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">Lifetime</div>
              <div className="text-gray-600">Hosting Included</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create a Lasting Memorial Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who trust Memorial QR to preserve their loved ones' memories
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-profile">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Start Your Memorial - $119.99
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/memorial/sample">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg bg-transparent"
              >
                View Sample Memorial
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm opacity-75">
            ✓ No monthly fees ✓ Lifetime hosting ✓ 30-day money-back guarantee
          </div>
        </div>
      </section>
    </div>
  )
}
