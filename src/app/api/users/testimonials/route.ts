import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import TestimonialModel from "@/models/Testimonial";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const testimonials = await TestimonialModel.find({
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: testimonials.map((testimonial) => ({
        ...testimonial,
        _id: testimonial._id.toString(),
      })),
    });
  } catch (error) {
    console.error("GET /api/users/testimonials error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load reviews right now.",
      },
      { status: 500 }
    );
  }
}
