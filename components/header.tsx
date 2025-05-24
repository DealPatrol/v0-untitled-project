import Link from "next/link"
import { CartButton } from "./cart-button"

export function Header() {
  return (
    <header className="bg-white text-rose-800 shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-serif flex flex-col items-center">
            <div className="flex items-center">
              <span className="mr-2">MEMORIAL</span>
              <span className="text-yellow-400">★</span>
              <span className="ml-1">QR</span>
            </div>
            <span className="text-xs text-rose-600 font-light tracking-wide">Tradition meets innovation</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/how-it-works" className="hover:text-rose-600 transition-colors">
            How It Works
          </Link>
          <Link href="/pricing" className="hover:text-rose-600 transition-colors">
            Pricing
          </Link>
          <Link href="/memorials" className="hover:text-rose-600 transition-colors">
            Memorials
          </Link>
          <Link href="/ai-tools" className="hover:text-rose-600 transition-colors">
            AI Tools
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="hover:text-rose-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  )
}
