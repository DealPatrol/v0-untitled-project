import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Check if the path exists in your app
  // This is a simplified check - in a real app you'd check against your actual routes
  const staticPaths = [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/checkout",
    "/pricing",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/how-it-works",
    "/memorials",
  ]

  // Check if the path starts with any of these prefixes
  const dynamicPathPrefixes = ["/memorial/", "/qr/", "/api/", "/dashboard/", "/checkout/", "/products/"]

  // Check if the path is a static file
  const isStaticFile = pathname.match(/\.(jpg|jpeg|png|gif|ico|css|js|svg)$/i)

  // Check if the path exists or is a dynamic route or static file
  const pathExists =
    staticPaths.includes(pathname) || dynamicPathPrefixes.some((prefix) => pathname.startsWith(prefix)) || isStaticFile

  // If the path doesn't exist, redirect to a custom 404 page
  if (!pathExists) {
    return NextResponse.rewrite(new URL("/custom-404", request.url))
  }

  return NextResponse.next()
}

// Only run middleware on navigation requests
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
}
