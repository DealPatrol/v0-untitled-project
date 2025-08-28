"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  readonly = false,
  onRatingChange,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1
        const isFilled = starRating <= rating

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(starRating)}
            disabled={readonly}
            className={cn(
              "transition-colors",
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
              isFilled ? "text-yellow-400" : "text-gray-300",
            )}
          >
            <Star className={cn(sizeClasses[size], isFilled && "fill-current")} />
          </button>
        )
      })}
    </div>
  )
}
