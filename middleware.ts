import { NextRequest, NextResponse } from 'next/server'

// Routes that don't require authentication
const publicRoutes = ['/login']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // For protected routes, we check if user exists in localStorage
  // In a real app, this would be validated with a JWT or session token
  const userCookie = request.cookies.get('tcms_user')
  
  // If no user, redirect to login
  if (!userCookie) {
    // Note: Client-side would handle the localStorage check, but we set a cookie marker here
    // The actual redirect happens on the client side in the route layout
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
