import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ServiceModel from "@/models/Service";
import type { ServicePricingPlan } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await connectToDatabase();

    const service = await ServiceModel.findById(id);

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...service.toObject(),
        _id: service._id.toString(),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/services/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load service right now.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const slug = String(body.slug || "").trim().toLowerCase();
    const title = String(body.title || "").trim();
    const image = String(body.image || "").trim();
    const category = String(body.category || "").trim();
    const duration = String(body.duration || "").trim();
    const description = String(body.description || "").trim();
    const longDescription = String(body.longDescription || "").trim();
    const overviewTitle = String(body.overviewTitle || "").trim();
    const deliveryLabel = String(body.deliveryLabel || "").trim();
    const nextStepTitle = String(body.nextStepTitle || "").trim();
    const nextStepDescription = String(body.nextStepDescription || "").trim();
    const pricingHeading = String(body.pricingHeading || "").trim();
    const pricingDescription = String(body.pricingDescription || "").trim();

    if (!slug || !title || !image || !category || !duration || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug, title, image, category, duration, and description are required.",
        },
        { status: 400 }
      );
    }

    const highlights = Array.isArray(body.highlights)
      ? body.highlights.map((item: string) => String(item).trim()).filter(Boolean)
      : [];

    const pricingPlans: ServicePricingPlan[] = Array.isArray(body.pricingPlans)
      ? body.pricingPlans
          .map((plan: unknown) => {
            const currentPlan = (plan || {}) as Record<string, unknown>;

            return {
              name: String(currentPlan.name || "").trim(),
              price: Number(currentPlan.price || 0),
              description: String(currentPlan.description || "").trim(),
              deliveryTime: String(currentPlan.deliveryTime || "").trim() || undefined,
              features: Array.isArray(currentPlan.features)
                ? currentPlan.features.map((item: string) => String(item).trim()).filter(Boolean)
                : [],
              isRecommended: Boolean(currentPlan.isRecommended),
            };
          })
          .filter((plan: ServicePricingPlan) => plan.name && plan.description)
      : [];

    await connectToDatabase();

    const updatedService = await ServiceModel.findByIdAndUpdate(
      id,
      {
        slug,
        title,
        image,
        category,
        duration,
        description,
        longDescription: longDescription || undefined,
        overviewTitle: overviewTitle || undefined,
        deliveryLabel: deliveryLabel || undefined,
        highlights,
        nextStepTitle: nextStepTitle || undefined,
        nextStepDescription: nextStepDescription || undefined,
        pricingHeading: pricingHeading || undefined,
        pricingDescription: pricingDescription || undefined,
        pricingPlans,
        showOnServicesPage: Boolean(body.showOnServicesPage),
        priority: typeof body.priority === "number" ? body.priority : 1,
      },
      { new: true }
    );

    if (!updatedService) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully.",
      data: {
        ...updatedService.toObject(),
        _id: updatedService._id.toString(),
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/services/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update service right now.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await connectToDatabase();

    const deletedService = await ServiceModel.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/services/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete service right now.",
      },
      { status: 500 }
    );
  }
}
