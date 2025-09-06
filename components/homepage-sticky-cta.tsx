"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"
import Link from "next/link"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling down 50% of viewport height
      setIsVisible(scrollPosition > windowHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isDismissed || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 border border-blue-700">
        <button onClick={() => setIsDismissed(true)} className="absolute top-2 right-2 text-white/80 hover:text-white">
          <X className="w-4 h-4" />
        </button>

        <div className="pr-6">
          <h3 className="font-semibold mb-2">Ready to Create a Memorial?</h3>
          <p className="text-sm text-blue-100 mb-3">Honor your loved one with a beautiful digital memorial plaque.</p>
          <Button asChild size="sm" className="bg-white text-blue-600 hover:bg-gray-100 w-full">
            <Link href="/pricing">
              Get Started - $149
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
