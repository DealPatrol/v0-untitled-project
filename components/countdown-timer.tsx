"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  targetDate?: Date
  className?: string
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set default target date to 7 days from now if not provided
    const target = targetDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const calculateTimeLeft = () => {
      const difference = target.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calculate initial time
    calculateTimeLeft()

    // Set up interval
    const timer = setInterval(calculateTimeLeft, 1000)

    // Cleanup interval on unmount
    return () => clearInterval(timer)
  }, [targetDate]) // Only depend on targetDate, not the calculated values

  return (
    <div className={className}>
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-900 mb-2">⏰ Limited Time Offer Ends In:</p>
      </div>

      <div className="flex justify-center gap-4">
        <Card className="bg-white border-2 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-orange-600">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600 font-medium">Days</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-orange-600">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600 font-medium">Hours</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-orange-600">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600 font-medium">Minutes</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-orange-600">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600 font-medium">Seconds</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
