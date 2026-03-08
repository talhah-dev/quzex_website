import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ContactInquiryModel from "@/models/ContactInquiry";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const inquiries = await ContactInquiryModel.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: inquiries.map((inquiry) => ({
        ...inquiry,
        _id: inquiry._id.toString(),
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/inquiries error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load enquiries right now.",
      },
      { status: 500 }
    );
  }
}
