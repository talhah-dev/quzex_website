import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import TestimonialModel from "@/models/Testimonial";
import type {
  CreateTestimonialPayload,
  TestimonialCategory,
  TestimonialType,
} from "@/types";
import type { CountryCode } from "@/lib/countries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reviewCategories: TestimonialCategory[] = ["Development", "Redesign", "AI", "Marketing"];
const reviewTypes: TestimonialType[] = ["text", "audio"];

export async function POST(request: NextRequest) {
  try {
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

    const testimonial = await TestimonialModel.create({
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
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Review created successfully.",
        data: {
          ...testimonial.toObject(),
          _id: testimonial._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/testimonials error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create review right now.",
      },
      { status: 500 }
    );
  }
}
