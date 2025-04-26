"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { CheckCircle } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { CartButton } from "@/components/cart-button"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-white">
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Header - Keep your existing navigation links */}
      <header className="container mx-auto py-6 flex justify-between items-center border-b">
        <button className="lg:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="text-center flex-grow lg:flex-grow-0">
          <Link href="/" className="text-2xl font-serif flex items-center justify-center">
            Memorial QR
            <span className="text-yellow-400 ml-1">★</span>
          </Link>
        </div>
        {/* IMPORTANT: Replace these with your actual navigation links */}
        <div className="hidden lg:flex space-x-6 flex-grow justify-center">
          <Link href="/memorials" className="hover:text-gray-600">
            Memorials
          </Link>
          <Link href="/how-it-works" className="hover:text-gray-600">
            How It Works
          </Link>
          <Link href="/pricing" className="hover:text-gray-600">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Keep your existing authentication links */}
          <Link href="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <CartButton />
        </div>
      </header>

      {/* Main Product Section */}
      <main className="container mx-auto py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Video */}
          <div className="bg-gray-50 rounded-lg p-8 relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-bold py-1 px-3 rounded-full z-10">
              50% OFF TODAY!
            </div>
            <div className="flex justify-center items-center">
              <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
                <video
                  className="w-full aspect-video object-cover"
                  style={{ minHeight: "350px" }}
                  controls
                  playsInline
                  preload="auto"
                  poster="/images/qr-code-gravestone.png"
                >
                  <source src="/videos/revolutionizing-remembrance.mp4" type="video/mp4" />
                  <source src="/videos/memorial-qr-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="w-full">
                100% MONEY-BACK GUARANTEE
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-center mb-2">
              <StarRating rating={4.9} />
              <span className="ml-2 text-gray-600">2,500+ Reviews</span>
            </div>
            <h1 className="text-3xl font-serif mb-4">The Memorial Star</h1>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 italic text-gray-700">
              "I wasn't sure if I really needed this, but wow... The moment I held it, I knew it was something special.
              The quality is amazing, and every time I see it, I feel connected. So glad I got this!" – Caroline
            </div>

            <div className="flex items-baseline mb-6">
              <span className="text-2xl font-bold mr-2">$49.99</span>
              <span className="text-gray-500 line-through">$99.99</span>
              <span className="ml-4 border border-blue-500 text-blue-500 px-3 py-1 rounded-full text-sm">
                One Time Payment
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Keep their memory alive</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Weather Proof</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Unlimited storage</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Private & Public Mode</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Easy customization</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-4">Choose Quantity:</h3>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 border-2 border-gray-300 rounded-lg text-center">
                  <div className="font-bold mb-2">BUY 1</div>
                  <div className="relative w-full h-16 mb-2">
                    <Image
                      src="/images/qr-code-gravestone.png"
                      alt="QR Code on Gravestone"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-bold">$49.99</div>
                  <div className="text-gray-500 line-through text-sm">$99.99</div>
                </Card>

                <Card className="p-4 border-2 border-blue-500 rounded-lg text-center relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-xs px-2 py-1 rounded-full">
                    POPULAR
                  </div>
                  <div className="font-bold mb-2">BUY 2</div>
                  <div className="relative w-full h-16 mb-2">
                    <Image
                      src="/images/qr-code-gravestone.png"
                      alt="QR Code on Gravestone"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-bold">$79.98</div>
                  <div className="text-gray-500 line-through text-sm">$199.98</div>
                  <div className="bg-gray-800 text-white text-xs rounded-full py-1 px-2 mt-1">Save 20%</div>
                </Card>

                <Card className="p-4 border-2 border-gray-300 rounded-lg text-center">
                  <div className="font-bold mb-2">BUY 3</div>
                  <div className="relative w-full h-16 mb-2">
                    <Image
                      src="/images/qr-code-gravestone.png"
                      alt="QR Code on Gravestone"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-bold">$112.48</div>
                  <div className="text-gray-500 line-through text-sm">$299.97</div>
                  <div className="bg-gray-800 text-white text-xs rounded-full py-1 px-2 mt-1">Save 25%</div>
                </Card>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-4 mb-8 text-center text-gray-600">
              *Each Memorial Star can be used to create a new memorial page or to link to an existing one.
            </div>

            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 text-lg" asChild>
              <Link href="/checkout">BUY NOW</Link>
            </Button>

            <div className="flex items-center justify-center mt-4 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              Get it between <strong>Apr 21st</strong> and <strong>Apr 23rd</strong>
            </div>

            <div className="mt-8 border-t pt-4">
              <details className="cursor-pointer">
                <summary className="font-medium flex justify-between items-center">
                  How to set it up?
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </summary>
                <div className="mt-2 text-gray-600">
                  <p>Setting up your Memorial QR is simple:</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-2">
                    <li>Purchase your Memorial Star QR code</li>
                    <li>Create your memorial page with photos, videos, and stories</li>
                    <li>Place the weather-resistant QR code on the headstone or memorial</li>
                    <li>Share the unique link with family and friends</li>
                  </ol>
                </div>
              </details>
            </div>
          </div>
        </div>
      </main>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <StarRating rating={5} />
                <p className="my-4 italic">
                  "The Memorial QR code has been such a meaningful way to preserve my father's memory. Visitors to his
                  grave can scan the code and see photos, videos, and read stories about his life. It's like his legacy
                  lives on in a digital space."
                </p>
                <div className="font-medium">- Sarah {i === 1 ? "Johnson" : i === 2 ? "Miller" : "Thompson"}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Keep your existing footer links */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Memorial QR</h3>
            <p className="text-gray-400">Preserving memories for generations to come with innovative QR technology.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {/* Replace with your actual footer links */}
              <li>
                <Link href="/memorials" className="text-gray-400 hover:text-white">
                  Memorials
                </Link>
              </li>
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
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Customer Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to receive updates and special offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900"
              />
              <Button className="rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Memorial QR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
