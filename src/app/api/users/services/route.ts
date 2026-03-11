import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ServiceModel from "@/models/Service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const services = await ServiceModel.find({
      isActive: true,
      showOnServicesPage: true,
    })
      .sort({ priority: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: services.map((service) => ({
        ...service,
        _id: service._id.toString(),
      })),
    });
  } catch (error) {
    console.error("GET /api/users/services error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load services right now.",
      },
      { status: 500 }
    );
  }
}
