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

      // Show CTA after scrolling past the first screen
      if (scrollPosition > windowHeight && !isDismissed) {
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
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-4 max-w-sm">
        <button onClick={() => setIsDismissed(true)} className="absolute top-2 right-2 text-white/70 hover:text-white">
          <X className="w-4 h-4" />
        </button>
        <div className="text-white mb-3">
          <div className="font-semibold">Ready to create a memorial?</div>
          <div className="text-sm text-white/90">Honor their memory today</div>
        </div>
        <Link href="/pricing">
          <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
            <Heart className="w-4 h-4 mr-2" />
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HomepageStickyCTA
