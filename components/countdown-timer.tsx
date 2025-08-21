"use client"

import { useState, useEffect } from "react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to 7 days from now
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

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
  }, [])

  return (
    <div className="flex justify-center gap-4 mb-6">
      <div className="text-center">
        <div className="bg-red-600 text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Days</div>
      </div>
      <div className="text-center">
        <div className="bg-red-600 text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Hours</div>
      </div>
      <div className="text-center">
        <div className="bg-red-600 text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Minutes</div>
      </div>
      <div className="text-center">
        <div className="bg-red-600 text-white rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">Seconds</div>
      </div>
    </div>
  )
}
