import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, createSessionToken } from "@/lib/session";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const passcode = String(formData.get("passcode") || "");
  const expected = process.env.LOGIN_PASSCODE;

  // Fail closed: if no passcode is configured in env, login is impossible.
  // This prevents a known fallback password from ever protecting the app.
  if (!expected) {
    return NextResponse.redirect(
      new URL("/login?error=not_configured", request.url),
    );
  }

  if (passcode !== expected) {
    return NextResponse.redirect(new URL("/login?error=invalid", request.url));
  }

  const token = createSessionToken();
  if (!token) {
    // SESSION_SECRET missing — cannot issue a valid session.
    return NextResponse.redirect(
      new URL("/login?error=not_configured", request.url),
    );
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
