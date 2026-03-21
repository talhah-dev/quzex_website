import type { MetadataRoute } from "next";
import connectToDatabase from "@/lib/dbConnect";
import { BLOG_POSTS } from "@/lib/blog";
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
  ];

  const blogPages: SitemapEntry[] = BLOG_POSTS.map((post) => ({
    url: buildUrl(`/blog/${post.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

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
