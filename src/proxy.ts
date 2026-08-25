import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/auth-session";
import {
  generate404Markdown,
  generateBlogMarkdown,
  generateContactMarkdown,
  generateDeveloperMarkdown,
  generateHomeMarkdown,
  generateServicesMarkdown,
  generateWorkMarkdown,
} from "@/lib/markdown-helpers";

export async function proxy(request: NextRequest) {
  const incomingHost = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").toLowerCase().split(":")[0];
  const isWwwDomain = incomingHost === "www.quzex.co";

  if (isWwwDomain) {
    const canonicalTargetUrl = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, "https://quzex.co");
    return NextResponse.redirect(canonicalTargetUrl, 308);
  }

  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept") ?? "";

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? await verifyAdminSessionToken(token) : null;
  const isLoginPage = pathname === "/login";
  const isProtectedPage = pathname.startsWith("/dashboard") || pathname === "/signup";

  if (isProtectedPage && !session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && session) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (pathname.startsWith("/api/")) {
    if (pathname.startsWith("/api/v1/")) {
      const v1SubPath = pathname.replace("/api/v1/", "");
      const rewrittenUrl = new URL(`/api/users/${v1SubPath}`, request.url);
      rewrittenUrl.search = request.nextUrl.search;

      const rewriteRes = NextResponse.rewrite(rewrittenUrl);
      rewriteRes.headers.set("X-API-Version", "1.0.0");
      rewriteRes.headers.set("Vary", "Accept, Accept-Encoding");
      return rewriteRes;
    }

    const apiResponse = NextResponse.next();
    apiResponse.headers.set("X-API-Version", "1.0.0");
    apiResponse.headers.set("Vary", "Accept, Accept-Encoding");
    return apiResponse;
  }

  const isLlmFile = pathname === "/llms.txt" || pathname === "/llms-full.txt";

  if (
    !isLlmFile &&
    (pathname.startsWith("/_next") || pathname.includes("."))
  ) {
    return NextResponse.next();
  }

  const isMarkdownRequested = acceptHeader.includes("text/markdown");

  const validPages: Record<string, () => string> = {
    "/": generateHomeMarkdown,
    "/about": generateServicesMarkdown,
    "/services": generateServicesMarkdown,
    "/work": generateWorkMarkdown,
    "/portfolio": generateWorkMarkdown,
    "/blog": generateBlogMarkdown,
    "/contact": generateContactMarkdown,
    "/reviews": generateServicesMarkdown,
    "/developer": generateDeveloperMarkdown,
  };

  const isKnownRoute =
    pathname in validPages ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/services/");

  if (isMarkdownRequested) {
    if (isKnownRoute) {
      const getMarkdown = validPages[pathname] ?? generateHomeMarkdown;
      return new NextResponse(getMarkdown(), {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept, Accept-Encoding",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      });
    }

    return new NextResponse(generate404Markdown(), {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept, Accept-Encoding",
        "Cache-Control": "no-store",
      },
    });
  }

  const response = NextResponse.next();
  const existingVary = response.headers.get("Vary");

  if (!existingVary) {
    response.headers.set("Vary", "Accept, Accept-Encoding");
  } else if (!existingVary.includes("Accept")) {
    response.headers.set("Vary", `Accept, ${existingVary}`);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
