"use client"

import type React from "react"

interface SimpleImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

export function SimpleImage({ src, alt, className = "", style = {} }: SimpleImageProps) {
  // Use a simple img tag with no fancy features
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      style={style}
      onError={(e) => {
        // On error, replace with a text-based placeholder
        const target = e.target as HTMLImageElement
        target.onerror = null // Prevent infinite error loop
        target.src = `https://placehold.co/600x400?text=${encodeURIComponent(alt)}`
      }}
    />
  )
}
