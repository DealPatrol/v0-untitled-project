import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-rose-600 text-white">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl mb-8">We're sorry, but the page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-block bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-rose-100 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
