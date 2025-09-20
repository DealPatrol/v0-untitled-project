"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 transition-all duration-300",
        "md:left-auto md:right-4 md:max-w-sm",
      )}
    >
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-4">
        <button onClick={() => setIsDismissed(true)} className="absolute top-2 right-2 text-white/80 hover:text-white">
          <X className="h-4 w-4" />
        </button>

        <div className="pr-6">
          <h3 className="font-semibold mb-1">Ready to get started?</h3>
          <p className="text-sm text-white/90 mb-3">Create a beautiful memorial in minutes</p>

          <Link href="/create-memorial">
            <Button size="sm" className="bg-white text-purple-600 hover:bg-gray-100 w-full">
              Create Memorial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
