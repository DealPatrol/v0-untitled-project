"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Search, Phone } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Browse Memorials", href: "/browse-memorials" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">MemorialStarQR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-orange-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/browse-memorials">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="tel:256-595-3354">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/create-profile">Create Memorial</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-orange-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Button className="w-full mb-3" asChild>
                    <Link href="/create-profile" onClick={() => setIsOpen(false)}>
                      Create Memorial
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full mb-3 bg-transparent" asChild>
                    <Link href="/browse-memorials" onClick={() => setIsOpen(false)}>
                      <Search className="h-4 w-4 mr-2" />
                      Search Memorials
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="tel:256-595-3354" onClick={() => setIsOpen(false)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call (256) 595-3354
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
