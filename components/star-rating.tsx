"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showRating?: boolean
  className?: string
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showRating = false,
  className = "",
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starNumber = index + 1
    const isFilled = starNumber <= rating
    const isHalfFilled = starNumber - 0.5 <= rating && starNumber > rating

    return (
      <Star
        key={index}
        className={`${sizeClasses[size]} ${
          isFilled || isHalfFilled ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        }`}
      />
    )
  })

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">{stars}</div>
      {showRating && <span className="text-sm font-medium text-gray-600 ml-1">{rating.toFixed(1)}</span>}
    </div>
  )
}

// Add default export
export default StarRating
