"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ rating, maxRating = 5, size = "md", className }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: maxRating }, (_, i) => {
        const filled = i < Math.floor(rating)
        const halfFilled = i === Math.floor(rating) && rating % 1 !== 0

        return (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              filled || halfFilled ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
            )}
          />
        )
      })}
      <span className="ml-2 text-sm text-gray-600">({rating})</span>
    </div>
  )
}
