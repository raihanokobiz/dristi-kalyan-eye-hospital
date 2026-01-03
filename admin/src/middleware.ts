import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
console.log("Middleware accessed for path:", request.nextUrl.pathname,request.url, accessToken);

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/banners") ||
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/campaign") ||
    request.nextUrl.pathname.startsWith("/category") ||
    request.nextUrl.pathname.startsWith("/coupon") ||
    request.nextUrl.pathname.startsWith("/order-list") ||
    request.nextUrl.pathname.startsWith("/products") ||
    request.nextUrl.pathname.startsWith("/staffs");

  if (isProtectedRoute && !accessToken) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/banners/:path*",
    "/campaign/:path*",
    "/category/:path*",
    "/coupon/:path*",
    "/order-list/:path*",
    "/products/:path*",
    "/staffs/:path*",
  ],
};
