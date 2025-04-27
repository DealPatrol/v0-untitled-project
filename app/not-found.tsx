import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-500 text-white">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">We're sorry, but the page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-block bg-white text-rose-500 px-6 py-3 rounded-lg font-semibold hover:bg-rose-50 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
