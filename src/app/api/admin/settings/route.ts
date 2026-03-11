import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import SiteSettingsModel from "@/models/SiteSettings";
import type { UpsertSiteSettingsPayload } from "@/types";

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
    console.error("GET /api/admin/settings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load website settings right now.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<UpsertSiteSettingsPayload>;

    const payload: UpsertSiteSettingsPayload = {
      ownerName: String(body.ownerName || "").trim(),
      email: String(body.email || "").trim().toLowerCase(),
      phone: String(body.phone || "").trim(),
      phoneE164: String(body.phoneE164 || "").trim(),
      whatsapp: String(body.whatsapp || "").trim(),
      instagram: String(body.instagram || "").trim(),
      linkedin: String(body.linkedin || "").trim(),
      facebook: String(body.facebook || "").trim(),
    };

    if (
      !payload.ownerName ||
      !payload.email ||
      !payload.phone ||
      !payload.whatsapp ||
      !payload.instagram ||
      !payload.linkedin ||
      !payload.facebook
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All settings fields are required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingSettings = await SiteSettingsModel.findOne().sort({ createdAt: 1 });

    const settings = existingSettings
      ? await SiteSettingsModel.findByIdAndUpdate(existingSettings._id, payload, {
          new: true,
          runValidators: true,
        })
      : await SiteSettingsModel.create(payload);

    return NextResponse.json({
      success: true,
      message: "Website settings saved successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("PUT /api/admin/settings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save website settings right now.",
      },
      { status: 500 }
    );
  }
}
