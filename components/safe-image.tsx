"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SafeImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
  fallbackSrc?: string
}

export function SafeImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 80,
  fallbackSrc = "/placeholder.svg?height=400&width=600&text=Image",
}: SafeImageProps) {
  const [error, setError] = useState(false)

  // Handle empty or invalid src
  const validSrc = src && typeof src === "string" && src.trim() !== "" ? src : fallbackSrc

  // Use static import for common image formats
  const imgSrc = error ? fallbackSrc : validSrc

  return (
    <div className={cn("relative overflow-hidden", fill ? "w-full h-full" : "")}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={!fill ? width || 300 : undefined}
        height={!fill ? height || 300 : undefined}
        fill={fill}
        className={cn("object-cover", className)}
        priority={priority}
        quality={quality}
        onError={() => setError(true)}
        unoptimized={true} // This helps with Safari compatibility
      />
    </div>
  )
}
