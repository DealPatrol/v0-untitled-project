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

  // Clean up the src URL if needed
  const cleanSrc = src?.startsWith("//") ? `https:${src}` : src

  // Use fallback if there's an error or no src
  const imageSrc = error || !cleanSrc ? fallbackSrc : cleanSrc

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      className={cn(className)}
      priority={priority}
      quality={quality}
      onError={() => setError(true)}
    />
  )
}
