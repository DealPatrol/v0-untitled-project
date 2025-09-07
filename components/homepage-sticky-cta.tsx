"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling down 50% of viewport height
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      } else if (scrollPosition <= windowHeight * 0.5) {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-sm mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-4">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 text-white/80 hover:text-white"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pr-6">
          <p className="font-semibold mb-2">🔥 Limited Time: Save $50!</p>
          <p className="text-sm text-purple-100 mb-3">Create your memorial today</p>
          <Button asChild size="sm" className="bg-white text-purple-600 hover:bg-gray-100 w-full">
            <Link href="/pricing">
              Get Started - $149
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
