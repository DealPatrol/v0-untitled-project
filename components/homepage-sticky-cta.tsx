"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling past the hero section
      setIsVisible(scrollPosition > windowHeight * 0.8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isDismissed || !isVisible) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="bg-gold-500 text-black rounded-lg shadow-lg p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="font-semibold text-sm">Ready to create a memorial?</p>
            <p className="text-xs opacity-80">Start honoring their memory today</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-black text-white hover:bg-gray-800">
              Create Now
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-black hover:bg-black/10 p-1"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
