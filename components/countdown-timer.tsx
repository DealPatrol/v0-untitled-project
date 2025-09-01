"use client"

import { useState, useEffect, useMemo } from "react"

interface CountdownTimerProps {
  targetDate?: string
  className?: string
}

export function CountdownTimer({ targetDate = "2024-12-31T23:59:59", className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Use useMemo to create a stable target date
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [target])

  return (
    <div className={`flex space-x-4 ${className}`}>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">{timeLeft.days}</div>
        <div className="text-sm text-gray-600">Days</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">{timeLeft.hours}</div>
        <div className="text-sm text-gray-600">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">{timeLeft.minutes}</div>
        <div className="text-sm text-gray-600">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">{timeLeft.seconds}</div>
        <div className="text-sm text-gray-600">Seconds</div>
      </div>
    </div>
  )
}

export default CountdownTimer
