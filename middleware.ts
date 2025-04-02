import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/settings/:path*",
    "/reports/:path*",
    "/clients/:path*",
    "/cars/:path*",
    "/reservations/:path*",
    "/users/:path*",
    "/schedule/:path*",
    "/cars/create-car/:path*",
    "/clients/create-client/:path*",
    "/reservations/create-reservation/:path*",
    "/users/create-user/:path*",
    "/schedule/create-schedule/:path*",
    "/branch/create-branch/:path*",
    "/branch/:path*",
    "/cars/:path*",
    "category/:path*",
    "/category/create-category/:path*",
  ],
};
