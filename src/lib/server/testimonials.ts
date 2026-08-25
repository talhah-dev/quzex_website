import connectToDatabase from "@/lib/dbConnect";
import TestimonialModel from "@/models/Testimonial";
import type { TestimonialRecord } from "@/types";

export async function getTestimonialsServer(): Promise<TestimonialRecord[]> {
  try {
    await connectToDatabase();
    const docs = await TestimonialModel.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return docs.map((doc: any) => ({
      _id: doc._id.toString(),
      name: doc.name,
      country: doc.country,
      flag: doc.flag,
      category: doc.category,
      rating: doc.rating,
      timeAgo: doc.timeAgo,
      type: doc.type,
      review: doc.review,
      profileImage: doc.profileImage ?? "",
      audioUrl: doc.audioUrl ?? "",
      isActive: doc.isActive ?? true,
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
    }));
  } catch (error) {
    console.error("Error fetching testimonials on server:", error);
    return [];
  }
}
