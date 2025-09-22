export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

export function trackEvent(event: AnalyticsEvent) {
  // In a real app, this would send to your analytics service
  console.log("Analytics Event:", event)

  // Example: Send to Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", event.name, event.properties)
  }
}

export function trackPageView(url: string) {
  trackEvent({
    name: "page_view",
    properties: {
      page_location: url,
    },
  })
}

export function trackMemorialView(memorialId: string) {
  trackEvent({
    name: "memorial_view",
    properties: {
      memorial_id: memorialId,
    },
  })
}

export function trackMemorialCreation() {
  trackEvent({
    name: "memorial_created",
  })
}
