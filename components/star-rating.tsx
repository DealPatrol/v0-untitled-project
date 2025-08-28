"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating?: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ rating = 0, onRatingChange, readonly = false, size = "md", className }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(rating)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const handleClick = (value: number) => {
    if (readonly) return
    setCurrentRating(value)
    onRatingChange?.(value)
  }

  const handleMouseEnter = (value: number) => {
    if (readonly) return
    setHoverRating(value)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverRating(0)
  }

  const displayRating = hoverRating || currentRating

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className={cn(
            "transition-colors",
            !readonly && "hover:scale-110 cursor-pointer",
            readonly && "cursor-default",
          )}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
        >
          <Star
            className={cn(
              sizeClasses[size],
              "transition-colors",
              value <= displayRating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
            )}
          />
        </button>
      ))}
    </div>
  )
}
