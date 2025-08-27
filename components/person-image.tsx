"use client"

import { useState } from "react"
import Image from "next/image"
import { User } from "lucide-react"

interface PersonImageProps {
  src?: string
  name?: string
  alt?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  gender?: "male" | "female" | "other"
  customImageUrl?: string
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
}

export function PersonImage({
  src,
  name = "Unknown Person",
  alt,
  size = "md",
  className = "",
  gender = "other",
  customImageUrl,
}: PersonImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Safe name handling
  const safeName = name || "Unknown Person"
  const displayAlt = alt || `Photo of ${safeName}`

  // Generate initials safely
  const getInitials = (fullName: string): string => {
    if (!fullName || typeof fullName !== "string") return "?"

    try {
      return (
        fullName
          .split(" ")
          .map((n) => n.charAt(0))
          .join("")
          .toUpperCase()
          .slice(0, 2) || "?"
      )
    } catch {
      return "?"
    }
  }

  // Determine image source
  const getImageSrc = (): string => {
    if (customImageUrl) return customImageUrl
    if (src) return src

    // Fallback placeholder based on gender
    const genderParam = gender === "male" ? "men" : gender === "female" ? "women" : "any"
    return `https://randomuser.me/api/portraits/${genderParam}/${Math.floor(Math.random() * 99)}.jpg`
  }

  const imageSrc = getImageSrc()
  const initials = getInitials(safeName)

  if (imageError || !imageSrc) {
    return (
      <div
        className={`${sizeClasses[size]} ${className} bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium`}
      >
        {initials !== "?" ? <span className="text-xs">{initials}</span> : <User className="w-1/2 h-1/2" />}
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative rounded-full overflow-hidden bg-gray-200`}>
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />}
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={displayAlt}
        fill
        className="object-cover"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true)
          setIsLoading(false)
        }}
        sizes={size === "xl" ? "96px" : size === "lg" ? "64px" : size === "md" ? "48px" : "32px"}
      />
    </div>
  )
}

export default PersonImage
