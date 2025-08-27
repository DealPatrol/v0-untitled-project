"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import Link from "next/link"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show CTA when user has scrolled 50% of the page
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight)

      if (scrollPercentage > 0.5 && !isDismissed) {
        setIsVisible(true)
      } else if (scrollPercentage <= 0.5) {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-2xl p-4 border border-blue-500">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-6">
          <h3 className="font-bold text-lg mb-2">🎉 Limited Time Offer</h3>
          <p className="text-sm text-blue-100 mb-3">Create a beautiful memorial page for just $119.99 (Save $80!)</p>

          <Button asChild size="sm" className="w-full bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/create-profile">
              <Heart className="mr-2 h-4 w-4" />
              Create Memorial Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
