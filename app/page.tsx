import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { TestimonialSection } from "@/components/testimonial-section"
import { PreservationInfo } from "@/components/preservation-info"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Heart, Users, Clock, Shield, Camera, Share2, QrCode, MapPin } from "lucide-react"

export default function HomePage() {
  const featuredMemorials = [
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      dates: "1952 - 2023",
      image: "/elderly-woman-grandmother-smiling-portrait.png",
      visitors: 1247,
      rating: 4.9,
      location: "San Francisco, CA",
    },
    {
      id: "robert-chen",
      name: "Robert Chen",
      dates: "1945 - 2023",
      image: "/asian-man-engineer-smiling-professional-portrait.png",
      visitors: 892,
      rating: 4.8,
      location: "Seattle, WA",
    },
    {
      id: "maria-rodriguez",
      name: "Maria Rodriguez",
      dates: "1960 - 2023",
      image: "/hispanic-woman-smiling-professional-portrait.png",
      visitors: 1156,
      rating: 4.9,
      location: "Austin, TX",
    },
  ]

  const features = [
    {
      icon: QrCode,
      title: "QR Code Access",
      description: "Instant access to memorials via QR codes on headstones, plaques, or cards",
    },
    {
      icon: Camera,
      title: "Photo Galleries",
      description: "Upload unlimited photos and create beautiful galleries of memories",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share memorial pages with family and friends around the world",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your memories are protected with enterprise-grade security",
    },
    {
      icon: Users,
      title: "Family Collaboration",
      description: "Multiple family members can contribute stories and photos",
    },
    {
      icon: Clock,
      title: "Forever Preserved",
      description: "Digital memorials that last forever, never fade or deteriorate",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cemetery-hero.png"
            alt="Peaceful cemetery with memorial stones"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Honor Their Memory
            <span className="block text-yellow-400">Forever</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Create beautiful digital memorials with QR codes. Share stories, photos, and memories that last forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg">
              <Link href="/create-memorial">Create Memorial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/browse-memorials">Browse Memorials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Memorials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Memorials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover beautiful tributes created by families to honor their loved ones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredMemorials.map((memorial) => (
              <Card key={memorial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image src={memorial.image || "/placeholder.svg"} alt={memorial.name} fill className="object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90">
                      <Heart className="w-3 h-3 mr-1 text-red-500" />
                      {memorial.visitors}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{memorial.name}</h3>
                  <p className="text-gray-600 mb-3">{memorial.dates}</p>
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={memorial.rating} />
                    <span className="text-sm text-gray-500">{memorial.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {memorial.location}
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Link href={`/memorial/${memorial.id}`}>View Memorial</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a lasting digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Create Memorial</h3>
              <p className="text-gray-600">
                Upload photos, write stories, and add personal details to create a beautiful tribute
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Get QR Code</h3>
              <p className="text-gray-600">
                Receive a unique QR code to place on headstones, plaques, or memorial cards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Share & Remember</h3>
              <p className="text-gray-600">
                Family and friends can scan the code to view the memorial and share their own memories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Memorial QR</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most comprehensive platform for creating and sharing digital memorials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
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

      {/* Final CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Creating a Memorial Today</h2>
          <p className="text-xl mb-8 text-blue-100">
            Honor your loved one with a beautiful digital memorial that will preserve their memory forever
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <Link href="/create-memorial">Create Memorial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="memorial-logo text-2xl font-bold mb-4">Memorial QR</h3>
              <p className="text-gray-400 mb-4">
                Creating lasting digital memorials that honor and preserve the memories of your loved ones.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/how-it-works" className="text-gray-400 hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/browse-memorials" className="text-gray-400 hover:text-white">
                    Browse Memorials
                  </Link>
                </li>
                <li>
                  <Link href="/create-memorial" className="text-gray-400 hover:text-white">
                    Create Memorial
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/our-story" className="text-gray-400 hover:text-white">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Memorial QR. All rights reserved. Preserving memories with love and technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
