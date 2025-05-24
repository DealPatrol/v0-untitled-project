"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FallbackImage } from "./fallback-image"

interface PicsumImageProps {
  name: string
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
  alt?: string
  seed?: string
}

export function PicsumImage({ name, width, height, className = "", style = {}, alt = "", seed }: PicsumImageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Generate a consistent seed from the name if not provided
  const imageSeed = seed || name.replace(/\s+/g, "-").toLowerCase()

  // Create the Picsum URL with the seed for consistency
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(imageSeed)}/${width}/${height}`

  useEffect(() => {
    // Preload the image to check if it loads successfully
    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      setLoading(false)
      setError(false)
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${imageUrl}`)
      setLoading(false)
      setError(true)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [imageUrl])

  if (loading || error) {
    return <FallbackImage name={name} className={className} style={style} />
  }

  return (
    <img src={imageUrl || "/placeholder.svg"} alt={alt || name} className={className} style={style} loading="lazy" />
  )
}
