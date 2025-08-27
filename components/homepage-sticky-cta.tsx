"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ArrowRight } from 'lucide-react'
import Link from "next/link"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show after scrolling 50% of viewport height
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <div className="font-bold text-lg">Don't Miss Out!</div>
            <div className="text-sm opacity-90">Create your memorial today - Limited time $119.99</div>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild size="sm" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold">
              <Link href="/create-profile">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <button
              onClick={() => setIsDismissed(true)}
              className="text-white hover:text-gray-200 transition-colors"
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
