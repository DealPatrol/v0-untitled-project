"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px
      const shouldShow = window.scrollY > 500
      setIsVisible(shouldShow && !isDismissed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 transition-all duration-300",
        "md:left-auto md:right-4 md:max-w-sm",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="bg-orange-500 text-white rounded-lg shadow-lg p-4 relative">
        <button onClick={handleDismiss} className="absolute top-2 right-2 text-white/80 hover:text-white">
          <X className="h-4 w-4" />
        </button>

        <div className="pr-6">
          <h3 className="font-semibold mb-2">Create a Memorial Today</h3>
          <p className="text-sm text-orange-100 mb-3">Honor their memory with a lasting digital tribute</p>
          <Button asChild size="sm" variant="secondary" className="w-full bg-white text-orange-500 hover:bg-orange-50">
            <Link href="/checkout">
              <Heart className="mr-2 h-4 w-4" />
              Start Now - $119.99
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
