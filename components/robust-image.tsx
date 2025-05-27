"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ImageIcon, AlertCircle } from "lucide-react"

interface RobustImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  fallbackText?: string
  showErrorDetails?: boolean
}

export function RobustImage({
  src,
  alt,
  width = 400,
  height = 400,
  fill = false,
  className = "",
  priority = false,
  fallbackText,
  showErrorDetails = false,
}: RobustImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(src)

  // Reset error state when src changes
  useEffect(() => {
    setError(false)
    setLoading(true)
    setCurrentSrc(src)
  }, [src])

  // Fallback sources to try
  const getFallbackSources = (originalSrc: string) => {
    const fallbacks = []

    // Try different extensions
    if (originalSrc.includes(".jpeg")) {
      fallbacks.push(originalSrc.replace(".jpeg", ".jpg"))
      fallbacks.push(originalSrc.replace(".jpeg", ".png"))
    } else if (originalSrc.includes(".jpg")) {
      fallbacks.push(originalSrc.replace(".jpg", ".jpeg"))
      fallbacks.push(originalSrc.replace(".jpg", ".png"))
    } else if (originalSrc.includes(".png")) {
      fallbacks.push(originalSrc.replace(".png", ".jpg"))
      fallbacks.push(originalSrc.replace(".png", ".jpeg"))
    }

    // Try placeholder service
    fallbacks.push(`https://placehold.co/${width}x${height}?text=${encodeURIComponent(alt)}`)

    // Final fallback
    fallbacks.push("/placeholder.svg")

    return fallbacks
  }

  const handleError = async () => {
    console.log(`Image failed to load: ${currentSrc}`)

    const fallbacks = getFallbackSources(src)
    let foundWorking = false

    // Try each fallback
    for (const fallbackSrc of fallbacks) {
      if (fallbackSrc === currentSrc) continue // Skip if it's the current failing source

      try {
        await new Promise((resolve, reject) => {
          const img = new window.Image()
          img.onload = resolve
          img.onerror = reject
          img.src = fallbackSrc
        })

        setCurrentSrc(fallbackSrc)
        setError(false)
        setLoading(false)
        foundWorking = true
        break
      } catch {
        continue
      }
    }

    if (!foundWorking) {
      setError(true)
      setLoading(false)
    }
  }

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 ${className}`}
        style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
      >
        <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center px-2">{fallbackText || "Image unavailable"}</p>
        {showErrorDetails && <p className="text-xs text-gray-400 text-center px-2 mt-1">Failed to load: {src}</p>}
      </div>
    )
  }

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 animate-pulse ${className}`}
        style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
      >
        <ImageIcon className="h-8 w-8 text-gray-400" />
      </div>
    )
  }

  return (
    <Image
      src={currentSrc || "/placeholder.svg"}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      className={className}
      priority={priority}
      onError={handleError}
      onLoad={handleLoad}
      unoptimized={true}
    />
  )
}
