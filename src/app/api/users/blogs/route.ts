import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const blogs = await BlogModel.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: blogs.map((blog) => ({
        ...blog,
        _id: blog._id.toString(),
      })),
    });
  } catch (error) {
    console.error("GET /api/users/blogs error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load blog posts right now.",
      },
      { status: 500 }
    );
  }
}
