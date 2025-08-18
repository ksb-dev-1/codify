import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/", "/sign-in"];

  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/questions/:path*",
    "/saved",
    "/profile",
    "/premium",
    "/payment-success",
  ],
};
