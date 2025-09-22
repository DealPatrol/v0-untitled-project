import { Header } from "@/components/header"
import { MemorialLogo } from "@/components/memorial-logo"
import { StarRating } from "@/components/star-rating"
import { TestimonialSection } from "@/components/testimonial-section"
import { PreservationInfo } from "@/components/preservation-info"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import {
  QrCode,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Camera,
  Share2,
  Smartphone,
  Globe,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

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
          <div className="absolute inset-0 hero-overlay"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Honor Their Memory
            <br />
            <span className="memorial-logo-gradient font-dancing">Forever</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Create beautiful digital memorials with QR codes that connect physical monuments to lasting online tributes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg">
              Create Memorial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-transparent"
            >
              View Examples
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
              See how families are honoring their loved ones with beautiful digital memorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Memorial Card 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/hispanic-woman-smiling-professional-portrait.png"
                  alt="Maria Rodriguez Memorial"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-yellow-600 text-white">Featured</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Maria Rodriguez</h3>
                <p className="text-gray-600 mb-3">1952 - 2023</p>
                <p className="text-sm text-gray-700 mb-4">
                  Beloved mother, teacher, and community leader who touched countless lives...
                </p>
                <div className="flex items-center justify-between">
                  <StarRating rating={5} />
                  <span className="text-sm text-gray-500">1,247 visitors</span>
                </div>
              </CardContent>
            </Card>

            {/* Memorial Card 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/elderly-veteran-man-uniform-portrait.png"
                  alt="Robert Johnson Memorial"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-blue-600 text-white">Veteran</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Robert Johnson</h3>
                <p className="text-gray-600 mb-3">1945 - 2023</p>
                <p className="text-sm text-gray-700 mb-4">
                  Proud veteran and devoted father who served his country with honor...
                </p>
                <div className="flex items-center justify-between">
                  <StarRating rating={5} />
                  <span className="text-sm text-gray-500">892 visitors</span>
                </div>
              </CardContent>
            </Card>

            {/* Memorial Card 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/professional-woman-doctor-white-coat-smiling.png"
                  alt="Dr. Sarah Chen Memorial"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-green-600 text-white">Healthcare Hero</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Dr. Sarah Chen</h3>
                <p className="text-gray-600 mb-3">1968 - 2023</p>
                <p className="text-sm text-gray-700 mb-4">
                  Dedicated physician who saved countless lives during her career...
                </p>
                <div className="flex items-center justify-between">
                  <StarRating rating={5} />
                  <span className="text-sm text-gray-500">2,156 visitors</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Browse All Memorials
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a lasting digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Create Memorial</h3>
              <p className="text-gray-600">
                Upload photos, write stories, and add memories to create a beautiful digital tribute
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Get QR Code</h3>
              <p className="text-gray-600">
                Receive a unique QR code that links directly to your loved one's memorial page
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Share & Remember</h3>
              <p className="text-gray-600">
                Place the QR code on headstones, programs, or share digitally for eternal remembrance
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
              The most trusted platform for creating lasting digital memorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your memories are protected with enterprise-grade security and privacy controls
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Forever Preserved</h3>
              <p className="text-gray-600">
                Digital memorials are preserved indefinitely with automatic backups and redundancy
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Mobile Friendly</h3>
              <p className="text-gray-600">
                Perfect viewing experience on all devices - phones, tablets, and computers
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Family Collaboration</h3>
              <p className="text-gray-600">
                Multiple family members can contribute photos, stories, and memories together
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Global Access</h3>
              <p className="text-gray-600">Friends and family worldwide can visit and contribute to the memorial</p>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Award Winning</h3>
              <p className="text-gray-600">Recognized as the leading digital memorial platform by industry experts</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Preservation Info */}
      <PreservationInfo />

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Creating a Memorial Today</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Honor your loved one with a beautiful digital memorial that will preserve their memory for generations to
            come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg">
              Create Memorial Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-transparent"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <MemorialLogo />
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Memorial QR helps families create lasting digital tributes that honor and preserve the memories of their
                loved ones forever.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/how-it-works" className="text-gray-300 hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/browse-memorials" className="text-gray-300 hover:text-white">
                    Browse Memorials
                  </Link>
                </li>
                <li>
                  <Link href="/our-story" className="text-gray-300 hover:text-white">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-gray-300">support@memorialqr.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-gray-300">1-800-MEMORIAL</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-gray-300">San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Memorial QR. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
