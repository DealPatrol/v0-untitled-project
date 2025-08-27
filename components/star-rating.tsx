"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating?: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  onChange?: (rating: number) => void
  className?: string
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
}

export function StarRating({
  rating = 0,
  maxRating = 5,
  size = "md",
  readonly = false,
  onChange,
  className = "",
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(rating)

  const handleClick = (value: number) => {
    if (readonly) return
    setCurrentRating(value)
    onChange?.(value)
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
    <div className={`flex items-center space-x-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= displayRating

        return (
          <button
            key={index}
            type="button"
            className={`${
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform duration-150"
            } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            aria-label={`Rate ${starValue} out of ${maxRating} stars`}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors duration-150 ${
                isFilled ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300 hover:text-yellow-400"
              }`}
            />
          </button>
        )
      })}
      {!readonly && (
        <span className="ml-2 text-sm text-gray-600">
          {currentRating > 0 ? `${currentRating}/${maxRating}` : "Rate this"}
        </span>
      )}
    </div>
  )
}

export default StarRating
