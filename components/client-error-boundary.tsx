"use client"

import type React from "react"

import { ErrorBoundary } from "react-error-boundary"

export function ClientErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 bg-rose-100 text-rose-700 rounded-md">
          Something went wrong. Please try refreshing the page.
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
