import { cn } from "@/lib/utils"

interface MemorialLogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "white"
  showDecorations?: boolean
  className?: string
}

export function MemorialLogo({
  size = "md",
  variant = "default",
  showDecorations = true,
  className,
}: MemorialLogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  }

  const colorClasses = {
    default: "text-slate-900",
    white: "text-white",
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="flex items-center">
        <span className={cn("font-dancing font-bold tracking-wide", sizeClasses[size], colorClasses[variant])}>
          Memorial QR
        </span>
        {showDecorations && (
          <div className="ml-2 flex items-center space-x-1">
            <div
              className={cn(
                "w-2 h-2 rounded-full bg-red-500",
                size === "sm" && "w-1.5 h-1.5",
                size === "lg" && "w-3 h-3",
              )}
            />
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full bg-slate-400",
                size === "sm" && "w-1 h-1",
                size === "lg" && "w-2 h-2",
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}
