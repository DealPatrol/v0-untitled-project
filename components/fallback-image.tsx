import type React from "react"
interface FallbackImageProps {
  name: string
  className?: string
  style?: React.CSSProperties
  type?: "person" | "cover" | "gallery"
}

export function FallbackImage({ name, className = "", style = {}, type = "person" }: FallbackImageProps) {
  // Generate a consistent color based on the name
  const getColorFromName = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    const hue = Math.abs(hash % 360)
    return `hsl(${hue}, 70%, 80%)`
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const bgColor = getColorFromName(name)
  const initials = getInitials(name)

  const containerStyle = {
    backgroundColor: bgColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    color: "#333",
    fontSize: type === "cover" ? "3rem" : "1.5rem",
    fontWeight: "bold",
    ...style,
  }

  return (
    <div className={className} style={containerStyle}>
      {initials}
    </div>
  )
}
