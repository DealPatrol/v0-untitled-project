"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background Image - Using your own image */}
        <div className="absolute inset-0">
          <Image
            src="/images/memorial-1.jpg" // Using your existing image
            alt="Memorial garden"
            fill
            className="object-cover"
            priority
            quality={100}
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
                <Image
                  src="/images/memorial-star.jpg"
                  alt="Memorial QR Product"
                  width={250}
                  height={250}
                  className="rounded-lg"
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
