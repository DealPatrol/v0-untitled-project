import type { Metadata } from "next"
import { CreateMemorialFlow } from "@/components/create-memorial/create-memorial-flow"

export const metadata: Metadata = {
  title: "Create a Memorial | Memorial QR",
  description: "Create a beautiful digital memorial to honor and remember your loved one.",
}

export default function CreateMemorialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Create a Memorial</h1>
          <p className="text-gray-600 text-center mb-8">
            Honor your loved one with a beautiful digital memorial that can be shared with family and friends.
          </p>

          <CreateMemorialFlow />
        </div>
      </div>
    </div>
  )
}
