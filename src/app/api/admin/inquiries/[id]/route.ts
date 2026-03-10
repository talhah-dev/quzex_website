import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ContactInquiryModel from "@/models/ContactInquiry";
import type { ContactInquiryStatus } from "@/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function getInquiryId(context: RouteContext) {
  const { id } = await context.params;
  return id;
}

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const id = await getInquiryId(context);
    const body = (await request.json()) as {
      status?: ContactInquiryStatus;
    };

    if (!id || !body.status) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry id and status are required.",
        },
        { status: 400 }
      );
    }

    if (!["new", "reviewed"].includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid inquiry status.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const inquiry = await ContactInquiryModel.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry updated successfully.",
      data: {
        ...inquiry.toObject(),
        _id: inquiry._id.toString(),
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/inquiries/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update inquiry right now.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const id = await getInquiryId(context);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry id is required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const inquiry = await ContactInquiryModel.findByIdAndDelete(id);

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully.",
      data: {
        ...inquiry.toObject(),
        _id: inquiry._id.toString(),
      },
    });
  } catch (error) {
    console.error("DELETE /api/admin/inquiries/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete inquiry right now.",
      },
      { status: 500 }
    );
  }
}
