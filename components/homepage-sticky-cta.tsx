"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling 50% of viewport height
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      } else if (scrollPosition <= windowHeight * 0.5) {
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

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t sticky-cta-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Ready to honor your loved one?</p>
            <p className="text-sm text-gray-600">Create a beautiful memorial in minutes</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
              <Link href="/create-memorial">
                Create Memorial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
