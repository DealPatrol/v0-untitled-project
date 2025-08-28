"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  targetDate?: Date
  title?: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, title = "Limited Time Offer", className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  // Memoize the target date to prevent infinite re-renders
  const finalTargetDate = useMemo(() => {
    if (targetDate) {
      return targetDate
    }
    // Default to 7 days from now if no targetDate provided
    const defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 7)
    return defaultDate
  }, [targetDate])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calculateTimeLeft = () => {
      const difference = finalTargetDate.getTime() - new Date().getTime()

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

    // Calculate immediately
    calculateTimeLeft()

    // Set up interval
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [mounted, finalTargetDate])

  if (!mounted) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="bg-red-600 text-white rounded-lg p-3 mb-2">
                    <div className="text-2xl font-bold">--</div>
                  </div>
                  <div className="text-sm text-gray-600">Loading</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
          {isExpired ? (
            <div className="text-red-600 font-bold text-xl">Offer Expired!</div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-red-600 text-white rounded-lg p-3 mb-2 shadow-lg">
                  <div className="text-2xl font-bold tabular-nums">{timeLeft.days.toString().padStart(2, "0")}</div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Days</div>
              </div>
              <div className="text-center">
                <div className="bg-red-600 text-white rounded-lg p-3 mb-2 shadow-lg">
                  <div className="text-2xl font-bold tabular-nums">{timeLeft.hours.toString().padStart(2, "0")}</div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Hours</div>
              </div>
              <div className="text-center">
                <div className="bg-red-600 text-white rounded-lg p-3 mb-2 shadow-lg">
                  <div className="text-2xl font-bold tabular-nums">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Minutes</div>
              </div>
              <div className="text-center">
                <div className="bg-red-600 text-white rounded-lg p-3 mb-2 shadow-lg">
                  <div className="text-2xl font-bold tabular-nums">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Seconds</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Named export for compatibility
export { CountdownTimer as default }
