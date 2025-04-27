"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page view
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Simple analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-XXXXXXXXXX", {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
