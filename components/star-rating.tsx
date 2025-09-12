"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  className?: string
  showNumber?: boolean
}

export function StarRating({ rating, maxRating = 5, className, showNumber = true }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
                ? "text-yellow-400 fill-yellow-400/50"
                : "text-gray-300",
          )}
        />
      ))}
      {showNumber && <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>}
    </div>
  )
}
