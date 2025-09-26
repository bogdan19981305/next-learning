import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const protectedRoutes = ["/ingredients"];

  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      const url = new URL("/error", request.url);
      url.searchParams.set(
        "message",
        "You must be logged in to access this page"
      );
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/ingredients", "/recipes"],
};
