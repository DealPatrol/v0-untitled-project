"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Play, Pause, Volume2, VolumeX, AlertCircle, ImageIcon, Video, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UniversalMediaProps {
  src: string
  alt: string
  type?: "image" | "video" | "auto"
  width?: number
  height?: number
  className?: string
  poster?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  priority?: boolean
}

export function UniversalMedia({
  src,
  alt,
  type = "auto",
  width = 400,
  height = 400,
  className = "",
  poster,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  priority = false,
}: UniversalMediaProps) {
  const [mediaType, setMediaType] = useState<"image" | "video">(
    type === "auto"
      ? src.includes(".mp4") || src.includes(".mov") || src.includes(".webm")
        ? "video"
        : "image"
      : type,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [retryCount, setRetryCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const videoRef = useRef<HTMLVideoElement>(null)

  const maxRetries = 3

  // Generate fallback sources
  const generateFallbacks = (originalSrc: string, type: "image" | "video") => {
    const fallbacks: string[] = []

    if (type === "image") {
      // Try different image formats
      if (originalSrc.includes(".jpeg")) {
        fallbacks.push(originalSrc.replace(".jpeg", ".jpg"))
        fallbacks.push(originalSrc.replace(".jpeg", ".png"))
        fallbacks.push(originalSrc.replace(".jpeg", ".webp"))
      } else if (originalSrc.includes(".jpg")) {
        fallbacks.push(originalSrc.replace(".jpg", ".jpeg"))
        fallbacks.push(originalSrc.replace(".jpg", ".png"))
        fallbacks.push(originalSrc.replace(".jpg", ".webp"))
      } else if (originalSrc.includes(".png")) {
        fallbacks.push(originalSrc.replace(".png", ".jpg"))
        fallbacks.push(originalSrc.replace(".png", ".jpeg"))
        fallbacks.push(originalSrc.replace(".png", ".webp"))
      }

      // Generic fallbacks
      fallbacks.push(`https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(alt)}`)
      fallbacks.push(`https://placehold.co/${width}x${height}?text=${encodeURIComponent(alt)}`)
      fallbacks.push("/placeholder.svg")
    } else {
      // Try different video formats
      if (originalSrc.includes(".mov")) {
        fallbacks.push(originalSrc.replace(".mov", ".mp4"))
        fallbacks.push(originalSrc.replace(".mov", ".webm"))
      } else if (originalSrc.includes(".mp4")) {
        fallbacks.push(originalSrc.replace(".mp4", ".mov"))
        fallbacks.push(originalSrc.replace(".mp4", ".webm"))
      } else if (originalSrc.includes(".webm")) {
        fallbacks.push(originalSrc.replace(".webm", ".mp4"))
        fallbacks.push(originalSrc.replace(".webm", ".mov"))
      }

      // Sample videos as fallbacks
      fallbacks.push("/videos/memorial-qr-demo.mp4")
      fallbacks.push("/videos/sample-video.mp4")
    }

    return fallbacks
  }

  const tryNextSource = async () => {
    if (retryCount >= maxRetries) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    const fallbacks = generateFallbacks(src, mediaType)
    const nextSrc = fallbacks[retryCount]

    if (!nextSrc) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    try {
      if (mediaType === "image") {
        await testImage(nextSrc)
      } else {
        await testVideo(nextSrc)
      }

      setCurrentSrc(nextSrc)
      setHasError(false)
      setIsLoading(false)
    } catch {
      setRetryCount((prev) => prev + 1)
      setTimeout(tryNextSource, 1000) // Wait 1 second before next retry
    }
  }

  const testImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error("Image failed to load"))
      img.src = src
    })
  }

  const testVideo = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      video.onloadedmetadata = () => resolve()
      video.onerror = () => reject(new Error("Video failed to load"))
      video.src = src
    })
  }

  const handleRetry = () => {
    setRetryCount(0)
    setHasError(false)
    setIsLoading(true)
    setCurrentSrc(src)
  }

  const handleError = () => {
    console.log(`Media failed to load: ${currentSrc}`)
    tryNextSource()
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  // Auto-retry on mount
  useEffect(() => {
    if (hasError && retryCount === 0) {
      tryNextSource()
    }
  }, [hasError])

  // Error state
  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 ${className}`}
        style={{ width, height }}
      >
        <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center mb-2">
          {mediaType === "video" ? "Video unavailable" : "Image unavailable"}
        </p>
        <p className="text-xs text-gray-400 text-center mb-3">{alt}</p>
        <Button variant="outline" size="sm" onClick={handleRetry} className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 animate-pulse rounded-lg ${className}`}
        style={{ width, height }}
      >
        {mediaType === "video" ? (
          <Video className="h-8 w-8 text-gray-400" />
        ) : (
          <ImageIcon className="h-8 w-8 text-gray-400" />
        )}
      </div>
    )
  }

  // Render media
  if (mediaType === "video") {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload="metadata"
          onError={handleError}
          onLoadedData={handleLoad}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{ width, height }}
        >
          <source src={currentSrc} type="video/mp4" />
          <source src={currentSrc} type="video/quicktime" />
          <source src={currentSrc} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {controls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render image
  return (
    <Image
      src={currentSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
      onLoad={handleLoad}
      unoptimized={true}
    />
  )
}
