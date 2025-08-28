"use client"
import { useState } from "react"
import Image from "next/image"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

interface PersonImageProps {
  src?: string | null
  alt?: string
  name?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  fallbackInitials?: string
  gender?: "male" | "female" | "other" | null
}

export function PersonImage({
  src,
  alt,
  name = "",
  size = "md",
  className,
  fallbackInitials,
  gender,
}: PersonImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  }

  // Get initials from name if no fallbackInitials provided
  const getInitials = (fullName: string): string => {
    if (!fullName || typeof fullName !== "string") return "?"

    const names = fullName.trim().split(" ")
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  // Get gender-based placeholder
  const getGenderPlaceholder = (): string => {
    switch (gender) {
      case "male":
        return "/images/male-profile-placeholder.png"
      case "female":
        return "/images/female-profile-placeholder.png"
      default:
        return "/images/neutral-profile-placeholder.png"
    }
  }

  const displayInitials = fallbackInitials || getInitials(name)
  const imageSrc = src && !imageError ? src : getGenderPlaceholder()
  const imageAlt = alt || `Photo of ${name}` || "Person photo"

  return (
    <div className={cn("relative rounded-full overflow-hidden bg-gray-200", sizeClasses[size], className)}>
      {imageSrc && !imageError ? (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          {displayInitials && displayInitials !== "?" ? (
            <span
              className={cn("font-semibold text-gray-700", {
                "text-xs": size === "sm",
                "text-sm": size === "md",
                "text-lg": size === "lg",
                "text-xl": size === "xl",
              })}
            >
              {displayInitials}
            </span>
          ) : (
            <User className={cn("text-gray-500", iconSizes[size])} />
          )}
        </div>
      )}

      {isLoading && imageSrc && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
      )}
    </div>
  )
}
