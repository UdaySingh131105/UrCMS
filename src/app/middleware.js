// middleware.ts
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit"; // path to the ratelimit setup file

const allowedOrigins = [
  "http://localhost:3000",
  "https://yourdomain.com",
  "https://another-allowed-domain.com"
];

export async function middleware(req) {
  // Identify the user by IP (or could use a userId if you have auth)
  const origin = req.headers.get("origin") || "";
  const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown";

  // Rate limiting
  const { remaining, limit, reset } = await rateLimit.limit(ip);

  // CORS check
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(
      JSON.stringify({ error: "Origin not allowed" }),
      {
        status: 403,
        headers: { "content-type": "application/json" },
      }
    );
  }

  // Only block when no requests are remaining
  if (remaining === 0) {
    return new NextResponse(
      JSON.stringify({
        error: "Too many requests, slow down!",
        limit,
        remaining,
        reset,
      }),
      {
        status: 429,
        headers: { "content-type": "application/json" },
      }
    );
  }

  // Add CORS headers for allowed origins
  const res = NextResponse.next();
  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  return res;
}

// Apply only to API routes (customize as needed)
export const config = {
  matcher: ["/api/:path*"],
};