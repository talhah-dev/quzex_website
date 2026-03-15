import { NextRequest, NextResponse } from "next/server";
import type { CountryCode } from "@/lib/countries";
import connectToDatabase from "@/lib/dbConnect";
import TestimonialModel from "@/models/Testimonial";
import type { CreateTestimonialPayload, TestimonialCategory, TestimonialType } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reviewCategories: TestimonialCategory[] = ["Development", "Redesign", "AI", "Marketing"];
const reviewTypes: TestimonialType[] = ["text", "audio"];

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await connectToDatabase();

    const testimonial = await TestimonialModel.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...testimonial.toObject(),
        _id: testimonial._id.toString(),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/testimonials/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load review right now.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as CreateTestimonialPayload;

    const name = String(body.name || "").trim();
    const country = String(body.country || "").trim();
    const flag = String(body.flag || "").trim().toUpperCase() as CountryCode;
    const category = String(body.category || "").trim() as TestimonialCategory;
    const rating = String(body.rating || "").trim();
    const timeAgo = String(body.timeAgo || "").trim();
    const type = String(body.type || "").trim() as TestimonialType;
    const review = String(body.review || "").trim();
    const profileImage = String(body.profileImage || "").trim();
    const audioUrl = String(body.audioUrl || "").trim();

    if (!name || !country || !flag || !category || !rating || !timeAgo || !type || !review) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, country, flag, category, rating, time, type, and review are required.",
        },
        { status: 400 }
      );
    }

    if (!reviewCategories.includes(category)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid review category.",
        },
        { status: 400 }
      );
    }

    if (!reviewTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid review type.",
        },
        { status: 400 }
      );
    }

    if (type === "audio" && !audioUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Audio review URL is required for audio testimonials.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
      id,
      {
        name,
        country,
        flag,
        category,
        rating,
        timeAgo,
        type,
        review,
        profileImage: profileImage || undefined,
        audioUrl: type === "audio" ? audioUrl : undefined,
      },
      { new: true }
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Review updated successfully.",
      data: {
        ...updatedTestimonial.toObject(),
        _id: updatedTestimonial._id.toString(),
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/testimonials/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update review right now.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await connectToDatabase();

    const deletedTestimonial = await TestimonialModel.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/testimonials/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete review right now.",
      },
      { status: 500 }
    );
  }
}
