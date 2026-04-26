import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // If Clerk keys are configured, use Clerk middleware
  // Otherwise, pass through without auth
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (clerkKey && clerkKey !== 'pk_test_placeholder') {
    // Dynamically import and use Clerk middleware only when configured
    // For now, just pass through — Clerk's ClerkProvider handles auth client-side
    return NextResponse.next();
  }

  // No Clerk configured — pass through all requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
