import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Grab the current URL pathname (e.g., "/", "/about", etc.)
  const { pathname } = request.nextUrl;

  // 2. If someone lands exactly on the root index "/", redirect them to "/home"
  if (pathname === '/') {
    const homeUrl = new URL('/home', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // 3. For all other pages, proceed with your existing header-tracking proxy logic
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// The matcher remains the same, ensuring static assets are skipped
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
