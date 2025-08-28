"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating?: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export function StarRating({
  rating = 0,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(rating)

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const handleClick = (starRating: number) => {
    if (!interactive) return
    setCurrentRating(starRating)
    onRatingChange?.(starRating)
  }

  const handleMouseEnter = (starRating: number) => {
    if (!interactive) return
    setHoverRating(starRating)
  }

  const handleMouseLeave = () => {
    if (!interactive) return
    setHoverRating(0)
  }

  const displayRating = interactive ? hoverRating || currentRating : rating

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1
        const isFilled = starRating <= displayRating
        const isPartial = !isFilled && starRating - 0.5 <= displayRating

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            className={cn(
              "relative transition-colors",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
            )}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            onMouseLeave={handleMouseLeave}
            aria-label={`${starRating} star${starRating !== 1 ? "s" : ""}`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : isPartial
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
              )}
            />
          </button>
        )
      })}
      {!interactive && <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>}
    </div>
  )
}

// Named export for compatibility
export { StarRating as default }
