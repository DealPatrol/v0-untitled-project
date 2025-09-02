"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import Link from "next/link"

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const shouldShow = scrollPosition > 800 && !isDismissed
      setIsVisible(shouldShow)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
      <div className="bg-purple-600 text-white rounded-lg shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Heart className="w-5 h-5" />
          <div>
            <div className="font-semibold text-sm">Create Memorial</div>
            <div className="text-xs opacity-90">Starting at $149</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/pricing">
            <Button size="sm" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Now
            </Button>
          </Link>
          <button onClick={() => setIsDismissed(true)} className="p-1 hover:bg-purple-700 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
