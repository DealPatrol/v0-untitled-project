import { Header } from "@/components/header"
import { Skeleton } from "@/components/ui/skeleton"

export default function CreateProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Progress Header Skeleton */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-20" />
            </div>

            <Skeleton className="h-2 w-full mb-4" />

            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`flex items-center ${i < 4 ? "flex-1" : ""}`}>
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="ml-2 h-4 w-24" />
                  {i < 4 && <Skeleton className="flex-1 h-0.5 mx-4" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border">
            {/* Card Header Skeleton */}
            <div className="p-6 border-b">
              <Skeleton className="h-6 w-48" />
            </div>

            {/* Card Content Skeleton */}
            <div className="p-6 space-y-6">
              {/* Form Fields Skeleton */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-28 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-28 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Navigation Buttons Skeleton */}
              <div className="flex justify-between pt-6 border-t">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
