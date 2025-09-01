"use client"

import { useState, useEffect, useMemo } from "react"

interface CountdownTimerProps {
  targetDate?: Date
  className?: string
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  // Use useMemo to create a stable target date to prevent infinite re-renders
  const stableTargetDate = useMemo(() => {
    if (targetDate) return targetDate
    // Default to 30 days from now
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = stableTargetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [stableTargetDate])

  return (
    <div className={`flex space-x-4 ${className}`}>
      <div className="text-center">
        <div className="bg-purple-600 text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Days</div>
      </div>
      <div className="text-center">
        <div className="bg-purple-600 text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Hours</div>
      </div>
      <div className="text-center">
        <div className="bg-purple-600 text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Minutes</div>
      </div>
      <div className="text-center">
        <div className="bg-purple-600 text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Seconds</div>
      </div>
    </div>
  )
}

export default CountdownTimer
