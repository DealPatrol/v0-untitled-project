import { Header } from "@/components/header"
import { MemorialLogo } from "@/components/memorial-logo"
import { PreservationInfo } from "@/components/preservation-info"
import { TestimonialSection } from "@/components/testimonial-section"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCta } from "@/components/homepage-sticky-cta"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Clock, Users, QrCode, Camera, Share2, Lock, Globe, Smartphone } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <MemorialLogo size="large" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Honor Their Memory
            <span className="block text-3xl md:text-5xl mt-4 text-gold-300">Forever</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Create beautiful digital memorials with QR codes that preserve precious memories, share life stories, and
            keep your loved ones close to your heart.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 text-lg">
              <Heart className="mr-2 h-5 w-5" />
              Create Memorial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
            >
              <Users className="mr-2 h-5 w-5" />
              Browse Memorials
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gold-300" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-300" />
              <span>Forever Preserved</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gold-300" />
              <span>Accessible Anywhere</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Memorials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Memorials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover touching tributes and celebrate the lives of remarkable individuals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Memorial Card 1 */}
            <Card className="card-hover overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/hispanic-woman-smiling-professional-portrait.png"
                  alt="Maria Rodriguez Memorial"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gold-600 text-white">
                    <Heart className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Maria Rodriguez</h3>
                <p className="text-gray-600 mb-4">1965 - 2023 • Beloved Teacher & Mother</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StarRating rating={5} size="sm" />
                    <span className="text-sm text-gray-500">(127 visits)</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Visit Memorial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Memorial Card 2 */}
            <Card className="card-hover overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/elderly-veteran-man-uniform-portrait.png"
                  alt="Robert Johnson Memorial"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Veteran
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Robert Johnson</h3>
                <p className="text-gray-600 mb-4">1942 - 2023 • U.S. Army Veteran</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StarRating rating={5} size="sm" />
                    <span className="text-sm text-gray-500">(89 visits)</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Visit Memorial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Memorial Card 3 */}
            <Card className="card-hover overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/professional-woman-doctor-white-coat-smiling.png"
                  alt="Dr. Sarah Chen Memorial"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600 text-white">
                    <Heart className="h-3 w-3 mr-1" />
                    Healthcare Hero
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Dr. Sarah Chen</h3>
                <p className="text-gray-600 mb-4">1978 - 2023 • Pediatric Surgeon</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StarRating rating={5} size="sm" />
                    <span className="text-sm text-gray-500">(203 visits)</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Visit Memorial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              <Users className="mr-2 h-5 w-5" />
              Browse All Memorials
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a lasting digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-10 w-10 text-gold-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">1. Create Memorial</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload photos, write stories, and add personal details to create a beautiful tribute that captures their
                unique spirit and legacy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="h-10 w-10 text-gold-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">2. Generate QR Code</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a unique QR code that links directly to the memorial. Perfect for headstones, funeral programs,
                or sharing with family and friends.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="h-10 w-10 text-gold-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">3. Share & Remember</h3>
              <p className="text-gray-600 leading-relaxed">
                Family and friends can scan the QR code to visit the memorial, leave messages, and share their own
                memories and photos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Memorial QR</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform offers everything you need to create meaningful, lasting tributes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-gold-600" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your memories are protected with enterprise-grade security. Control who can view and contribute to
                  each memorial with flexible privacy settings.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-gold-600" />
                </div>
                <CardTitle>Forever Accessible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Memorials are hosted on reliable cloud infrastructure, ensuring they remain accessible to future
                  generations from anywhere in the world.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-gold-600" />
                </div>
                <CardTitle>Mobile Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Optimized for all devices, making it easy for family and friends to visit memorials and share memories
                  from their phones, tablets, or computers.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-gold-600" />
                </div>
                <CardTitle>Interactive Tributes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visitors can leave messages, share photos, light virtual candles, and contribute their own memories to
                  create a living tribute.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-gold-600" />
                </div>
                <CardTitle>QR Code Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  High-quality QR codes that can be engraved on headstones, printed on cards, or displayed at services
                  for easy access to digital memorials.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-gold-600" />
                </div>
                <CardTitle>Family Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Multiple family members can contribute to and manage memorials together, ensuring all precious
                  memories are preserved and shared.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Preservation Info */}
      <PreservationInfo />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Creating Today</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Honor your loved ones with a beautiful digital memorial that will preserve their memory for generations to
            come.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 text-lg">
              <Heart className="mr-2 h-5 w-5" />
              Create Memorial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      <HomepageStickyCta />
    </div>
  )
}
