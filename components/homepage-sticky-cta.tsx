"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling past the first screen
      setIsVisible(scrollPosition > windowHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  if (isDismissed || !isVisible) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="font-semibold text-lg">🔥 Limited Time: Save 60% on Memorial QR Codes</p>
              <p className="text-sm opacity-90">
                Only <span className="font-bold">$119.99</span> (was $299.99)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <Button variant="secondary" size="sm" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold">
              Claim Discount
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
