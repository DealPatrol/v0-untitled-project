"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-sm">Cookie Consent</h3>
            <button onClick={declineCookies} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            We use cookies to improve your experience and analyze site usage. By continuing, you agree to our cookie
            policy.
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={acceptCookies} className="flex-1">
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={declineCookies} className="flex-1 bg-transparent">
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
