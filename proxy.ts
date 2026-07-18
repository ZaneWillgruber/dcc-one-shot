import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function proxy(request: NextRequest) {
	// Optimistic cookie-existence check only — pages verify the session
	// against the database via auth.api.getSession.
	const sessionCookie = getSessionCookie(request);

	if (!sessionCookie) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}

	return NextResponse.next();
}

export const config = {
	// Protect everything by default; only the sign-in page, Better Auth's own
	// endpoints, and static assets are reachable without a session.
	matcher: ['/((?!sign-in|api/auth|_next/static|_next/image|favicon.ico).*)'],
};
