"use client"

import type React from "react"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Track initial page view
    trackPageView()

    // Track route changes
    const handleRouteChange = () => {
      trackPageView()
    }

    // Listen for navigation events
    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return <>{children}</>
}
