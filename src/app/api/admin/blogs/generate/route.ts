import { NextRequest, NextResponse } from "next/server";
import { generateAndSaveBlogPost } from "@/lib/blog-generator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/blogs/generate
 * Allows triggering directly in browser or with query params: ?topic=...&category=...&publish=true
 */
export async function GET(request: NextRequest) {
  try {
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

/**
 * POST /api/admin/blogs/generate
 * Trigger AI blog post generation manually with optional custom topic, category, and publish state.
 */
export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty body is acceptable; it will use random rotation
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
