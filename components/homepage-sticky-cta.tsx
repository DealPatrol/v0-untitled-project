"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HomepageStickyHeader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show the sticky header after scrolling past the hero section
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 700)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="flex items-center">
              <span className="text-xl font-serif text-rose-800 mr-2">MEMORIAL</span>
              <span className="text-xl text-yellow-400">★</span>
              <span className="text-xl font-serif text-rose-800 ml-1">QR</span>
            </div>
            <div className="hidden md:block ml-4 text-sm text-rose-700">
              Preserve memories forever with QR memorial stones
            </div>
          </div>

          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="text-center md:text-right">
              <div className="text-sm text-rose-700">Limited Time Offer</div>
              <div className="font-medium text-rose-800">
                <span className="line-through text-rose-400 mr-2">$99.99</span>
                <span className="text-lg">$79.99</span>
              </div>
            </div>
            <Link href="/checkout?plan=premium&source=sticky-header">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white whitespace-nowrap">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
