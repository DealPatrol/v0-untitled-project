import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import CountdownTimer from "@/components/countdown-timer"
import StarRating from "@/components/star-rating"
import HomepageStickyCTA from "@/components/homepage-sticky-cta"
import { Heart, QrCode, Share2, Clock, Shield, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      {/* YouTube Video - Far Left Side */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
        <div className="w-64 h-36 shadow-lg rounded-r-lg overflow-hidden">
          <iframe
            width="256"
            height="144"
            src="https://www.youtube.com/embed/XsWR_-Yv96Y?autoplay=1&mute=1&loop=1&playlist=XsWR_-Yv96Y&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="Memorial QR Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
            ✨ Limited Time Offer - Save $50!
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Honor Their Memory with a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Digital Memorial
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create a beautiful, lasting tribute that family and friends can access instantly. Share memories, photos,
            and stories with a simple QR code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
              <Link href="/pricing">Create Memorial - Only $149</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              <Link href="/browse-memorials">View Sample Memorials</Link>
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <p className="text-sm text-gray-600 mb-4">⏰ Limited time offer ends in:</p>
            <CountdownTimer />
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <StarRating rating={5} size={16} />
              <span>4.9/5 from 500+ families</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>1,000+ memorials created</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure & private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Honor Their Memory
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to create a beautiful, lasting tribute that brings comfort to family and
              friends.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">QR Code Access</h3>
                <p className="text-gray-600">
                  Instant access to the memorial with a simple QR code scan. Perfect for headstones, funeral programs,
                  or sharing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Share Memories</h3>
                <p className="text-gray-600">
                  Family and friends can leave messages, share photos, and contribute to a collective memory of your
                  loved one.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                <p className="text-gray-600">
                  Share the memorial link via email, social media, or text message. No apps required - works on any
                  device.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Families Everywhere</h2>
            <p className="text-xl text-gray-600">See how Memorial QR has helped families honor their loved ones</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "Creating a memorial for my mother was so easy and meaningful. The QR code on her headstone allows
                  visitors to learn about her incredible life."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Martinez</p>
                    <p className="text-sm text-gray-500">Daughter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "The memorial page brought our family together during a difficult time. Everyone could share their
                  favorite memories and photos."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Johnson</p>
                    <p className="text-sm text-gray-500">Son</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "Simple, beautiful, and exactly what we needed. The QR code makes it so easy for people to access
                  dad's memorial and leave messages."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">LW</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lisa Wong</p>
                    <p className="text-sm text-gray-500">Daughter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Create a Lasting Tribute Today</h2>
          <p className="text-xl text-purple-100 mb-8">
            Honor your loved one with a beautiful digital memorial that will preserve their memory forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/pricing">Get Started - Only $149</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3 bg-transparent"
            >
              <Link href="/contact">Have Questions?</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-purple-100">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Setup takes less than 10 minutes</span>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
