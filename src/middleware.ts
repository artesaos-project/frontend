import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for authentication token in cookies
  // Since Zustand persist uses localStorage (not accessible in middleware),
  // we'll check for an auth token cookie that should be set by the API
  const authToken = request.cookies.get('auth_token');

  // Protected routes that require authentication
  const protectedRoutes = [
    '/moderator',
    '/artisan/add-product',
    '/artisan/edit-product',
    '/artisan/edit-profile',
    '/settings',
    '/favorites',
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // If accessing protected route without authentication, redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Note: For moderator-specific checks, we would need role information in the cookie
  // or make an API call (not recommended in middleware for performance)
  // Client-side protection via useAuthGuard still applies as a second layer

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/moderator/:path*',
    '/artisan/add-product',
    '/artisan/edit-product/:path*',
    '/artisan/edit-profile',
    '/settings/:path*',
    '/favorites',
  ],
};
