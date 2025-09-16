import { MemorialLogoShowcase } from "@/components/memorial-logo-showcase"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Memorial QR Logo Showcase",
  description: "Elegant cursive typography design for Memorial QR with subtle decorative elements",
}

export default function LogoShowcasePage() {
  return <MemorialLogoShowcase />
}
