import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/auth-session";
import { generateAndSaveBlogPost } from "@/lib/blog-generator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) {
    const session = await verifyAdminSessionToken(token);
    if (session?.role === "admin") {
      return true;
    }
  }

  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  const searchParams = request.nextUrl.searchParams;
  const secretParam = searchParams.get("secret");
  if (cronSecret && secretParam === cronSecret) {
    return true;
  }

  return false;
}

export async function GET(request: NextRequest) {
  try {
    const authorized = await isAuthorized(request);
    if (!authorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Admin session or valid secret required.",
        },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const topic = searchParams.get("topic") || undefined;
    const category = searchParams.get("category") || undefined;
    const publishImmediately = searchParams.get("publish") !== "false";

    const result = await generateAndSaveBlogPost({
      topic,
      category,
      publishImmediately,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /api/admin/blogs/generate error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error during blog generation.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authorized = await isAuthorized(request);
    if (!authorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Admin session or valid secret required.",
        },
        { status: 401 }
      );
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty body is handled
    }

    const topic = typeof body.topic === "string" ? body.topic.trim() : undefined;
    const category = typeof body.category === "string" ? body.category.trim() : undefined;
    const publishImmediately =
      typeof body.publishImmediately === "boolean" ? body.publishImmediately : undefined;

    const result = await generateAndSaveBlogPost({
      topic,
      category,
      publishImmediately,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/admin/blogs/generate error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error during blog generation.",
      },
      { status: 500 }
    );
  }
}

