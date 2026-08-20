import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import type { CreateBlogPayload } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await connectToDatabase();

    const blog = await BlogModel.findById(id).lean();

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
    console.error("GET /api/admin/blogs/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load blog post right now.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
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

    // If slug changed, check for conflict with another post
    const existing = await BlogModel.findOne({ slug, _id: { $ne: id } });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog post with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        category,
        image,
        excerpt,
        content,
        isActive,
        seo,
      },
      { new: true }
    ).lean();

    if (!updatedBlog) {
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
      message: "Blog post updated successfully.",
      data: {
        ...updatedBlog,
        _id: updatedBlog._id.toString(),
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/blogs/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update blog post right now.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await connectToDatabase();

    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
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
      message: "Blog post deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/blogs/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete blog post right now.",
      },
      { status: 500 }
    );
  }
}
