import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.cookies.has('token')) {
    return NextResponse.redirect(new URL('/notebooks', request.url))
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/'
}