import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import PortfolioCardModel from "@/models/PortfolioCard";
import type { PortfolioCardCategory } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Portfolio card id is required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deletedPortfolioCard = await PortfolioCardModel.findByIdAndDelete(id);

    if (!deletedPortfolioCard) {
      return NextResponse.json(
        {
          success: false,
          message: "Portfolio card not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio card deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/portfolio/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete portfolio card right now.",
      },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Portfolio card id is required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const portfolioCard = await PortfolioCardModel.findById(id);

    if (!portfolioCard) {
      return NextResponse.json(
        {
          success: false,
          message: "Portfolio card not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...portfolioCard.toObject(),
        _id: portfolioCard._id.toString(),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/portfolio/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load portfolio card right now.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      title?: string;
      image?: string;
      tags?: string[];
      category?: PortfolioCardCategory;
      href?: string;
      priority?: number;
      showOnHome?: boolean;
    };

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Portfolio card id is required.",
        },
        { status: 400 }
      );
    }

    const title = String(body.title || "").trim();
    const image = String(body.image || "").trim();
    const category = body.category;
    const href = String(body.href || "").trim();
    const tags = Array.isArray(body.tags)
      ? body.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [];
    const showOnHome = Boolean(body.showOnHome);

    if (!title || !image || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, image, and category are required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const portfolioCard = await PortfolioCardModel.findByIdAndUpdate(
      id,
      {
        title,
        image,
        tags,
        category,
        href: href || undefined,
        priority: typeof body.priority === "number" ? body.priority : 1,
        showOnHome,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!portfolioCard) {
      return NextResponse.json(
        {
          success: false,
          message: "Portfolio card not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio card updated successfully.",
      data: {
        ...portfolioCard.toObject(),
        _id: portfolioCard._id.toString(),
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/portfolio/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update portfolio card right now.",
      },
      { status: 500 }
    );
  }
}
