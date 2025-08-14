"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, X } from "lucide-react"
import Link from "next/link"

export default function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show after scrolling past the first screen
      setIsVisible(scrollPosition > windowHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg shadow-2xl border border-white/20">
        <button onClick={() => setIsDismissed(true)} className="absolute top-2 right-2 text-white/80 hover:text-white">
          <X className="h-4 w-4" />
        </button>

        <div className="pr-6">
          <Badge className="mb-2 bg-white/20 text-white border-white/30 text-xs">🔥 LIMITED TIME</Badge>
          <div className="mb-2">
            <div className="text-white/80 line-through text-sm">$199.99</div>
            <div className="text-2xl font-bold">$119.99</div>
          </div>
          <p className="text-sm text-white/90 mb-3">Create a lasting memorial with weather-resistant QR plaque</p>
          <Link href="/create-profile">
            <Button size="sm" className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold">
              Create Memorial Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
