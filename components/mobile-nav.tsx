"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex items-center space-x-2 mb-8">
          <Heart className="h-6 w-6 text-orange-500" />
          <span className="text-lg font-bold">Memorial QR</span>
        </div>

        <nav className="flex flex-col space-y-4">
          <Link
            href="/how-it-works"
            className="text-gray-600 hover:text-gray-900 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-gray-600 hover:text-gray-900 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/browse-memorials"
            className="text-gray-600 hover:text-gray-900 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Sample Memorials
          </Link>
          <Link
            href="/ai-tools"
            className="text-gray-600 hover:text-gray-900 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            AI Tools
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-900 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <div className="pt-4 border-t">
            <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
              <Link href="/create-profile" onClick={() => setOpen(false)}>
                Create Memorial
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
