import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutSuccessLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header Skeleton */}
          <div className="text-center mb-8">
            <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Details Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-40 mb-2" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>

                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Customer Information Skeleton */}
          <Card className="mt-8">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <div className="space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-40" />
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <div className="space-y-1">
                    {[...Array(2)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-48" />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Information Skeleton */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Skeleton className="h-4 w-80 mx-auto" />
                <div className="flex items-center justify-center gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-20" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
