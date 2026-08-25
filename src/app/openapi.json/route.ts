import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/site";

export const runtime = "nodejs";

export async function GET() {
  const openApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "Quzex Public & Agent REST API",
      description:
        "Public API specifications for Quzex website development services, portfolio, blog articles, testimonials, and client inquiry submissions.",
      version: "1.0.0",
      contact: {
        name: SITE_CONFIG.name,
        email: SITE_CONFIG.email,
        url: SITE_CONFIG.siteUrl,
      },
    },
    servers: [
      {
        url: SITE_CONFIG.siteUrl,
        description: "Production Server",
      },
    ],
    paths: {
      "/api/users/contact": {
        post: {
          summary: "Submit a client project inquiry or consultation request",
          description:
            "Allows AI agents or website visitors to programmatically submit project inquiries to Quzex.",
          operationId: "submitContactInquiry",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "message"],
                  properties: {
                    name: { type: "string", example: "Jane Doe" },
                    email: { type: "string", format: "email", example: "jane@example.com" },
                    phone: { type: "string", example: "+1234567890" },
                    service: { type: "string", example: "Dynamic Website Development" },
                    budget: { type: "string", example: "$1,000 - $3,000" },
                    message: {
                      type: "string",
                      example: "We need a custom website redesign focused on performance and conversions.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Inquiry successfully received.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: { type: "string", example: "Inquiry submitted successfully." },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid input or missing required fields.",
            },
          },
        },
      },
      "/api/users/services": {
        get: {
          summary: "Get active web development services",
          operationId: "getServices",
          responses: {
            "200": {
              description: "List of active web development services.",
            },
          },
        },
      },
      "/api/users/portfolio": {
        get: {
          summary: "Get portfolio projects",
          operationId: "getPortfolio",
          parameters: [
            {
              name: "page",
              in: "query",
              schema: { type: "integer", default: 1 },
            },
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", default: 10 },
            },
            {
              name: "category",
              in: "query",
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Paginated list of portfolio projects.",
            },
          },
        },
      },
      "/api/users/blogs": {
        get: {
          summary: "Get published blog articles",
          operationId: "getBlogs",
          responses: {
            "200": {
              description: "List of published blog articles.",
            },
          },
        },
      },
      "/api/users/testimonials": {
        get: {
          summary: "Get client testimonials and reviews",
          operationId: "getTestimonials",
          responses: {
            "200": {
              description: "List of client testimonials.",
            },
          },
        },
      },
    },
  };

  return NextResponse.json(openApiSpec, {
    status: 200,
    headers: {
      "Vary": "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
