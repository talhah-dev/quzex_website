import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/dashboard", "/api/admin/"],
      },
      // AI Search & Citation Engines
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Applebot",
          "Applebot-Extended",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/developer", "/openapi.json"],
        disallow: ["/login", "/dashboard", "/api/admin/"],
      },
      // AI Model Discovery & Training Bots
      {
        userAgent: [
          "GPTBot",
          "Google-Extended",
          "Claude-Web",
          "CCBot",
          "Bytespider",
          "Meta-ExternalAgent",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/login", "/dashboard", "/api/admin/"],
      },
    ],
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
    host: SITE_CONFIG.siteUrl,
  };
}
