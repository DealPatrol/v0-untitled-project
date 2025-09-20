"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  className?: string
  showNumber?: boolean
}

export function StarRating({ rating, maxRating = 5, size = "md", className, showNumber = false }: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            className={cn(sizeClasses[size], i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600 ml-2">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  )
}
