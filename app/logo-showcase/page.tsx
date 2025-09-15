import type { Metadata } from "next"
import { MemorialLogoShowcase } from "@/components/memorial-logo-showcase"

export const metadata: Metadata = {
  title: "Memorial QR Logo Showcase",
  description:
    "Elegant cursive logo design variations for Memorial QR - showcasing different sizes, colors, and applications suitable for memorial contexts.",
  keywords: ["memorial", "logo", "design", "cursive", "typography", "branding"],
}

export default function LogoShowcasePage() {
  return <MemorialLogoShowcase />
}
