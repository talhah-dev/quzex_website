import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import PortfolioCardModel from "@/models/PortfolioCard";
import type { PortfolioCardCategory } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      title?: string;
      image?: string;
      tags?: string[];
      category?: PortfolioCardCategory;
      href?: string;
      priority?: number;
      showOnHome?: boolean;
    };

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

    const count = await PortfolioCardModel.countDocuments();
    const portfolioCard = await PortfolioCardModel.create({
      title,
      image,
      tags,
      category,
      href: href || undefined,
      priority: typeof body.priority === "number" ? body.priority : count + 1,
      showOnHome,
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Portfolio card created successfully.",
        data: {
          ...portfolioCard.toObject(),
          _id: portfolioCard._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/portfolio error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create portfolio card right now.",
      },
      { status: 500 }
    );
  }
}
