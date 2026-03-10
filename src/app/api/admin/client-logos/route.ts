import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ClientLogoModel from "@/models/ClientLogo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  try {
    await wait(1200);
    await connectToDatabase();

    const logos = await ClientLogoModel.find({ isActive: true }).sort({
      sortOrder: 1,
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: logos.map((logo) => ({
        ...logo.toObject(),
        _id: logo._id.toString(),
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/client-logos error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load client logos right now.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name?: string;
      url?: string;
    };

    const name = String(body.name || "").trim();
    const url = String(body.url || "").trim();

    if (!name || !url) {
      return NextResponse.json(
        {
          success: false,
          message: "Logo name and URL are required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const count = await ClientLogoModel.countDocuments();
    const logo = await ClientLogoModel.create({
      name,
      src: url,
      isActive: true,
      sortOrder: count + 1,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Client logo uploaded successfully.",
        data: {
          ...logo.toObject(),
          _id: logo._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/client-logos error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save client logo right now.",
      },
      { status: 500 }
    );
  }
}
