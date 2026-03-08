import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ContactInquiryModel from "@/models/ContactInquiry";

type ContactRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  service_interest?: string;
  message?: string;
};

function normalizeValue(value?: string) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    const payload = {
      name: normalizeValue(body.name),
      email: normalizeValue(body.email),
      phone: normalizeValue(body.phone),
      service: normalizeValue(body.service || body.service_interest),
      message: normalizeValue(body.message),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.service || !payload.message) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const inquiry = await ContactInquiryModel.create(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        data: {
          id: inquiry._id.toString(),
          status: inquiry.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/users/contact error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit enquiry right now.",
      },
      { status: 500 }
    );
  }
}
