import { NextRequest, NextResponse } from "next/server";
import { generateAndSaveBlogPost } from "@/lib/blog-generator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * GET or POST /api/cron/generate-blog
 * Automated Vercel Cron Handler.
 * Secured with CRON_SECRET or Vercel's authorization header.
 */
async function handleCron(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    const secretParam = request.nextUrl.searchParams.get("secret");

    const isAuthorized =
      !cronSecret ||
      authHeader === `Bearer ${cronSecret}` ||
      secretParam === cronSecret;

    if (!isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Invalid or missing cron secret.",
        },
        { status: 401 }
      );
    }

    // Auto-generate next blog post from topic rotation
    const result = await generateAndSaveBlogPost({
      publishImmediately: true,
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
    console.error("Cron /api/cron/generate-blog error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error during scheduled blog generation.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleCron(request);
}

export async function POST(request: NextRequest) {
  return handleCron(request);
}
