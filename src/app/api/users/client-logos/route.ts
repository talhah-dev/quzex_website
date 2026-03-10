import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ClientLogoModel from "@/models/ClientLogo";
import type { ClientLogoListItem } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const logos = await ClientLogoModel.find({ isActive: true }).sort({
      sortOrder: 1,
      createdAt: -1,
    });

    const uploadedLogos: ClientLogoListItem[] = logos.map((logo) => ({
      id: logo._id.toString(),
      name: logo.name,
      src: logo.src,
    }));

    return NextResponse.json({
      success: true,
      data: uploadedLogos,
    });
  } catch (error) {
    console.error("GET /api/users/client-logos error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load client logos right now.",
      },
      { status: 500 }
    );
  }
}
