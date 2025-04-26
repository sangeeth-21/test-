import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Allow access to login and signup pages without token
  if (pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password')) {
    return NextResponse.next();
  }

  // Allow access to component files needed for login/signup UI
  if (pathname.startsWith('/_next') || pathname.includes('/components/')) {
    return NextResponse.next();
  }

  // Require token for root path and all other routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access if token exists
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
