"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export function CartButton() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // In a real app, you'd get this from your cart state/context
    // For now, we'll simulate an empty cart
    setCartCount(0)
  }, [])

  return (
    <Button asChild variant="ghost" size="sm" className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500">
            {cartCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
