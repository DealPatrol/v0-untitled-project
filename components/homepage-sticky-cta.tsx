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

      // Show CTA after scrolling down 50% of viewport height
      setIsVisible(scrollPosition > windowHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl border-t-4 border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-semibold text-lg mb-1">Ready to Create a Memorial?</p>
            <p className="text-purple-100 text-sm">Complete package for just $149 - Limited time offer!</p>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6">
              <Link href="/checkout">
                Get Started - $149
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDismissed(true)}
              className="text-white hover:bg-white/10 p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
