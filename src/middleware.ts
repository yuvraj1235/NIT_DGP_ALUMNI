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
if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
  ],
};