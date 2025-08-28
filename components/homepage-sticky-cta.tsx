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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-orange-500 text-white shadow-lg border-t-4 border-orange-600">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">🔥 Limited Time: Save $30 on Memorial Packages</p>
            <p className="text-xs opacity-90">Create a lasting tribute for your loved one today</p>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <Button asChild size="sm" className="bg-white text-orange-500 hover:bg-orange-50 font-semibold">
              <Link href="/create-profile">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 hover:bg-orange-600 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
