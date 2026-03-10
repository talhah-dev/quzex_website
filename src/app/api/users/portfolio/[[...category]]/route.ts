import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import PortfolioCardModel from "@/models/PortfolioCard";

type RouteContext = {
  params: Promise<{
    category?: string[];
  }>;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { category } = await context.params;
    const selectedCategory = category?.[0];

    await connectToDatabase();

    const filters: {
      isActive: boolean;
      category?: string;
    } = {
      isActive: true,
    };

    if (selectedCategory) {
      filters.category = selectedCategory;
    }

    const [portfolioCards, categories] = await Promise.all([
      PortfolioCardModel.find(filters).sort({ priority: 1, createdAt: -1 }).lean(),
      PortfolioCardModel.distinct("category", { isActive: true }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items: portfolioCards.map((portfolioCard) => ({
          ...portfolioCard,
          _id: portfolioCard._id.toString(),
        })),
        categories,
      },
    });
  } catch (error) {
    console.error("GET /api/users/portfolio/[[...category]] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load portfolio cards right now.",
      },
      { status: 500 }
    );
  }
}
