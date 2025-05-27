"use client"

import { useState } from "react"
import Image from "next/image"

interface ReliableImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackText?: string
  priority?: boolean
}

export function ReliableImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  fallbackText,
  priority = false,
}: ReliableImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Create a reliable fallback URL
  const fallbackUrl = `https://placehold.co/${width}x${height}/e5e7eb/6b7280?text=${encodeURIComponent(fallbackText || alt)}`

  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}

      <Image
        src={imageError ? fallbackUrl : src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        unoptimized={imageError} // Use unoptimized for fallback images
      />
    </div>
  )
}
