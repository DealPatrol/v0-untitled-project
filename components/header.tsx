"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Cursive Font */}
          <Link href="/" className="flex items-center">
            <span
              className="text-3xl font-bold text-gray-800 relative"
              style={{
                fontFamily: "'Parisienne', cursive",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Memorial{" "}
              <span
                className="text-blue-600"
                style={{
                  transform: "rotate(-3deg)",
                  display: "inline-block",
                }}
              >
                QR
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">
              Pricing
            </Link>
            <Link href="/browse-memorials" className="text-gray-700 hover:text-purple-600 transition-colors">
              Browse Memorials
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-purple-600 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/pricing">Create Memorial</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/how-it-works"
                className="text-gray-700 hover:text-purple-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-purple-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/browse-memorials"
                className="text-gray-700 hover:text-purple-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Memorials
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-purple-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-purple-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 mx-2"
              >
                <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
                  Create Memorial
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
