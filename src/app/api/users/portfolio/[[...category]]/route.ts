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

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parsePositiveNumber(value: string | null, fallback: number) {
  const parsedValue = Number.parseInt(value || "", 10);

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { category } = await context.params;
    const selectedCategory = category?.[0];
    const { searchParams } = new URL(request.url);
    const page = parsePositiveNumber(searchParams.get("page"), 1);
    const limit = parsePositiveNumber(searchParams.get("limit"), 12);
    const search = searchParams.get("search")?.trim() || "";
    const skip = (page - 1) * limit;

    await connectToDatabase();

    const filters: {
      isActive: boolean;
      category?: string;
      $or?: Array<Record<string, unknown>>;
    } = {
      isActive: true,
    };

    if (selectedCategory) {
      filters.category = selectedCategory;
    }

    if (search) {
      const searchPattern = new RegExp(escapeRegex(search), "i");

      filters.$or = [
        { title: searchPattern },
        { category: searchPattern },
        { tags: searchPattern },
      ];
    }

    const [portfolioCards, totalItems, categories] = await Promise.all([
      PortfolioCardModel.find(filters)
        .sort({ priority: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      PortfolioCardModel.countDocuments(filters),
      PortfolioCardModel.distinct("category", { isActive: true }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalItems / limit));

    return NextResponse.json({
      success: true,
      data: {
        items: portfolioCards.map((portfolioCard) => ({
          ...portfolioCard,
          _id: portfolioCard._id.toString(),
        })),
        categories,
        pagination: {
          page,
          limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
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
