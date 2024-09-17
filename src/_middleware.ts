import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*"); // Adjust as needed for security
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

export const config = {
  matcher: "/api/stripe/:path*", // Apply middleware to routes under /api/stripe/
};
