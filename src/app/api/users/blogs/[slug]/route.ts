import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    await connectToDatabase();

    const blog = await BlogModel.findOne({ slug, isActive: true }).lean();

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog post not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...blog,
        _id: blog._id.toString(),
      },
    });
  } catch (error) {
    console.error("GET /api/users/blogs/[slug] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load blog post right now.",
      },
      { status: 500 }
    );
  }
}
