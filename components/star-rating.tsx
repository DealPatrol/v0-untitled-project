"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
  showRating?: boolean
  className?: string
}

export function StarRating({ rating, maxRating = 5, size = 20, showRating = false, className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            size={size}
            className={`${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      {showRating && (
        <span className="ml-2 text-sm text-gray-600">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  )
}

export default StarRating
