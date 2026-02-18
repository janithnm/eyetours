import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that are public or require specific logic
    const isPublicPage = path === "/admin/login" || path === "/admin/signup";

    // Check if the path starts with /admin
    if (path.startsWith("/admin")) {
        // Get the session token from the cookies
        // Checking both standard and secure cookie names for better-auth compatibility
        const sessionToken = request.cookies.get("better-auth.session_token")?.value ||
            request.cookies.get("better-auth.session_token.secure")?.value;

        // If it's not a public page and there's no session token, redirect to login
        if (!isPublicPage && !sessionToken) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        // If user is already logged in and tries to access public page, redirect to dashboard
        if (isPublicPage && sessionToken) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/admin/:path*"],
};
