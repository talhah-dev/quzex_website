import type { MetadataRoute } from "next";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import ServiceModel from "@/models/Service";
import { SITE_CONFIG } from "@/lib/site";

export const runtime = "nodejs";
export const revalidate = 86400;

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
  const siteBuildDate = new Date("2026-03-01T00:00:00.000Z");

  const staticPages: SitemapEntry[] = [
    {
      url: buildUrl("/"),
      lastModified: siteBuildDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildUrl("/about"),
      lastModified: siteBuildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: buildUrl("/services"),
      lastModified: siteBuildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: buildUrl("/work"),
      lastModified: siteBuildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: buildUrl("/contact"),
      lastModified: siteBuildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: buildUrl("/reviews"),
      lastModified: siteBuildDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: buildUrl("/blog"),
      lastModified: siteBuildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: buildUrl("/developer"),
      lastModified: siteBuildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: buildUrl("/privacy-policy"),
      lastModified: siteBuildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: buildUrl("/terms-of-service"),
      lastModified: siteBuildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: buildUrl("/brand-assets"),
      lastModified: siteBuildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let blogPages: SitemapEntry[] = [];
  let servicePages: SitemapEntry[] = [];

  try {
    await connectToDatabase();

    const blogs = await BlogModel.find({ isActive: true })
      .select("slug updatedAt createdAt")
      .lean();

    blogPages = blogs.map((blog) => ({
      url: buildUrl(`/blog/${blog.slug}`),
      lastModified: blog.updatedAt
        ? new Date(blog.updatedAt)
        : blog.createdAt
        ? new Date(blog.createdAt)
        : siteBuildDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const services = await ServiceModel.find({
      isActive: true,
      showOnServicesPage: true,
    })
      .select("slug updatedAt createdAt")
      .lean();

    servicePages = services.map((service) => ({
      url: buildUrl(`/services/${service.slug}`),
      lastModified: service.updatedAt
        ? new Date(service.updatedAt)
        : service.createdAt
        ? new Date(service.createdAt)
        : siteBuildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Unable to load dynamic entries for sitemap:", error);
  }

  return [...staticPages, ...blogPages, ...servicePages];
}
