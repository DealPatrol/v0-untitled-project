"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
  onComplete?: () => void
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        onComplete?.()
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  return (
    <div className="flex space-x-4 text-center">
      <div className="bg-white rounded-lg p-3 shadow-md">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.days}</div>
        <div className="text-sm text-gray-600">Days</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-md">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
        <div className="text-sm text-gray-600">Hours</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-md">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
        <div className="text-sm text-gray-600">Minutes</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-md">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
        <div className="text-sm text-gray-600">Seconds</div>
      </div>
    </div>
  )
}
