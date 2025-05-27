"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, AlertCircle, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RobustVideoPlayerProps {
  src: string
  title: string
  description?: string
  poster?: string
  className?: string
}

export function RobustVideoPlayer({ src, title, description, poster, className = "" }: RobustVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  // Reset states when src changes
  useEffect(() => {
    setHasError(false)
    setIsLoading(true)
    setIsPlaying(false)
    setCurrentSrc(src)
  }, [src])

  // Get fallback video sources
  const getFallbackSources = (originalSrc: string) => {
    const fallbacks = []

    // Try different video formats
    if (originalSrc.includes(".mov")) {
      fallbacks.push(originalSrc.replace(".mov", ".mp4"))
      fallbacks.push(originalSrc.replace(".mov", ".webm"))
    } else if (originalSrc.includes(".mp4")) {
      fallbacks.push(originalSrc.replace(".mp4", ".webm"))
      fallbacks.push(originalSrc.replace(".mp4", ".mov"))
    } else if (originalSrc.includes(".webm")) {
      fallbacks.push(originalSrc.replace(".webm", ".mp4"))
      fallbacks.push(originalSrc.replace(".webm", ".mov"))
    }

    // Try common video paths
    fallbacks.push("/videos/memorial-qr-demo.mp4")
    fallbacks.push("/videos/sample-video.mp4")

    return fallbacks
  }

  const handleError = async () => {
    console.log(`Video failed to load: ${currentSrc}`)

    const fallbacks = getFallbackSources(src)
    let foundWorking = false

    // Try each fallback
    for (const fallbackSrc of fallbacks) {
      if (fallbackSrc === currentSrc) continue

      try {
        // Test if video can be loaded
        const video = document.createElement("video")
        await new Promise((resolve, reject) => {
          video.onloadedmetadata = resolve
          video.onerror = reject
          video.src = fallbackSrc
        })

        setCurrentSrc(fallbackSrc)
        setHasError(false)
        setIsLoading(false)
        foundWorking = true
        break
      } catch {
        continue
      }
    }

    if (!foundWorking) {
      setHasError(true)
      setIsLoading(false)
    }
  }

  const handleLoadedData = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  if (hasError) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <div className="aspect-video bg-gray-200 rounded-lg flex flex-col items-center justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500 mb-2">Video unavailable</p>
          <p className="text-sm text-gray-400">Unable to load video file</p>
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 ${className}`}>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4 animate-pulse">
          <Video className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">Loading video...</p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="relative bg-black">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          poster={poster}
          preload="metadata"
          onError={handleError}
          onLoadedData={handleLoadedData}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={currentSrc} type="video/mp4" />
          <source src={currentSrc} type="video/quicktime" />
          <source src={currentSrc} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Simple Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
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
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
    </div>
  )
}
