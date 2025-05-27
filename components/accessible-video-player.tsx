"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, CaptionsIcon as ClosedCaptioning, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface Caption {
  start: number
  end: number
  text: string
}

interface AudioDescription {
  start: number
  end: number
  description: string
  priority: "low" | "medium" | "high"
}

interface AccessibleVideoPlayerProps {
  src: string
  title: string
  description?: string
  poster?: string
  captions?: Caption[]
  audioDescriptions?: AudioDescription[]
  transcript?: string
  audioDescriptionTrack?: string
}

export function AccessibleVideoPlayer({
  src,
  title,
  description,
  poster,
  captions = [],
  audioDescriptions = [],
  transcript,
  audioDescriptionTrack,
}: AccessibleVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioDescriptionRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showCaptions, setShowCaptions] = useState(true)
  const [showTranscript, setShowTranscript] = useState(false)
  const [audioDescriptionsEnabled, setAudioDescriptionsEnabled] = useState(false)
  const [currentCaption, setCurrentCaption] = useState("")
  const [currentAudioDescription, setCurrentAudioDescription] = useState("")
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [announcementQueue, setAnnouncementQueue] = useState<string[]>([])

  // Screen reader announcements
  const announceToScreenReader = (message: string) => {
    setAnnouncementQueue((prev) => [...prev, message])
    setTimeout(() => {
      setAnnouncementQueue((prev) => prev.slice(1))
    }, 3000)
  }

  // Update current time, captions, and audio descriptions
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      const time = video.currentTime
      setCurrentTime(time)

      // Update captions
      if (captions.length > 0 && showCaptions) {
        const caption = captions.find((cap) => time >= cap.start && time <= cap.end)
        const newCaption = caption?.text || ""
        if (newCaption !== currentCaption) {
          setCurrentCaption(newCaption)
        }
      }

      // Update audio descriptions
      if (audioDescriptions.length > 0 && audioDescriptionsEnabled) {
        const audioDesc = audioDescriptions.find((desc) => time >= desc.start && time <= desc.end)
        if (audioDesc && audioDesc.description !== currentAudioDescription) {
          setCurrentAudioDescription(audioDesc.description)
          announceToScreenReader(audioDesc.description)
        }
      }
    }

    const updateDuration = () => {
      setDuration(video.duration)
      setIsLoaded(true)
      announceToScreenReader(`Video loaded: ${title}. Duration: ${formatTime(video.duration)}`)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      announceToScreenReader("Video playing")
      if (audioDescriptionRef.current && audioDescriptionsEnabled) {
        audioDescriptionRef.current.play()
      }
    }

    const handlePause = () => {
      setIsPlaying(false)
      announceToScreenReader("Video paused")
      if (audioDescriptionRef.current) {
        audioDescriptionRef.current.pause()
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      announceToScreenReader("Video ended")
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("error", () => setHasError(true))

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("error", () => setHasError(true))
    }
  }, [
    captions,
    audioDescriptions,
    showCaptions,
    audioDescriptionsEnabled,
    currentCaption,
    currentAudioDescription,
    title,
  ])

  // Sync audio description track with video
  useEffect(() => {
    const video = videoRef.current
    const audioDesc = audioDescriptionRef.current

    if (video && audioDesc && audioDescriptionsEnabled) {
      const syncAudio = () => {
        if (Math.abs(audioDesc.currentTime - video.currentTime) > 0.5) {
          audioDesc.currentTime = video.currentTime
        }
      }

      video.addEventListener("seeked", syncAudio)
      return () => video.removeEventListener("seeked", syncAudio)
    }
  }, [audioDescriptionsEnabled])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = value[0]
    video.currentTime = newTime
    setCurrentTime(newTime)

    // Sync audio description
    if (audioDescriptionRef.current && audioDescriptionsEnabled) {
      audioDescriptionRef.current.currentTime = newTime
    }

    announceToScreenReader(`Seeked to ${formatTime(newTime)}`)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    announceToScreenReader(`Volume ${Math.round(newVolume * 100)}%`)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
      announceToScreenReader("Audio unmuted")
    } else {
      video.volume = 0
      setIsMuted(true)
      announceToScreenReader("Audio muted")
    }
  }

  const toggleAudioDescriptions = () => {
    const newState = !audioDescriptionsEnabled
    setAudioDescriptionsEnabled(newState)
    announceToScreenReader(newState ? "Audio descriptions enabled" : "Audio descriptions disabled")

    if (audioDescriptionRef.current) {
      if (newState && isPlaying) {
        audioDescriptionRef.current.play()
      } else {
        audioDescriptionRef.current.pause()
      }
    }
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
      announceToScreenReader("Exited fullscreen")
    } else {
      video.requestFullscreen()
      announceToScreenReader("Entered fullscreen")
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current
      if (!video || !video.contains(document.activeElement)) return

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowLeft":
          e.preventDefault()
          video.currentTime = Math.max(0, video.currentTime - 10)
          announceToScreenReader("Rewound 10 seconds")
          break
        case "ArrowRight":
          e.preventDefault()
          video.currentTime = Math.min(duration, video.currentTime + 10)
          announceToScreenReader("Fast forwarded 10 seconds")
          break
        case "ArrowUp":
          e.preventDefault()
          handleVolumeChange([Math.min(1, volume + 0.1)])
          break
        case "ArrowDown":
          e.preventDefault()
          handleVolumeChange([Math.max(0, volume - 0.1)])
          break
        case "m":
          e.preventDefault()
          toggleMute()
          break
        case "c":
          e.preventDefault()
          setShowCaptions(!showCaptions)
          announceToScreenReader(showCaptions ? "Captions hidden" : "Captions shown")
          break
        case "d":
          e.preventDefault()
          toggleAudioDescriptions()
          break
        case "f":
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isPlaying, volume, showCaptions, audioDescriptionsEnabled, duration])

  if (hasError) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center" role="alert">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <div className="text-gray-500">
            <p className="mb-2">Video temporarily unavailable</p>
            <p className="text-sm">Please check back later or contact support</p>
          </div>
        </div>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Screen Reader Announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcementQueue.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      {/* Video Title and Description */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1" id="video-description">
            {description}
          </p>
        )}

        {/* Accessibility Features Info */}
        <div className="mt-2 text-xs text-gray-500">
          <p>
            Keyboard shortcuts: Space/K (play/pause), ←/→ (seek), ↑/↓ (volume), C (captions), D (descriptions), F
            (fullscreen)
          </p>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative bg-black">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          poster={poster}
          preload="metadata"
          aria-label={title}
          aria-describedby={description ? "video-description" : undefined}
          tabIndex={0}
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/quicktime" />
          <track kind="captions" src="/captions/default.vtt" srcLang="en" label="English" default={showCaptions} />
          {audioDescriptionTrack && (
            <track kind="descriptions" src={audioDescriptionTrack} srcLang="en" label="Audio Descriptions" />
          )}
          Your browser does not support the video tag.
        </video>

        {/* Audio Description Track */}
        {audioDescriptionTrack && (
          <audio ref={audioDescriptionRef} preload="metadata" className="hidden" aria-hidden="true">
            <source src={audioDescriptionTrack} type="audio/mp3" />
          </audio>
        )}

        {/* Captions Overlay */}
        {showCaptions && currentCaption && (
          <div
            className="absolute bottom-16 left-4 right-4 bg-black bg-opacity-90 text-white p-3 rounded text-center text-lg font-medium"
            role="region"
            aria-label="Video captions"
            aria-live="polite"
            aria-atomic="true"
          >
            {currentCaption}
          </div>
        )}

        {/* Audio Description Overlay */}
        {audioDescriptionsEnabled && currentAudioDescription && (
          <div
            className="absolute top-4 left-4 right-4 bg-blue-900 bg-opacity-90 text-white p-3 rounded text-sm"
            role="region"
            aria-label="Audio description"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="font-semibold">Audio Description: </span>
            {currentAudioDescription}
          </div>
        )}

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
              aria-label={`Video progress: ${formatTime(currentTime)} of ${formatTime(duration)}`}
            />
            <div className="flex justify-between text-xs text-white mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white hover:bg-opacity-20"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white hover:bg-opacity-20"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                  aria-label="Volume control"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCaptions(!showCaptions)}
                className="text-white hover:bg-white hover:bg-opacity-20"
                aria-label={showCaptions ? "Hide captions" : "Show captions"}
                aria-pressed={showCaptions}
              >
                <ClosedCaptioning className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAudioDescriptions}
                className="text-white hover:bg-white hover:bg-opacity-20"
                aria-label={audioDescriptionsEnabled ? "Disable audio descriptions" : "Enable audio descriptions"}
                aria-pressed={audioDescriptionsEnabled}
                title="Audio descriptions provide spoken descriptions of visual elements"
              >
                {audioDescriptionsEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white hover:bg-opacity-20"
                aria-label="Enter fullscreen"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Transcript Section */}
      {transcript && (
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            onClick={() => setShowTranscript(!showTranscript)}
            className="mb-3"
            aria-expanded={showTranscript}
            aria-controls="video-transcript"
          >
            {showTranscript ? "Hide" : "Show"} Full Transcript
          </Button>

          {showTranscript && (
            <div
              id="video-transcript"
              className="bg-gray-50 p-4 rounded-lg text-sm"
              role="region"
              aria-label="Video transcript with audio descriptions"
            >
              <h4 className="font-semibold mb-2">Complete Video Transcript</h4>
              <div className="whitespace-pre-wrap leading-relaxed">{transcript}</div>

              {audioDescriptions.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h5 className="font-semibold mb-2">Audio Descriptions</h5>
                  <div className="space-y-2">
                    {audioDescriptions.map((desc, index) => (
                      <div key={index} className="text-blue-800">
                        <span className="font-medium">
                          [{formatTime(desc.start)} - {formatTime(desc.end)}]
                        </span>
                        <span className="ml-2">{desc.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Screen Reader Instructions */}
      <div className="sr-only">
        <p>
          Accessible video player for "{title}". Use spacebar or K to play or pause. Use left and right arrow keys to
          seek backward and forward by 10 seconds. Use up and down arrows to adjust volume. Press C to toggle captions,
          D to toggle audio descriptions, F for fullscreen, M to mute.
          {audioDescriptions.length > 0 && " Audio descriptions are available for this video."}
        </p>
      </div>
    </div>
  )
}
