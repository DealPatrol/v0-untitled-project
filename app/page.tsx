import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Heart, Shield, Users, Clock, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />

      {/* YouTube Video - Fixed position on far left, bigger size, starts paused */}
      <div className="hidden xl:block fixed left-4 top-32 z-40">
        <div className="bg-white p-2 rounded-lg shadow-xl border-2 border-white">
          <iframe
            width="320"
            height="256"
            src="https://www.youtube.com/embed/XsWR_-Yv96Y?controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0"
            title="Memorial QR Video"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-md"
          ></iframe>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center xl:text-left xl:ml-96">
            <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200">
              ⏰ Limited Time Offer - Save $50!
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Honor Their Memory with a{" "}
              <span className="text-purple-600 relative">
                Digital Memorial
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded"></div>
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl xl:max-w-none">
              Create a beautiful, lasting tribute that family and friends can access instantly.
              <br />
              Share memories, photos, and stories with a simple QR code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start mb-12">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
                <Link href="/pricing">Create Memorial - Only $149</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
                <Link href="/browse-memorials">View Sample Memorials</Link>
              </Button>
            </div>

            <div className="mb-8">
              <p className="text-red-600 font-semibold mb-4 flex items-center justify-center xl:justify-start">
                <Clock className="w-5 h-5 mr-2" />
                Limited time offer ends in:
              </p>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-center">
            <div className="flex items-center">
              <StarRating rating={5} size={24} />
              <span className="ml-3 text-gray-700 font-semibold">4.9/5 from 500+ families</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-6 h-6 mr-2 text-purple-600" />
              <span className="font-semibold">1,000+ memorials created</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Shield className="w-6 h-6 mr-2 text-purple-600" />
              <span className="font-semibold">Secure & private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Honor Their Legacy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive memorial platform makes it easy to create, share, and preserve precious memories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Beautiful Memorial Pages</h3>
              <p className="text-gray-600">
                Create stunning, personalized memorial pages with photos, stories, and tributes that celebrate their
                life.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Family Collaboration</h3>
              <p className="text-gray-600">
                Invite family and friends to contribute memories, photos, and stories to build a complete tribute
                together.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">QR Code Access</h3>
              <p className="text-gray-600">
                Generate a unique QR code that can be placed on headstones, programs, or shared digitally for instant
                access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Families Everywhere</h2>
            <p className="text-xl text-gray-600">
              See how Memorial QR has helped families preserve and share precious memories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <StarRating rating={5} className="mb-4" />
              <p className="text-gray-700 mb-6 italic">
                "Memorial QR made it so easy for our family to share memories of Dad. The QR code on his headstone lets
                visitors access his full story."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-800 font-semibold">SM</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Sarah Martinez</p>
                  <p className="text-gray-600 text-sm">Daughter</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <StarRating rating={5} className="mb-4" />
              <p className="text-gray-700 mb-6 italic">
                "The memorial page captured Mom's spirit perfectly. Family members from around the world could
                contribute their favorite memories."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-800 font-semibold">MJ</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Michael Johnson</p>
                  <p className="text-gray-600 text-sm">Son</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <StarRating rating={5} className="mb-4" />
              <p className="text-gray-700 mb-6 italic">
                "Simple, beautiful, and meaningful. Memorial QR helped us create something special that will last
                forever."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-800 font-semibold">LW</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Lisa Wong</p>
                  <p className="text-gray-600 text-sm">Wife</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Creating Their Memorial Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who have chosen Memorial QR to honor their loved ones.
            <br />
            Limited time offer - Save $50 off the regular price.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/pricing">Create Memorial - Only $149</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 bg-transparent"
            >
              <Link href="/browse-memorials">View Examples</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm opacity-75">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              30-day money back guarantee
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Unlimited family access
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Lifetime hosting
            </div>
          </div>
        </div>
      </section>

      <HomepageStickyCTA />
    </div>
  )
}
