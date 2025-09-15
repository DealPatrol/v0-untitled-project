import type { Metadata } from "next"
import { MemorialLogoShowcase } from "@/components/memorial-logo-showcase"

export const metadata: Metadata = {
  title: "Memorial QR Logo Showcase - Design System",
  description:
    "Explore the complete Memorial QR logo design system with elegant cursive typography and decorative elements suitable for memorial contexts.",
  keywords: "memorial logo, cursive font, design system, branding, typography, Dancing Script",
}

export default function LogoShowcasePage() {
  return <MemorialLogoShowcase />
}
