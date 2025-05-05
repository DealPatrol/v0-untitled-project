import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MemorialNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Memorial Not Found</h1>
        <p className="text-gray-600 mb-8">
          The memorial you're looking for doesn't exist or may have been removed. Please check the URL and try again.
        </p>
        <div className="space-y-4">
          <Link href="/memorials">
            <Button className="w-full">View All Memorials</Button>
          </Link>
          <Link href="/test-memorial">
            <Button variant="outline" className="w-full">
              Create Test Memorial
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
