"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, X } from 'lucide-react'

export function HomepageStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show after scrolling past the first screen
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
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
    <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white p-4 shadow-2xl">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Badge className="bg-white/20 text-white text-xs px-2 py-1">
                  LIMITED TIME
                </Badge>
                <span className="font-bold text-lg">Save $80 Today!</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/80 line-through text-sm">$199.99</span>
                <span className="text-2xl font-bold">$119.99</span>
                <span className="text-white/80 text-sm">one-time</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              size="lg"
              className="bg-white text-rose-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-full shadow-lg"
              asChild
            >
              <Link href="/create-profile">
                Create Memorial Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <button
              onClick={() => setIsDismissed(true)}
              className="text-white/80 hover:text-white p-2"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
