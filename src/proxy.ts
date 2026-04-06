import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes som kräver inloggning
const protectedRoutes = ['/profil', '/kalender']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('payload-token')?.value

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !token) {
    const loginUrl = new URL('/logga-in', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profil/:path*', '/kalender/:path*'],
}
