"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QrCode, Menu, X, Heart, Star, Shield } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-purple-600" />
            <span className="memorial-logo text-2xl md:text-3xl">Memorial QR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">
              How It Works
            </Link>
            <Link
              href="/qr-generator"
              className="text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-1"
            >
              <QrCode className="h-4 w-4" />
              <span>QR Generator</span>
            </Link>
            <Link href="/browse-memorials" className="text-gray-700 hover:text-purple-600 transition-colors">
              Browse Memorials
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">
              Pricing
            </Link>
            <Link href="/our-story" className="text-gray-700 hover:text-purple-600 transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>4.9/5 Rating</span>
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure</span>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/pricing">Create Memorial</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/how-it-works"
                className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/qr-generator"
                className="text-gray-700 hover:text-purple-600 transition-colors py-2 flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <QrCode className="h-4 w-4" />
                <span>QR Generator</span>
              </Link>
              <Link
                href="/browse-memorials"
                className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Memorials
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/our-story"
                className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
                    Create Memorial
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
