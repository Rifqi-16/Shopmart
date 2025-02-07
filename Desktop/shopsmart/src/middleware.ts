import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/cart') || 
                          request.nextUrl.pathname.startsWith('/checkout');

  // Only redirect to login for protected routes
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  if (token) {
    response.headers.set('Authorization', `Bearer ${token.value}`);
  }
  return response;
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*'
  ],
};