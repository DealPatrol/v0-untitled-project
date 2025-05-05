import type { Metadata } from "next"
import TestMemorialPageClient from "./TestMemorialPageClient"

export const metadata: Metadata = {
  title: "Create Test Memorial | Memorial QR",
  description: "Quickly create a test memorial for development and testing purposes.",
}

export default function TestMemorialPage() {
  return <TestMemorialPageClient />
}
