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

      // Show CTA after scrolling past the first screen
      setIsVisible(scrollPosition > windowHeight && !isDismissed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 relative">
        <button onClick={() => setIsDismissed(true)} className="absolute top-2 right-2 text-white/80 hover:text-white">
          <X className="h-4 w-4" />
        </button>

        <div className="pr-6">
          <h3 className="font-semibold mb-2">Ready to Create a Memorial?</h3>
          <p className="text-sm text-blue-100 mb-3">
            Start preserving precious memories today with our easy-to-use platform.
          </p>
          <Button variant="secondary" size="sm" className="w-full" asChild>
            <Link href="/create-memorial">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
