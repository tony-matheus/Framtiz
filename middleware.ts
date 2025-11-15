import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "./lib/supabase/middleware"

// Basic auth credentials - in a real app, store these securely
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "portfolio2025"

const HTTP_AUTH_PAGES = ["/admin/signup"]

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Only apply to specific auth pages
  if (HTTP_AUTH_PAGES.some((page) => url.pathname.startsWith(page))) {
    const basicAuth = request.headers.get("authorization")

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1]
      const [user, pwd] = atob(authValue).split(":")

      if (user === ADMIN_USERNAME && pwd === ADMIN_PASSWORD) {
        return NextResponse.next()
      }
    }

    const response = new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    })

    return response
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
