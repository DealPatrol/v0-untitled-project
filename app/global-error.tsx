"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-rose-500 text-white">
          <div className="text-center max-w-md mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
            <p className="text-xl mb-8">We're sorry, but an error occurred.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="bg-white text-rose-500 px-6 py-3 rounded-lg font-semibold hover:bg-rose-50 transition-colors"
              >
                Try again
              </button>
              <a
                href="/"
                className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
