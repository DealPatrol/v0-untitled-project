interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
}

export function trackEvent({ event, properties }: AnalyticsEvent) {
  // In a real app, this would send to your analytics service
  if (typeof window !== "undefined") {
    console.log("Analytics Event:", { event, properties })

    // Example: Send to Google Analytics
    if (window.gtag) {
      window.gtag("event", event, properties)
    }

    // Example: Send to custom analytics endpoint
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event, properties }),
    }).catch(console.error)
  }
}

export function trackPageView(url: string) {
  trackEvent({
    event: "page_view",
    properties: { page_url: url },
  })
}

export function trackMemorialCreated(memorialId: string) {
  trackEvent({
    event: "memorial_created",
    properties: { memorial_id: memorialId },
  })
}

export function trackQRCodeGenerated(memorialId: string) {
  trackEvent({
    event: "qr_code_generated",
    properties: { memorial_id: memorialId },
  })
}

export function trackMemorialVisit(memorialId: string) {
  trackEvent({
    event: "memorial_visit",
    properties: { memorial_id: memorialId },
  })
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
