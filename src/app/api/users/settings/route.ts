import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import SiteSettingsModel from "@/models/SiteSettings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const settings = await SiteSettingsModel.findOne().sort({ createdAt: 1 });

    return NextResponse.json({
      success: true,
      data: settings ?? null,
    });
  } catch (error) {
    console.error("GET /api/users/settings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load website settings right now.",
      },
      { status: 500 }
    );
  }
}
