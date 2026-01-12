import { NextRequest, NextResponse } from 'next/server';

// Middleware to protect routes that require authentication
export function middleware(request: NextRequest) {
  // Define protected routes
  const protectedPaths = ['/todos', '/profile'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Check if user is authenticated by looking for auth token
  const token = request.cookies.get('auth_token')?.value ||
                request.headers.get('Authorization')?.replace('Bearer ', '');

  // If trying to access a protected route without authentication
  if (isProtectedPath && !token) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (request.nextUrl.pathname.startsWith('/auth/login') ||
      request.nextUrl.pathname.startsWith('/auth/register')) {
    if (token) {
      return NextResponse.redirect(new URL('/todos', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};