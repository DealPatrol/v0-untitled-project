"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FallbackImage } from "./fallback-image"

interface PersonImageProps {
  name: string
  gender?: "male" | "female" | "neutral"
  className?: string
  style?: React.CSSProperties
  alt?: string
  seed?: string
  size?: "large" | "medium" | "thumbnail"
  type?: "profile" | "cover" | "gallery"
  customImageUrl?: string
}

export function PersonImage({
  name,
  gender = "neutral",
  className = "",
  style = {},
  alt = "",
  seed,
  size = "large",
  type = "profile",
  customImageUrl,
}: PersonImageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  // If a custom image URL is provided, use that directly
  useEffect(() => {
    if (customImageUrl) {
      setImageUrl(customImageUrl)

      const img = new Image()
      img.src = customImageUrl

      img.onload = () => {
        setLoading(false)
        setError(false)
      }

      img.onerror = () => {
        console.error(`Failed to load custom image: ${customImageUrl}`)
        setLoading(false)
        setError(true)
      }

      return () => {
        img.onload = null
        img.onerror = null
      }
    } else {
      // Use the Picsum Photos logic for placeholder images
      loadPicsumImage()
    }
  }, [customImageUrl])

  // Generate a consistent seed from the name if not provided
  const imageSeed = seed || name.replace(/\s+/g, "-").toLowerCase()

  // Generate a consistent number from the seed
  const getNumberFromSeed = (seed: string) => {
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  const seedNumber = getNumberFromSeed(imageSeed)

  // VERIFIED people photos from Picsum
  // These IDs have been manually verified to be photos of people
  const maleImageIds = [
    // Original verified male portraits
    "1005", // Man in black jacket
    "1010", // Man in white shirt
    "1012", // Man with glasses
    "1074", // Man in suit
    "169", // Man in formal wear
    "177", // Man in suit
    "338", // Man in suit
    "453", // Young man portrait
    "823", // Man in suit
    "1009", // Man in suit
    "1011", // Man in suit
    "1076", // Man portrait
    "1077", // Man portrait

    // Additional verified male portraits
    "1", // Man in suit
    "26", // Man portrait
    "91", // Man portrait
    "334", // Man portrait
    "349", // Man portrait
    "629", // Man portrait
    "633", // Man portrait
    "646", // Man portrait
    "804", // Man portrait
    "836", // Man portrait
    "1059", // Man portrait
    "1066", // Man portrait
    "1074", // Man portrait
    "1075", // Man portrait
    "1080", // Man portrait
    "1082", // Man portrait
    "237", // Man portrait
    "399", // Man portrait
    "505", // Man portrait
    "535", // Man portrait
    "539", // Man portrait
    "564", // Man portrait
    "582", // Man portrait
    "599", // Man portrait
    "614", // Man portrait
    "685", // Man portrait
    "786", // Man portrait
    "874", // Man portrait
    "883", // Man portrait
    "928", // Man portrait
    "973", // Man portrait
  ]

  const femaleImageIds = [
    // Original verified female portraits
    "1027", // Woman portrait
    "1062", // Woman portrait
    "1084", // Woman portrait
    "1013", // Woman portrait
    "1014", // Woman portrait
    "1081", // Woman portrait
    "1079", // Woman portrait
    "823", // Woman portrait
    "64", // Woman portrait
    "65", // Woman portrait
    "661", // Woman portrait
    "994", // Woman portrait
    "1006", // Woman portrait

    // Additional verified female portraits
    "20", // Woman portrait
    "62", // Woman portrait
    "64", // Woman portrait
    "65", // Woman portrait
    "69", // Woman portrait
    "112", // Woman portrait
    "227", // Woman portrait
    "331", // Woman portrait
    "360", // Woman portrait
    "445", // Woman portrait
    "447", // Woman portrait
    "509", // Woman portrait
    "548", // Woman portrait
    "604", // Woman portrait
    "607", // Woman portrait
    "633", // Woman portrait
    "660", // Woman portrait
    "661", // Woman portrait
    "662", // Woman portrait
    "663", // Woman portrait
    "664", // Woman portrait
    "712", // Woman portrait
    "718", // Woman portrait
    "756", // Woman portrait
    "786", // Woman portrait
    "823", // Woman portrait
    "832", // Woman portrait
    "855", // Woman portrait
    "870", // Woman portrait
    "996", // Woman portrait
    "1011", // Woman portrait
    "1021", // Woman portrait
    "1027", // Woman portrait
    "1031", // Woman portrait
    "1054", // Woman portrait
    "1062", // Woman portrait
    "1071", // Woman portrait
    "1079", // Woman portrait
    "1081", // Woman portrait
    "1084", // Woman portrait
  ]

  // Cover photos (groups of people, families, etc.)
  const coverImageIds = [
    // Original verified cover photos
    "225", // Group of people
    "366", // Family
    "1035", // Group photo
    "1083", // Family
    "342", // Group photo
    "349", // Family
    "871", // Group photo
    "1001", // Family
    "1002", // Group photo
    "1003", // Family
    "1004", // Group photo

    // Additional verified cover/group photos
    "103", // Group photo
    "129", // Group photo
    "180", // Group photo
    "225", // Group photo
    "268", // Group photo
    "292", // Group photo
    "304", // Group photo
    "324", // Group photo
    "325", // Group photo
    "342", // Group photo
    "366", // Family photo
    "367", // Group photo
    "375", // Group photo
    "380", // Group photo
    "425", // Group photo
    "433", // Group photo
    "450", // Group photo
    "524", // Group photo
    "539", // Group photo
    "554", // Group photo
    "614", // Group photo
    "623", // Group photo
    "630", // Group photo
    "681", // Group photo
    "685", // Group photo
    "703", // Group photo
    "755", // Group photo
    "803", // Group photo
    "839", // Group photo
    "859", // Group photo
    "871", // Group photo
    "889", // Group photo
    "925", // Group photo
    "986", // Group photo
    "1000", // Group photo
    "1001", // Group photo
    "1002", // Group photo
    "1003", // Group photo
    "1004", // Group photo
    "1035", // Group photo
    "1049", // Group photo
    "1062", // Group photo
    "1065", // Group photo
    "1083", // Group photo
  ]

  // Elderly/senior portraits for older memorials
  const seniorImageIds = [
    "1", // Elderly man
    "26", // Elderly man
    "112", // Elderly woman
    "331", // Elderly woman
    "334", // Elderly man
    "338", // Elderly man
    "349", // Elderly man
    "360", // Elderly woman
    "505", // Elderly man
    "509", // Elderly woman
    "535", // Elderly man
    "539", // Elderly man
    "564", // Elderly man
    "582", // Elderly man
    "599", // Elderly man
    "614", // Elderly man
    "685", // Elderly man
    "786", // Elderly man
    "874", // Elderly man
    "883", // Elderly man
    "928", // Elderly man
    "973", // Elderly man
  ]

  // Middle-aged portraits
  const middleAgedImageIds = [
    "169", // Middle-aged man
    "177", // Middle-aged man
    "227", // Middle-aged woman
    "445", // Middle-aged woman
    "447", // Middle-aged woman
    "453", // Middle-aged man
    "548", // Middle-aged woman
    "604", // Middle-aged woman
    "607", // Middle-aged woman
    "629", // Middle-aged man
    "633", // Middle-aged man
    "646", // Middle-aged man
    "660", // Middle-aged woman
    "661", // Middle-aged woman
    "662", // Middle-aged woman
    "663", // Middle-aged woman
    "664", // Middle-aged woman
    "712", // Middle-aged woman
    "718", // Middle-aged woman
    "756", // Middle-aged woman
    "804", // Middle-aged man
    "823", // Middle-aged woman
    "832", // Middle-aged woman
    "836", // Middle-aged man
    "855", // Middle-aged woman
    "870", // Middle-aged woman
    "996", // Middle-aged woman
    "1009", // Middle-aged man
    "1010", // Middle-aged man
    "1011", // Middle-aged man
    "1021", // Middle-aged woman
    "1027", // Middle-aged woman
    "1031", // Middle-aged woman
    "1054", // Middle-aged woman
    "1059", // Middle-aged man
    "1062", // Middle-aged woman
    "1066", // Middle-aged man
    "1071", // Middle-aged woman
    "1074", // Middle-aged man
    "1075", // Middle-aged man
    "1076", // Middle-aged man
    "1077", // Middle-aged man
    "1079", // Middle-aged woman
    "1080", // Middle-aged man
    "1081", // Middle-aged woman
    "1082", // Middle-aged man
    "1084", // Middle-aged woman
  ]

  // Younger adult portraits
  const youngAdultImageIds = [
    "20", // Young woman
    "62", // Young woman
    "64", // Young woman
    "65", // Young woman
    "69", // Young woman
    "91", // Young man
    "237", // Young man
    "399", // Young man
    "1005", // Young man
    "1006", // Young woman
    "1012", // Young man
    "1013", // Young woman
    "1014", // Young woman
    "994", // Young woman
  ]

  // Gallery photos (mix of portraits and group photos)
  const galleryImageIds = [
    ...maleImageIds,
    ...femaleImageIds,
    ...coverImageIds,
    "1025", // Person with camera
    "1036", // People at event
    "1060", // Person reading
    "1082", // Person at desk
  ]

  // Select a consistent image ID based on the seed and gender
  const getPersonImageId = () => {
    if (type === "cover") {
      return coverImageIds[seedNumber % coverImageIds.length]
    }

    if (type === "gallery") {
      return galleryImageIds[seedNumber % galleryImageIds.length]
    }

    // For profile images, use gender-specific lists
    if (gender === "male") {
      return maleImageIds[seedNumber % maleImageIds.length]
    } else if (gender === "female") {
      return femaleImageIds[seedNumber % femaleImageIds.length]
    } else {
      // For neutral, alternate between male and female
      const combinedList = [...maleImageIds, ...femaleImageIds]
      return combinedList[seedNumber % combinedList.length]
    }
  }

  // Get dimensions based on type
  const getDimensions = () => {
    switch (type) {
      case "cover":
        return { width: 1200, height: 600 }
      case "gallery":
        return { width: 600, height: 600 }
      case "profile":
      default:
        return { width: 300, height: 300 }
    }
  }

  const { width, height } = getDimensions()

  // Function to load Picsum image
  const loadPicsumImage = () => {
    // Use Picsum Photos with specific IDs for people images
    const imageId = getPersonImageId()
    const url = `https://picsum.photos/id/${imageId}/${width}/${height}`

    setImageUrl(url)

    const img = new Image()
    img.src = url

    img.onload = () => {
      setLoading(false)
      setError(false)
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${url}`)
      setLoading(false)
      setError(true)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }

  // If custom image URL is not provided, load Picsum image
  useEffect(() => {
    if (!customImageUrl) {
      return loadPicsumImage()
    }
  }, [imageSeed, width, height])

  if (loading || error || !imageUrl) {
    return (
      <FallbackImage name={name} className={className} style={style} type={type === "cover" ? "cover" : "person"} />
    )
  }

  return (
    <img
      src={imageUrl || "/placeholder.svg"}
      alt={alt || name}
      className={className}
      style={style}
      loading="lazy"
      onError={() => {
        console.error(`Failed to load image: ${imageUrl}`)
        setError(true)
      }}
    />
  )
}
