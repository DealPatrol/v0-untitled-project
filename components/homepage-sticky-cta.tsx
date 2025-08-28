"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 50% of viewport height
      const scrolled = window.scrollY > window.innerHeight * 0.5
      setIsVisible(scrolled && !isDismissed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-orange-600 text-white p-4 rounded-lg shadow-lg border border-orange-700">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pr-6">
          <h3 className="font-semibold text-lg mb-2">🎯 Special Launch Price</h3>
          <p className="text-sm mb-3 opacity-90">
            Get your memorial QR code for just <span className="font-bold">$119.99</span>
          </p>

          <Button asChild className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold">
            <Link href="/create-profile">Create Memorial Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
