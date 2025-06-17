// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from "@/utils/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that don't require auth
  const isPublicPath = pathname === '/admin/login';

  const token = request.cookies.get('admin-token')?.value;

  // If no token
  if (!token) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // If token exists, verify it
  try {
    await verifyToken(token); // throws if invalid
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  } catch (err) {
    // Token invalid
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/login',
  ],
};