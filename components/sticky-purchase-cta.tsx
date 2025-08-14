'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, X, Clock } from 'lucide-react'
import Link from 'next/link'

export default function StickyPurchaseCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show after scrolling past 75% of the first screen
      setIsVisible(scrollPosition > windowHeight * 0.75)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-4 shadow-2xl border-t border-white/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <Badge className="mb-1 bg-white/20 text-white border-white/30 text-xs">
              🔥 SAVE $80 TODAY
            </Badge>
            <div className="flex items-center gap-3">
              <div>
                <div className="text-white/80 line-through text-sm">$199.99</div>
                <div className="text-2xl font-bold">$119.99</div>
              </div>
              <div className="text-sm text-white/90">
                <div className="font-semibold">Complete Memorial Package</div>
                <div>Weather-resistant QR + Lifetime hosting</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-white/90">
            <Clock className="h-4 w-4" />
            <span>Limited time offer</span>
          </div>
          <Link href="/create-profile">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Create Memorial Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-white/80 hover:text-white p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
