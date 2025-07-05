import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Check, Heart, Users, Shield, Star, Quote } from "lucide-react"
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">See How Memorial QR Works</h3>

                  {/* YouTube Embed with your video */}
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-900 relative">
                    <iframe
                      src="https://www.youtube.com/embed/RyGH38lunSM"
                      title="Memorial QR Demo Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Watch how easy it is to create and share memorial QR codes
                  </p>
                </div>
              </div>
            </div>

            {/* Products Section - Right Side */}
            <div className="lg:col-span-3">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Memorial QR Packages</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Design and preview your loved one's memorial page before you buy. Create a beautiful tribute with our
                  easy-to-use tools, then choose your package.
                  <Link href="/design-guide" className="text-rose-600 hover:text-rose-700 font-medium ml-2">
                    View our step-by-step guide →
                  </Link>
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

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
            <p className="text-xl text-gray-600">
              Over 10,000 families have trusted us to preserve their loved ones' memories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 - 2024 */}
            <Card className="relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-rose-200" />
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The QR code on my father's headstone has brought our family together in ways I never imagined.
                  Relatives from across the country can now share memories and photos. It's like having a living
                  memorial."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Sarah Chen</p>
                  <p className="text-sm text-gray-500">San Francisco, CA • March 2024</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 - 2023 */}
            <Card className="relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-rose-200" />
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "As a funeral director, I've recommended Memorial QR to dozens of families. The technology is
                  seamless, and the emotional impact is profound. It's the future of memorialization."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Michael Rodriguez</p>
                  <p className="text-sm text-gray-500">Austin, TX • September 2023</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 - 2023 */}
            <Card className="relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-rose-200" />
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "My grandmother's memorial page has over 200 photos and stories now. Her great-grandchildren who never
                  met her can learn about her life. It's a beautiful way to keep her spirit alive."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Jennifer Walsh</p>
                  <p className="text-sm text-gray-500">Boston, MA • June 2023</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 4 - 2022 */}
            <Card className="relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-rose-200" />
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The weatherproof QR code has survived two harsh winters perfectly. The quality is exceptional, and
                  the customer service team helped us every step of the way. Highly recommend!"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Robert Thompson</p>
                  <p className="text-sm text-gray-500">Minneapolis, MN • November 2022</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 5 - 2021 */}
            <Card className="relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-rose-200" />
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "During COVID when we couldn't gather for the funeral, the QR memorial allowed everyone to participate
                  virtually. It was a blessing during such a difficult time."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Maria Gonzalez</p>
                  <p className="text-sm text-gray-500">Phoenix, AZ • April 2021</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 6 - 2020 */}
            <Card className="relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-rose-200" />
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "We were early adopters of Memorial QR, and it's been incredible to watch the technology evolve. Our
                  son's memorial has become a place where his friends still visit and share memories."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">David & Linda Park</p>
                  <p className="text-sm text-gray-500">Seattle, WA • August 2020</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-rose-600">10,000+</div>
                <div className="text-gray-600">Families Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-rose-600">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-rose-600">99.8%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-rose-600">5 Years</div>
                <div className="text-gray-600">Durability Guarantee</div>
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

      {/* Updated Footer with CTA and Links */}
      <footer className="bg-slate-800 text-white">
        {/* CTA Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Create a Lasting Memorial?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Honor your loved one with a digital memorial that preserves their memory for generations to come.
            </p>
            <div className="flex justify-center">
              <Link href="/checkout">
                <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100 px-8 py-3 text-lg">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Memorial QR */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Memorial QR</h3>
                <p className="text-gray-400 mb-4">Tradition meets innovation</p>
                <p className="text-gray-400 text-sm">
                  Preserving memories for generations to come with innovative QR technology.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Customer Support */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Customer Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-policy" className="text-gray-400 hover:text-white transition-colors">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-gray-400 hover:text-white transition-colors">
                      Returns & Refunds
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates and special offers.</p>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 rounded-r-none"
                  />
                  <Button className="bg-white text-slate-800 hover:bg-gray-100 rounded-l-none">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-400 text-sm">© 2025 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
