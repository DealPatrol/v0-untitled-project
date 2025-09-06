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
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center items-center space-x-4 text-center">
      <div className="bg-white rounded-lg p-3 shadow-md min-w-[60px]">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.days}</div>
        <div className="text-xs text-gray-600 uppercase">Days</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-md min-w-[60px]">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
        <div className="text-xs text-gray-600 uppercase">Hours</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-md min-w-[60px]">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
        <div className="text-xs text-gray-600 uppercase">Minutes</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-md min-w-[60px]">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
        <div className="text-xs text-gray-600 uppercase">Seconds</div>
      </div>
    </div>
  )
}
