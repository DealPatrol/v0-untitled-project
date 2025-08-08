"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, ArrowRight, X } from 'lucide-react'

export function StickyPurchaseCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show after scrolling past the pricing section
      if (scrollPosition > windowHeight * 1.5 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 shadow-2xl">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-5 h-5" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">Memorial QR Package</span>
                <Badge className="bg-white/20 text-white text-xs px-2 py-1">
                  40% OFF
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/80 line-through">$199.99</span>
                <span className="font-bold text-lg">$119.99</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              size="sm"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-4 py-2 rounded-full"
              asChild
            >
              <Link href="/create-profile">
                Buy Now
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
            
            <button
              onClick={() => setIsDismissed(true)}
              className="text-white/80 hover:text-white p-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
