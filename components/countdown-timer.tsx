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
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-center mb-2">
        <Clock className="h-4 w-4 text-red-600 mr-2" />
        <span className="text-sm font-medium text-red-800">Limited Time Offer Ends In:</span>
      </div>

      <div className="flex justify-center space-x-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm border">
              <div className="text-lg font-bold text-red-600">{value.toString().padStart(2, "0")}</div>
            </div>
            <div className="text-xs text-red-600 mt-1 capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
