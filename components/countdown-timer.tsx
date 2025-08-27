"use client"

import { useState, useEffect, useMemo } from "react"

interface CountdownTimerProps {
  targetDate?: Date | string
  title?: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, title = "Limited Time Offer", className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  // Memoize the final target date to prevent infinite loops
  const finalTargetDate = useMemo(() => {
    if (targetDate) {
      return typeof targetDate === "string" ? new Date(targetDate) : targetDate
    }
    // Default to 7 days from now
    const defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 7)
    return defaultDate
  }, [targetDate])

  const calculateTimeLeft = useMemo(() => {
    return (): TimeLeft => {
      const now = new Date().getTime()
      const target = finalTargetDate.getTime()
      const difference = target - now

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
  }, [finalTargetDate])

  useEffect(() => {
    setMounted(true)

    if (!mounted) return

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Set initial time
    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [mounted, calculateTimeLeft])

  if (!mounted) {
    return (
      <div className={`bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg text-center ${className}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex justify-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold">--</div>
            <div className="text-sm">Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">--</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">--</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">--</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg text-center ${className}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
          <div className="text-sm">Days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
          <div className="text-sm">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
          <div className="text-sm">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
          <div className="text-sm">Seconds</div>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
