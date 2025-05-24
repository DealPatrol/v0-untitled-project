"use client"

import { useState, useRef, useEffect } from "react"
import { Play } from "lucide-react"

interface LazyVideoProps {
  src: string
  poster?: string
  title: string
  description?: string
  className?: string
}

export function LazyVideo({ src, poster, title, description, className = "" }: LazyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoadVideo = () => {
    setIsLoaded(true)
  }

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{title}</h3>

      <div className="aspect-video rounded-lg overflow-hidden bg-gray-900 relative">
        {!isInView ? (
          // Placeholder while not in view
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading video...</div>
          </div>
        ) : !isLoaded ? (
          // Poster with play button
          <div className="relative w-full h-full">
            {poster && (
              <img
                src={poster || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <button
                onClick={handleLoadVideo}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 transform hover:scale-110"
                aria-label="Load and play video"
              >
                <Play className="h-8 w-8 text-gray-900 ml-1" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-60 rounded px-3 py-2">
                <p className="text-white text-sm font-medium">Click to load video</p>
              </div>
            </div>
          </div>
        ) : (
          // Actual video element
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
            poster={poster}
            onPlay={handlePlay}
            onPause={handlePause}
            onLoadStart={() => console.log("Video loading started")}
            onCanPlay={() => console.log("Video can play")}
          >
            <source src={src} type="video/quicktime" />
            <source src={src.replace(".mov", ".mp4")} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {description && <p className="text-sm text-gray-600 mt-2 text-center">{description}</p>}

      {/* Loading indicator */}
      {isLoaded && !isPlaying && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-black bg-opacity-50 rounded-full p-2">
            <Play className="h-6 w-6 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}
