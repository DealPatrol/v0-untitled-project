"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ErrorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      // Check if this is a 404 page
      if (document.title.includes("404") || pathname === "/404") {
        // Track the 404 error - using a simple fetch to avoid any server action issues
        fetch("/api/track-404", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: pathname }),
        }).catch(console.error)
      }
    }
  }, [pathname])

  return null // This component doesn't render anything
}
