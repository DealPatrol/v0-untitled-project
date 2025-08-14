"use client"

import { useEffect } from "react"

export function ErrorTracker() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error)
      // Track error here
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason)
      // Track error here
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  return null
}
