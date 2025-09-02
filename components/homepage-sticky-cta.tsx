"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling down 100vh (one full screen)
      setIsVisible(scrollPosition > windowHeight && !isDismissed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-orange-600 text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-4 max-w-sm">
        <div className="flex-1">
          <div className="font-semibold text-sm">Special Offer</div>
          <div className="text-xs opacity-90">Memorial Plaque - $119.99</div>
        </div>
        <Button asChild size="sm" className="bg-white text-orange-600 hover:bg-gray-100 rounded-full">
          <Link href="/pricing">
            Order Now
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
