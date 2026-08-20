import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import type { CreateBlogPayload } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const blogs = await BlogModel.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: blogs.map((blog) => ({
        ...blog,
        _id: blog._id.toString(),
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/blogs error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load blog posts right now.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateBlogPayload;

    const title = String(body.title || "").trim();
    const slug = String(body.slug || "").trim();
    const category = String(body.category || "").trim();
    const image = String(body.image || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const content = String(body.content || "").trim();
    const isActive = body.isActive !== false;

    if (!title || !slug || !category || !image || !excerpt || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, slug, category, image, excerpt, and content are required.",
        },
        { status: 400 }
      );
    }

    const seo = body.seo
      ? {
          metaTitle: String(body.seo.metaTitle || "").trim() || undefined,
          metaDescription: String(body.seo.metaDescription || "").trim() || undefined,
          canonicalUrl: String(body.seo.canonicalUrl || "").trim() || undefined,
          focusKeyword: String(body.seo.focusKeyword || "").trim() || undefined,
          ogTitle: String(body.seo.ogTitle || "").trim() || undefined,
          ogDescription: String(body.seo.ogDescription || "").trim() || undefined,
          ogImage: String(body.seo.ogImage || "").trim() || undefined,
          twitterTitle: String(body.seo.twitterTitle || "").trim() || undefined,
          twitterDescription: String(body.seo.twitterDescription || "").trim() || undefined,
        }
      : undefined;

    await connectToDatabase();

    const existing = await BlogModel.findOne({ slug });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog post with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const blog = await BlogModel.create({
      title,
      slug,
      category,
      image,
      excerpt,
      content,
      isActive,
      seo,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully.",
        data: {
          ...blog.toObject(),
          _id: blog._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/blogs error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create blog post right now.",
      },
      { status: 500 }
    );
  }
}
