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
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show after scrolling 50% of viewport height
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "sticky-cta-visible" : "sticky-cta-hidden"
      }`}
    >
      <div className="bg-yellow-600 text-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-semibold text-sm">Ready to create a memorial?</p>
            <p className="text-xs text-yellow-100">Start preserving memories today</p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Button asChild size="sm" className="bg-white text-yellow-600 hover:bg-gray-100">
              <Link href="/create-memorial">Create Now</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDismissed(true)}
              className="text-white hover:bg-yellow-700 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
