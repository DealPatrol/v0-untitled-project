import type React from "react"
import { Header } from "@/components/header"
import { StickyPurchaseCTA } from "@/components/sticky-purchase-cta"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <StickyPurchaseCTA />
      <main>{children}</main>
    </>
  )
}
