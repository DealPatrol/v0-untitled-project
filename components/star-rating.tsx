import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, maxRating = 5, size = "sm" }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, i) => {
        const filled = i < Math.floor(rating)
        const halfFilled = i === Math.floor(rating) && rating % 1 !== 0

        return (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              filled
                ? "text-yellow-400 fill-yellow-400"
                : halfFilled
                  ? "text-yellow-400 fill-yellow-400/50"
                  : "text-gray-300"
            }`}
          />
        )
      })}
    </div>
  )
}
