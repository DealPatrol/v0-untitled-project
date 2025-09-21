import { cn } from "@/lib/utils"

interface MemorialLogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function MemorialLogo({ size = "medium", className }: MemorialLogoProps) {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl md:text-8xl",
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("cursive-logo font-bold text-blue-600 animate-fade-in-up", sizeClasses[size])}>
        Memorial QR
      </div>
    </div>
  )
}
