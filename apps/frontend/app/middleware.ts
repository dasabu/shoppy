import { NextRequest } from 'next/server'
import { AUTHENTICATION_COOKIE } from './constants/auth'
import { unauthenticatedRoutes } from './constants/routes'

export function middleware(request: NextRequest) {
  const auth = request.cookies.get(AUTHENTICATION_COOKIE)?.value

  if (
    !auth &&
    !unauthenticatedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route.title)
    )
  ) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
