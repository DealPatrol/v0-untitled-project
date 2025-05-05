"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function StickyPurchaseCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show the sticky header after scrolling past 300px
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 300)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check in case page is loaded scrolled down
    handleScroll()

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 border-b border-rose-100",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-serif text-rose-800 mr-2">MEMORIAL</span>
          <span className="text-xl text-yellow-400">★</span>
          <span className="text-xl font-serif text-rose-800 ml-1">QR</span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <div className="text-rose-800 font-medium">
            <span className="text-sm">Starting at </span>
            <span className="text-xl">$79.99</span>
          </div>
          <Link href="/checkout?plan=premium">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white">Buy Now</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Link href="/checkout?plan=premium">
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
