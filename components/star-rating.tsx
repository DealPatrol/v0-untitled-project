"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  readonly?: boolean
  className?: string
  onRatingChange?: (rating: number) => void
}

export function StarRating({ rating, maxRating = 5, readonly = false, className, onRatingChange }: StarRatingProps) {
  const handleStarClick = (starIndex: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starIndex + 1)
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "w-5 h-5 transition-colors",
            index < rating ? "fill-current text-yellow-400" : "text-gray-300",
            !readonly && "cursor-pointer hover:text-yellow-400",
          )}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  )
}
