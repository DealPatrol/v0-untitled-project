"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling 50% of viewport height
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (isDismissed) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 sticky-cta-slide-up ${isVisible ? "show" : ""}`}>
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Ready to Honor Your Loved One?</h3>
            <p className="text-blue-100 text-sm">Create a beautiful digital memorial in minutes</p>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/create-memorial">Create Memorial</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDismiss} className="text-white hover:bg-blue-700">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
