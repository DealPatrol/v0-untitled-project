"use client"

import { useCallback } from "react"

interface AnalyticsEvent {
  name: string
  data?: Record<string, any>
  timestamp?: string
}

interface AnalyticsConfig {
  batchSize?: number
  flushInterval?: number
  enableDebug?: boolean
}

class AnalyticsManager {
  private events: AnalyticsEvent[] = []
  private config: AnalyticsConfig
  private flushTimer: NodeJS.Timeout | null = null

  constructor(config: AnalyticsConfig = {}) {
    this.config = {
      batchSize: 10,
      flushInterval: 5000,
      enableDebug: true,
      ...config,
    }

    // Auto-flush events periodically
    this.startAutoFlush()
  }

  private startAutoFlush() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
    }

    this.flushTimer = setInterval(() => {
      this.flush()
    }, this.config.flushInterval)
  }

  track(name: string, data?: Record<string, any>) {
    try {
      const event: AnalyticsEvent = {
        name,
        data: {
          ...data,
          page: typeof window !== "undefined" ? window.location.pathname : "/",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          url: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
        timestamp: new Date().toISOString(),
      }

      this.events.push(event)

      if (this.config.enableDebug) {
        console.log("📊 Analytics Event:", event)
      }

      // Auto-flush if batch size reached
      if (this.events.length >= (this.config.batchSize || 10)) {
        this.flush()
      }
    } catch (error) {
      console.error("Analytics tracking error:", error)
    }
  }

  async flush() {
    if (this.events.length === 0) return

    const eventsToSend = [...this.events]
    this.events = []

    try {
      if (typeof window !== "undefined") {
        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ events: eventsToSend }),
        })
      }
    } catch (error) {
      console.error("Failed to send analytics events:", error)
      // Re-add events back to queue on failure
      this.events.unshift(...eventsToSend)
    }
  }

  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }
    this.flush() // Final flush
  }
}

// Global analytics instance
let analyticsManager: AnalyticsManager | null = null

function getAnalyticsManager(): AnalyticsManager {
  if (!analyticsManager) {
    analyticsManager = new AnalyticsManager()
  }
  return analyticsManager
}

export function useAnalytics() {
  const trackEvent = async (eventName: string, data: any) => {
    try {
      // In a real implementation, this would send to your analytics service
      console.log("Analytics Event:", eventName, data)

      // Example: Send to Google Analytics, Mixpanel, etc.
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", eventName, data)
      }
    } catch (error) {
      console.error("Analytics tracking failed:", error)
    }
  }

  const trackPageView = useCallback((page?: string) => {
    try {
      const manager = getAnalyticsManager()
      manager.track("page_view", { page })
    } catch (error) {
      console.error("useAnalytics trackPageView error:", error)
    }
  }, [])

  const flush = useCallback(() => {
    try {
      const manager = getAnalyticsManager()
      manager.flush()
    } catch (error) {
      console.error("useAnalytics flush error:", error)
    }
  }, [])

  return {
    trackEvent,
    trackPageView,
    flush,
  }
}

// Cleanup on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    if (analyticsManager) {
      analyticsManager.destroy()
    }
  })
}
