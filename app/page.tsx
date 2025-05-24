import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Heart, Users, Shield } from "lucide-react"
import { LazyVideo } from "@/components/lazy-video"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Video and Products */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* Video Section - Left Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <LazyVideo
                    src="/videos/revolutionizing-remembrance-qr.mov"
                    poster="/placeholder.svg?height=200&width=300&text=Memorial+QR+Video"
                    title="See How It Works"
                    description="Discover how Memorial QR revolutionizes remembrance"
                  />
                </div>
              </div>
            </div>

            {/* Products Section - Right Side */}
            <div className="lg:col-span-3">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Memorial QR Packages</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose the perfect memorial package to honor your loved one's memory with our innovative QR
                  technology.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Premium Package */}
                <Card className="relative border-2 border-gray-200 hover:border-rose-300 transition-colors">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">Premium</CardTitle>
                    <CardDescription className="text-gray-600">Perfect for basic memorials</CardDescription>
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-gray-900">$79</span>
                      <span className="text-gray-500 line-through ml-2 text-sm">$99</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Custom QR Code</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Digital Memorial Page</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Photo Gallery (10 photos)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Guest Book</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/checkout?plan=premium" className="w-full">
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">Add to Cart</Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Deluxe Package */}
                <Card className="relative border-2 border-rose-500 hover:border-rose-600 transition-colors">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white">
                    Most Popular
                  </Badge>
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">Deluxe</CardTitle>
                    <CardDescription className="text-gray-600">Enhanced memorial experience</CardDescription>
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-gray-900">$89</span>
                      <span className="text-gray-500 line-through ml-2 text-sm">$129</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Everything in Premium</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Video Memories</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Family Tree</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Unlimited Photos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Custom Design</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/checkout?plan=deluxe" className="w-full">
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">Add to Cart</Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Legacy Package */}
                <Card className="relative border-2 border-gray-200 hover:border-rose-300 transition-colors">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">Legacy</CardTitle>
                    <CardDescription className="text-gray-600">Complete memorial solution</CardDescription>
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-gray-900">$149</span>
                      <span className="text-gray-500 line-through ml-2 text-sm">$199</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Everything in Deluxe</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">AI Biography Assistant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Premium Support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Multiple QR Codes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Advanced Analytics</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/checkout?plan=legacy" className="w-full">
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">Add to Cart</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-gray-600">Tradition meets innovation in preserving memories for generations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Preserve Memories</h3>
              <p className="text-gray-600">Keep precious memories alive with digital memorials that last forever</p>
            </div>

            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Families</h3>
              <p className="text-gray-600">Bring families together to share stories and celebrate lives</p>
            </div>

            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your memories are protected with enterprise-grade security</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rose-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Start Creating Your Memorial Today</h2>
          <p className="text-xl text-rose-100 mb-8">Honor your loved one's memory with a beautiful digital memorial</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-rose-600"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
