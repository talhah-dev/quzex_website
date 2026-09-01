import type { MetadataRoute } from "next";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import { SITE_CONFIG } from "@/lib/site";
import ServiceModel from "@/models/Service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

function buildUrl(path: string) {
  return path === "/" ? SITE_CONFIG.siteUrl : `${SITE_CONFIG.siteUrl}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: SitemapEntry[] = [
    {
      url: buildUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: buildUrl("/services"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: buildUrl("/work"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: buildUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: buildUrl("/reviews"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: buildUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: buildUrl("/developer"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: buildUrl("/llms.txt"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: buildUrl("/llms-full.txt"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: buildUrl("/openapi.json"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let blogPages: SitemapEntry[] = [];

  try {
    const blogs = await BlogModel.find({ isActive: true })
      .select("slug updatedAt")
      .lean();

    blogPages = blogs.map((blog) => ({
      url: buildUrl(`/blog/${blog.slug}`),
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Unable to load dynamic blog posts for sitemap:", error);
  }

  let servicePages: SitemapEntry[] = [];

  try {
    await connectToDatabase();

    const services = await ServiceModel.find({
      isActive: true,
      showOnServicesPage: true,
    })
      .select("slug updatedAt")
      .lean();

    servicePages = services.map((service) => ({
      url: buildUrl(`/services/${service.slug}`),
      lastModified: service.updatedAt ? new Date(service.updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Unable to load dynamic services for sitemap:", error);
  }

  return [...staticPages, ...blogPages, ...servicePages];
}
