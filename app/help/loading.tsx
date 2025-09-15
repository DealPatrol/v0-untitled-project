import { Header } from "@/components/header"
import { Skeleton } from "@/components/ui/skeleton"

export default function HelpLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-6 w-96 mx-auto mb-8 bg-white/20" />
          <Skeleton className="h-12 w-full max-w-2xl mx-auto bg-white/20" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Actions Skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg border p-6">
              <Skeleton className="h-12 w-12 mx-auto mb-4" />
              <Skeleton className="h-6 w-32 mx-auto mb-2" />
              <Skeleton className="h-4 w-48 mx-auto mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        {/* Categories Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg border p-6">
                <Skeleton className="h-8 w-8 mb-2" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48 mb-4" />
                <div className="space-y-2 mb-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Popular Articles Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-8 w-48 mx-auto mb-8" />
          <div className="bg-white rounded-lg border p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <Skeleton className="h-5 w-5 flex-shrink-0" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support Skeleton */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    </div>
  )
}
