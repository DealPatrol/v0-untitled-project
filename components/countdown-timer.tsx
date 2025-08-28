"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  targetDate?: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // If no target date provided, default to 7 days from now
    const target = targetDate ? new Date(targetDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = target.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={cn("flex items-center justify-center space-x-4 text-white", className)}>
      <div className="text-center bg-black/30 rounded-lg p-3 backdrop-blur-sm">
        <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
        <div className="text-sm opacity-75">Days</div>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="text-center bg-black/30 rounded-lg p-3 backdrop-blur-sm">
        <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
        <div className="text-sm opacity-75">Hours</div>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="text-center bg-black/30 rounded-lg p-3 backdrop-blur-sm">
        <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
        <div className="text-sm opacity-75">Minutes</div>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="text-center bg-black/30 rounded-lg p-3 backdrop-blur-sm">
        <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
        <div className="text-sm opacity-75">Seconds</div>
      </div>
    </div>
  )
}
