import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, maxRating = 5, size = "sm" }: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}
