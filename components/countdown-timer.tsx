"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center gap-4">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{timeLeft.days}</div>
          <div className="text-sm text-gray-600">Days</div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{timeLeft.hours}</div>
          <div className="text-sm text-gray-600">Hours</div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{timeLeft.minutes}</div>
          <div className="text-sm text-gray-600">Minutes</div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{timeLeft.seconds}</div>
          <div className="text-sm text-gray-600">Seconds</div>
        </CardContent>
      </Card>
    </div>
  )
}

// Named export for compatibility
export { CountdownTimer as default }
