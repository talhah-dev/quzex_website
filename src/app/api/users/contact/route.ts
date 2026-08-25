import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ContactInquiryModel from "@/models/ContactInquiry";
import { createProblemDetailsResponse } from "@/lib/api-error";

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
    let body: ContactRequestBody = {};
    try {
      body = (await request.json()) as ContactRequestBody;
    } catch {
      return createProblemDetailsResponse({
        status: 400,
        code: "ERR_INVALID_JSON",
        title: "Bad Request",
        detail: "The request body could not be parsed as valid JSON.",
        hint: "Provide a valid JSON payload with 'name', 'email', and 'message'.",
      });
    }

    const payload = {
      name: normalizeValue(body.name),
      email: normalizeValue(body.email),
      phone: normalizeValue(body.phone),
      service: normalizeValue(body.service || body.service_interest),
      message: normalizeValue(body.message),
    };

    const missingFields: string[] = [];
    if (!payload.name) missingFields.push("name");
    if (!payload.email) missingFields.push("email");
    if (!payload.message) missingFields.push("message");

    if (missingFields.length > 0) {
      return createProblemDetailsResponse({
        status: 400,
        code: "ERR_MISSING_REQUIRED_FIELDS",
        title: "Missing Required Fields",
        detail: `The following required fields are missing: ${missingFields.join(", ")}.`,
        hint: "Ensure 'name', 'email', and 'message' are provided in the JSON body.",
        invalidParams: missingFields.map((field) => ({
          name: field,
          reason: "Field is required and cannot be empty.",
        })),
      });
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
      {
        status: 201,
        headers: {
          "Vary": "Accept, Accept-Encoding",
        },
      }
    );
  } catch (error) {
    console.error("POST /api/users/contact error:", error);

    return createProblemDetailsResponse({
      status: 500,
      code: "ERR_INTERNAL_SERVER_ERROR",
      title: "Internal Server Error",
      detail: "An unexpected error occurred while processing the contact inquiry.",
      hint: "Please try again shortly or contact support at quzex@gmail.com.",
    });
  }
}
