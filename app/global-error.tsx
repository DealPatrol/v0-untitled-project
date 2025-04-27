"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en" className="bg-rose-600">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-rose-600 text-white">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-xl mb-8">We apologize for the inconvenience.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-rose-100 transition-colors"
              >
                Try again
              </button>
              <Link
                href="/"
                className="bg-rose-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-800 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
