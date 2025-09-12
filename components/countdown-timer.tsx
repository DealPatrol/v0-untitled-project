"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to end of current month
    const now = new Date()
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endOfMonth.getTime() - now

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
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-yellow-400" />
        <span className="text-yellow-400 font-semibold">Limited Time Offer</span>
      </div>

      <div className="flex justify-center gap-4 text-white">
        <div className="text-center">
          <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.days}</div>
          </div>
          <div className="text-sm mt-1">Days</div>
        </div>
        <div className="text-center">
          <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.hours}</div>
          </div>
          <div className="text-sm mt-1">Hours</div>
        </div>
        <div className="text-center">
          <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          </div>
          <div className="text-sm mt-1">Minutes</div>
        </div>
        <div className="text-center">
          <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          </div>
          <div className="text-sm mt-1">Seconds</div>
        </div>
      </div>

      <p className="text-purple-200 mt-4">Get your memorial package at this special price before it expires!</p>
    </div>
  )
}
