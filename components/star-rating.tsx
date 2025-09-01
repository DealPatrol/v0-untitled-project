"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
  className?: string
  showRating?: boolean
}

export function StarRating({ rating, maxRating = 5, size = 20, className = "", showRating = false }: StarRatingProps) {
  const stars = []

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <Star
        key={i}
        size={size}
        className={`${i <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} ${className}`}
      />,
    )
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">{stars}</div>
      {showRating && (
        <span className="text-sm text-gray-600 ml-2">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  )
}

export default StarRating
