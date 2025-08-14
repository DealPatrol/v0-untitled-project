"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"

const AnalyticsContext = createContext({})

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize analytics here if needed
    console.log("Analytics initialized")
  }, [])

  return <AnalyticsContext.Provider value={{}}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}
