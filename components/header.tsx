"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, QrCode } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <QrCode className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: "cursive" }}>
              Memorial QR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-gray-600 hover:text-orange-600 transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-orange-600 transition-colors">
              Pricing
            </Link>
            <Link href="/memorials" className="text-gray-600 hover:text-orange-600 transition-colors">
              Browse Memorials
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-orange-600 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
              <Link href="/pricing">Create Memorial</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <Link
                href="/how-it-works"
                className="text-gray-600 hover:text-orange-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-orange-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/memorials"
                className="text-gray-600 hover:text-orange-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Memorials
              </Link>
              <Link
                href="/faq"
                className="text-gray-600 hover:text-orange-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-orange-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white mt-4">
                <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
                  Create Memorial
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
