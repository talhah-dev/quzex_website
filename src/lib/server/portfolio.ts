import connectToDatabase from "@/lib/dbConnect";
import PortfolioCardModel from "@/models/PortfolioCard";
import type { PortfolioCardRecord } from "@/types";

export async function getPortfolioCardsServer(): Promise<PortfolioCardRecord[]> {
  try {
    await connectToDatabase();
    const docs = await PortfolioCardModel.find({ isActive: true })
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    return docs.map((doc: any) => ({
      _id: doc._id.toString(),
      title: doc.title,
      image: doc.image,
      tags: doc.tags ?? [],
      category: doc.category,
      href: doc.href ?? "",
      priority: doc.priority ?? 0,
      showOnHome: doc.showOnHome ?? false,
      isActive: doc.isActive ?? true,
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : "",
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : "",
    }));
  } catch (error) {
    console.error("Error fetching portfolio cards on server:", error);
    return [];
  }
}

