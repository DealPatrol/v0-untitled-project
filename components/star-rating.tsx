import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showReviews?: boolean
  reviewCount?: number
  className?: string
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showReviews = false,
  reviewCount = 0,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={cn(sizeClasses[size], index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
          />
        ))}
      </div>
      {showReviews && (
        <span className={cn("ml-2 text-gray-600", textSizeClasses[size])}>
          {rating} ({reviewCount?.toLocaleString()} reviews)
        </span>
      )}
    </div>
  )
}

export default StarRating
