"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  className?: string
}

export function CountdownTimer({ className }: CountdownTimerProps) {
  // Memoize the target date to prevent re-creation on every render
  const targetDate = useMemo(() => {
    const now = new Date()
    const target = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    return target
  }, [])

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    // Set initial time
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={`flex justify-center gap-4 ${className || ""}`}>
      <Card className="bg-white/20 border-white/30">
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
          <div className="text-xs text-white/80">Days</div>
        </CardContent>
      </Card>
      <Card className="bg-white/20 border-white/30">
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
          <div className="text-xs text-white/80">Hours</div>
        </CardContent>
      </Card>
      <Card className="bg-white/20 border-white/30">
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-xs text-white/80">Minutes</div>
        </CardContent>
      </Card>
      <Card className="bg-white/20 border-white/30">
        <CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-xs text-white/80">Seconds</div>
        </CardContent>
      </Card>
    </div>
  )
}

// Add default export
export default CountdownTimer
