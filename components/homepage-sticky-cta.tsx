"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show CTA when user has scrolled down 50% of the viewport height
      if (window.pageYOffset > window.innerHeight * 0.5) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white shadow-lg rounded-full px-6 py-3 border border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Ready to create a memorial?</span>
          <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/pricing">Get Started - $149</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomepageStickyCTA
