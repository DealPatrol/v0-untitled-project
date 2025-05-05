"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { useEffect, useState } from "react"
import { SafeImage } from "@/components/safe-image"

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show the sticky header after scrolling past the hero section
      const scrollPosition = window.scrollY
      setIsHeaderVisible(scrollPosition > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header for Homepage */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-2 md:mb-0">
              <div className="flex items-center">
                <span className="text-xl font-serif text-rose-800 mr-2">MEMORIAL</span>
                <span className="text-xl text-yellow-400">★</span>
                <span className="text-xl font-serif text-rose-800 ml-1">QR</span>
              </div>
              <div className="hidden md:block ml-4 text-sm text-rose-700">
                Preserve memories forever with QR memorial stones
              </div>
            </div>

            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="text-center md:text-right">
                <div className="text-sm text-rose-700">Limited Time Offer</div>
                <div className="font-medium text-rose-800">
                  <span className="line-through text-rose-400 mr-2">$99.99</span>
                  <span className="text-lg">$79.99</span>
                </div>
              </div>
              <Link href="/checkout?plan=premium&source=sticky-header">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white whitespace-nowrap">Get Started Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background Image - Using your own image */}
        <div className="absolute inset-0">
          <SafeImage
            src="/images/memorial-1.jpg" // Using your existing image
            alt="Memorial garden"
            fill
            className="object-cover"
            priority
            quality={100}
            fallbackSrc="/placeholder.svg?height=1200&width=1800&text=Memorial+Garden"
          />
          <div className="absolute inset-0 bg-black/50"></div> {/* Darkened overlay for better contrast */}
        </div>

        {/* Center Content - Your own branding */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wider">
              MEMORIAL
              <span className="text-yellow-400 mx-2">★</span>
              QR
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white font-light mb-12">Preserving memories for generations</p>

          {/* Highlighted container for buttons */}
          <div className="bg-black/30 p-6 rounded-lg mb-8 max-w-2xl w-full">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/memorials"
                className="bg-white hover:bg-gray-100 text-rose-900 text-xl font-bold py-6 px-8 rounded-lg shadow-lg border-4 border-yellow-400 transition-transform hover:scale-105 flex-1 text-center"
              >
                Browse Memorials
              </Link>
              <Link
                href="/pricing"
                className="bg-white hover:bg-gray-100 text-rose-900 text-xl font-bold py-6 px-8 rounded-lg shadow-lg border-4 border-yellow-400 transition-transform hover:scale-105 flex-1 text-center"
              >
                Our Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial and Product Section - Using your own testimonials */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Testimonial - Original content */}
          <div className="text-center md:text-left">
            <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-6">
              "Creating a memorial for my grandmother was a healing experience. The QR code on her headstone allows
              visitors to see her photos and read stories about her remarkable life. It's like she's still with us."
            </blockquote>
            <p className="font-bold text-xl mb-4">Michael R. - Verified Customer</p>
            <div className="flex justify-center md:justify-start mb-2">
              <StarRating rating={4.8} />
            </div>
            <p className="text-gray-600">Based on our customer feedback</p>
          </div>

          {/* Product Image - Your own product */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
              <div className="flex justify-center mb-6">
                <SafeImage
                  src="/images/memorial-star.jpg"
                  alt="Memorial QR Product"
                  width={250}
                  height={250}
                  className="rounded-lg"
                  fallbackSrc="/placeholder.svg?height=250&width=250&text=Memorial+Star"
                />
              </div>
              <h3 className="text-2xl font-bold text-center text-rose-900 mb-4">Memorial QR Code</h3>
              <p className="text-gray-700 text-center mb-6">Preserve memories that last generations</p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/products/memorial-star"
                  className="bg-rose-600 hover:bg-rose-700 text-white text-center py-3 font-medium rounded-md"
                >
                  Learn About Memorial Star
                </Link>
                <Link
                  href="/how-it-works"
                  className="bg-rose-600 hover:bg-rose-700 text-white text-center py-3 font-medium rounded-md"
                >
                  How It Works
                </Link>
                <Link
                  href="/checkout"
                  className="bg-yellow-500 hover:bg-yellow-600 text-rose-900 text-center py-3 font-medium rounded-md"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Your own features */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Why Choose Memorial QR?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-white"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">One-Time Payment</h3>
              <p className="text-gray-600">
                No subscriptions or hidden fees. Your memorial page is hosted for a lifetime.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-white"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Weather-Resistant</h3>
              <p className="text-gray-600">Our QR codes are designed to withstand the elements for decades to come.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-white"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Family Tree</h3>
              <p className="text-gray-600">
                Create a digital family tree to preserve your family's history and connections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">How Memorial QR Works</h2>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Purchase</h3>
            <p className="text-gray-600">Select a Memorial QR package that fits your needs.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Customize</h3>
            <p className="text-gray-600">Add photos, videos, stories, and create a family tree.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Install</h3>
            <p className="text-gray-600">Place your durable QR code on the memorial or headstone.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              4
            </div>
            <h3 className="text-xl font-bold mb-2">Connect</h3>
            <p className="text-gray-600">Visitors scan the code to view and add to the memorial.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg" asChild>
            <Link href="/how-it-works">See Detailed Guide</Link>
          </Button>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Memorial QR Packages</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Premium Plan */}
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-serif mb-2">Premium</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">$79.99</span>
                  <span className="text-gray-500 ml-2">one-time</span>
                </div>
                <p className="text-gray-600">Perfect for a simple memorial tribute.</p>
                <Button className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white" asChild>
                  <Link href="/checkout?plan=premium&action=buy">Buy Now</Link>
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>1 QR code for headstone or memorial</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Up to 20 photos</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>1 video upload</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>5 years of hosting included</span>
                </div>
              </div>
            </div>

            {/* Deluxe Plan */}
            <div className="border-2 border-blue-500 rounded-xl overflow-hidden shadow-lg relative bg-white">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="p-6 border-b bg-blue-50">
                <h3 className="text-2xl font-serif mb-2">Deluxe</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">$99.99</span>
                  <span className="text-gray-500 ml-2">one-time</span>
                </div>
                <p className="text-gray-600">Our most popular comprehensive memorial package.</p>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/checkout?plan=deluxe&action=buy">Buy Now</Link>
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>1 Weather-resistant QR code</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Unlimited photos</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Up to 5 video uploads</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Family tree feature</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Lifetime hosting included</span>
                </div>
              </div>
            </div>

            {/* Legacy Plan */}
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <div className="p-6 border-b bg-rose-50">
                <h3 className="text-2xl font-serif mb-2">Legacy</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">$249.99</span>
                  <span className="text-gray-500 ml-2">one-time</span>
                </div>
                <p className="text-gray-600">Full-service memorial creation by our team.</p>
                <Button className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white" asChild>
                  <Link href="/checkout?plan=legacy&action=buy">Buy Now</Link>
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>We create the memorial page for you</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Simply email us your photos and information</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>3 Premium QR codes (different designs)</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Professional biography writing</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Lifetime hosting & premium support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg" asChild>
              <Link href="/pricing">View Full Pricing Details</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* AI Tools Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">AI-Powered Memorial Tools</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                className="text-white"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Biography Writer</h3>
            <p className="text-gray-600 mb-4">
              Our AI helps you craft beautiful life stories with just a few key details.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/ai-tools?tab=biography">Try It</Link>
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                className="text-white"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Photo Restoration</h3>
            <p className="text-gray-600 mb-4">Restore and enhance old or damaged photos with our AI technology.</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/ai-tools?tab=photo">Try It</Link>
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                className="text-white"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Grief Support</h3>
            <p className="text-gray-600 mb-4">Access personalized coping strategies and support resources.</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/ai-tools?tab=support">Try It</Link>
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg" asChild>
            <Link href="/ai-tools">Explore All AI Tools</Link>
          </Button>
        </div>
      </div>

      {/* CTA Section - Your own call to action */}
      <div className="bg-rose-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Create a Lasting Digital Memorial</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Memorial QR codes help you preserve memories, share stories, and connect generations.
          </p>
          <Button
            className="bg-white hover:bg-gray-100 text-rose-900 border-2 border-yellow-500 px-8 py-3 text-lg font-bold"
            asChild
          >
            <Link href="/checkout">Get Your Memorial QR</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
