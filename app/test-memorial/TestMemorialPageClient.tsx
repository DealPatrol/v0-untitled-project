"use client"

import { TestMemorialForm } from "@/components/test-memorial-form"

export default function TestMemorialPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Create Test Memorial</h1>
          <p className="text-gray-600 text-center mb-8">
            Choose from our templates or customize your own test memorial for development and testing purposes.
          </p>

          <TestMemorialForm />
        </div>
      </div>
    </div>
  )
}
