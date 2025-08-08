"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, QrCode } from 'lucide-react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-rose-600 transition-colors"
          >
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <QrCode className="h-5 w-5 text-white" />
            </div>
            Memorial QR
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/memorial/sample" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Sample Memorial
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/create-profile">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                Buy Now - $119.99
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/how-it-works"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/memorial/sample"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sample Memorial
              </Link>
              <Link
                href="/faq"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link href="/create-profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full">
                    Buy Now - $119.99
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
