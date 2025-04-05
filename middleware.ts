import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const isAuthPage =
      nextUrl.pathname.startsWith("/signup") ||
      nextUrl.pathname.startsWith("/login");

    if (isAuthPage && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User is authorized if they have a token
    },
  }
);

export const config = {
  matcher: ["/login", "/signup"], // Apply middleware only on these pages
};
