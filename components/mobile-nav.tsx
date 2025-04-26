"use client"
import Link from "next/link"
import { X } from "lucide-react"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 lg:hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <Link href="/" className="text-2xl font-serif flex items-center" onClick={onClose}>
          Memorial QR
          <span className="text-yellow-400 ml-1">★</span>
        </Link>
        <button onClick={onClose} aria-label="Close menu">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link href="/memorials" className="block py-2 text-lg hover:text-gray-600" onClick={onClose}>
              Memorials
            </Link>
          </li>
          <li>
            <Link href="/how-it-works" className="block py-2 text-lg hover:text-gray-600" onClick={onClose}>
              How It Works
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="block py-2 text-lg hover:text-gray-600" onClick={onClose}>
              Pricing
            </Link>
          </li>
          <li className="border-t pt-4 mt-4">
            <Link href="/login" className="block py-2 text-lg hover:text-gray-600" onClick={onClose}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/cart" className="block py-2 text-lg hover:text-gray-600" onClick={onClose}>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
