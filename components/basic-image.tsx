"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BasicImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  className?: string
  fallbackSrc?: string
  style?: React.CSSProperties
}

export function BasicImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = "/placeholder.svg?height=400&width=600&text=Image",
  style = {},
}: BasicImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(fallbackSrc)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Reset states when src changes
    setLoaded(false)
    setError(false)

    if (!src) {
      setImgSrc(fallbackSrc)
      setError(true)
      return
    }

    const img = new Image()
    img.src = src

    img.onload = () => {
      setImgSrc(src)
      setLoaded(true)
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`)
      setImgSrc(fallbackSrc)
      setError(true)
      setLoaded(true)
    }
  }, [src, fallbackSrc])

  const combinedStyle = {
    ...style,
    width: width || "auto",
    height: height || "auto",
    opacity: loaded ? 1 : 0.5,
    transition: "opacity 0.3s ease",
  }

  return (
    <img
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      className={cn(className)}
      style={combinedStyle}
      onError={() => {
        console.error(`Error displaying image: ${imgSrc}`)
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}
