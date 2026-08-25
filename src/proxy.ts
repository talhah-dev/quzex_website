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
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept") ?? "";

  // 1. Auth Protection for Admin Routes
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

  const isLlmFile = pathname === "/llms.txt" || pathname === "/llms-full.txt";

  // Skip asset files, internal next routes, and static extensions for markdown negotiation
  if (
    !isLlmFile &&
    (pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes("."))
  ) {
    return NextResponse.next();
  }

  // 2. Markdown Content Negotiation (acceptmarkdown.com)
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

    // Agent 404 in Markdown format with true 404 status
    return new NextResponse(generate404Markdown(), {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept, Accept-Encoding",
        "Cache-Control": "no-store",
      },
    });
  }

  // 3. Standard HTML Requests: Ensure Vary header includes Accept
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
