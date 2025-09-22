import { cn } from "@/lib/utils"

interface MemorialLogoProps {
  className?: string
}

export function MemorialLogo({ className }: MemorialLogoProps) {
  return <span className={cn("memorial-logo font-dancing font-bold", className)}>Memorial QR</span>
}
