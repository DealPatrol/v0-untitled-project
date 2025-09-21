import { Header } from "@/components/header"
import { MemorialLogo } from "@/components/memorial-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PreservationInfo } from "@/components/preservation-info"
import { TestimonialSection } from "@/components/testimonial-section"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import {
  Heart,
  Shield,
  Clock,
  Users,
  QrCode,
  Camera,
  Share2,
  Globe,
  Smartphone,
  Play,
  Eye,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hero-pattern"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/cemetery-hero.png"
            alt="Peaceful cemetery with memorial stones"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-fade-in-up">
            <MemorialLogo size="large" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Honor Their <span className="text-blue-600">Legacy</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto animate-fade-in-up">
            Create beautiful digital memorials with QR codes that preserve memories forever. Share stories, photos, and
            tributes that celebrate a life well-lived.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
            <Button size="lg" className="text-lg px-8 py-4 pulse-glow" asChild>
              <Link href="/create-memorial">Create Memorial</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent" asChild>
              <Link href="/browse-memorials">Browse Memorials</Link>
            </Button>
          </div>

          {/* Video Demo Section */}
          <div className="relative max-w-4xl mx-auto mb-12 animate-fade-in-up">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/military-veterans-memorial-ceremony.png"
                  alt="Memorial ceremony demonstration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" variant="secondary" className="bg-white/90 hover:bg-white text-gray-900">
                    <Play className="mr-2 h-6 w-6" />
                    Watch Demo
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-center">
                See how Memorial QR helps families preserve and share precious memories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Memorials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Memorials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover touching tributes and celebrate the lives of remarkable individuals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                years: "1945 - 2023",
                image: "/elderly-woman-grandmother-smiling-portrait.png",
                description: "Beloved grandmother, teacher, and community volunteer who touched countless lives.",
                visitors: 1247,
                memories: 89,
                rating: 5,
              },
              {
                name: "Robert Chen",
                years: "1952 - 2023",
                image: "/asian-man-engineer-smiling-professional-portrait.png",
                description: "Dedicated engineer and father who built bridges both literal and metaphorical.",
                visitors: 892,
                memories: 67,
                rating: 5,
              },
              {
                name: "Maria Rodriguez",
                years: "1960 - 2023",
                image: "/hispanic-woman-smiling-professional-portrait.png",
                description: "Compassionate nurse who dedicated her life to healing and caring for others.",
                visitors: 1156,
                memories: 94,
                rating: 5,
              },
            ].map((memorial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={memorial.image || "/placeholder.svg"}
                      alt={memorial.name}
                      fill
                      className="rounded-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardTitle className="text-center text-xl">{memorial.name}</CardTitle>
                  <CardDescription className="text-center text-gray-500">{memorial.years}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center mb-4 text-sm">{memorial.description}</p>
                  <div className="flex justify-center mb-3">
                    <StarRating rating={memorial.rating} />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {memorial.visitors.toLocaleString()} visitors
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {memorial.memories} memories
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/browse-memorials">View All Memorials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a lasting digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Memorial",
                description:
                  "Upload photos, write stories, and add personal details to create a beautiful tribute page.",
                icon: Heart,
                color: "bg-red-500",
              },
              {
                step: "2",
                title: "Generate QR Code",
                description:
                  "Get a unique QR code that links directly to the memorial page, perfect for headstones or keepsakes.",
                icon: QrCode,
                color: "bg-blue-500",
              },
              {
                step: "3",
                title: "Share & Preserve",
                description:
                  "Family and friends can scan the code to view memories, leave tributes, and celebrate their legacy.",
                icon: Share2,
                color: "bg-green-500",
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold text-gray-300 mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to create meaningful, lasting tributes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Secure & Private",
                description: "Your memories are protected with enterprise-grade security and privacy controls.",
                icon: Shield,
                color: "text-green-600",
              },
              {
                title: "Forever Preserved",
                description: "Cloud hosting ensures your memorial will be accessible for generations to come.",
                icon: Clock,
                color: "text-blue-600",
              },
              {
                title: "Easy Sharing",
                description: "QR codes make it simple for anyone to access and contribute to the memorial.",
                icon: Smartphone,
                color: "text-purple-600",
              },
              {
                title: "Unlimited Photos",
                description: "Upload as many photos and videos as you want to tell their complete story.",
                icon: Camera,
                color: "text-orange-600",
              },
              {
                title: "Global Access",
                description: "Family and friends worldwide can visit and contribute from anywhere.",
                icon: Globe,
                color: "text-teal-600",
              },
              {
                title: "Community Support",
                description: "Connect with others who understand your journey of remembrance and healing.",
                icon: Users,
                color: "text-pink-600",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <feature.icon
                    className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
                  />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Preservation Info */}
      <PreservationInfo />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Preserving Their Legacy Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Create a beautiful, lasting tribute that celebrates their life and keeps their memory alive forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link href="/create-memorial">Create Memorial Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <HomepageStickyCTA />
    </div>
  )
}
