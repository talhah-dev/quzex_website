import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/site";

export const runtime = "nodejs";

export async function GET() {
  const openApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "Quzex Public & Agent REST API",
      description:
        "Official REST API specifications for Quzex website development services, portfolio projects, blog articles, testimonials, and client inquiry submissions. Supports path-based versioning (/api/v1/) and RFC 9457 ProblemDetails typed error responses.",
      version: "1.0.0",
      "x-api-version": "1.0.0",
      "x-deprecation-policy":
        "Quzex API uses semantic versioning. Major versions (e.g. /v1/) are supported for a minimum of 12 months following any major update. Deprecations are signaled via standard 'Deprecation' and 'Sunset' HTTP headers.",
      contact: {
        name: SITE_CONFIG.name,
        email: SITE_CONFIG.email,
        url: SITE_CONFIG.siteUrl,
      },
    },
    servers: [
      {
        url: `${SITE_CONFIG.siteUrl}/api/v1`,
        description: "Production API Server (v1 - Preferred)",
      },
      {
        url: `${SITE_CONFIG.siteUrl}/api/users`,
        description: "Legacy Unversioned API Server",
      },
    ],
    paths: {
      "/contact": {
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
                      message: { type: "string", example: "Enquiry submitted successfully." },
                      data: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "64aef..." },
                          status: { type: "string", example: "new" },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad Request - Validation error or missing required fields.",
              content: {
                "application/problem+json": {
                  schema: { $ref: "#/components/schemas/ProblemDetails" },
                },
              },
            },
            "500": {
              description: "Internal Server Error.",
              content: {
                "application/problem+json": {
                  schema: { $ref: "#/components/schemas/ProblemDetails" },
                },
              },
            },
          },
        },
      },
      "/services": {
        get: {
          summary: "Get active web development services",
          operationId: "getServices",
          responses: {
            "200": {
              description: "List of active web development services.",
            },
            "500": {
              description: "Internal Server Error.",
              content: {
                "application/problem+json": {
                  schema: { $ref: "#/components/schemas/ProblemDetails" },
                },
              },
            },
          },
        },
      },
      "/portfolio": {
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
            "400": {
              description: "Invalid query parameters.",
              content: {
                "application/problem+json": {
                  schema: { $ref: "#/components/schemas/ProblemDetails" },
                },
              },
            },
          },
        },
      },
      "/blogs": {
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
      "/testimonials": {
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
    components: {
      schemas: {
        ProblemDetails: {
          type: "object",
          description: "Standardized RFC 9457 Problem Details for HTTP APIs",
          required: ["type", "title", "status", "code", "detail", "timestamp"],
          properties: {
            type: {
              type: "string",
              format: "uri",
              example: "https://quzex.co/developer#ERR_MISSING_REQUIRED_FIELDS",
            },
            title: {
              type: "string",
              example: "Missing Required Fields",
            },
            status: {
              type: "integer",
              example: 400,
            },
            code: {
              type: "string",
              example: "ERR_MISSING_REQUIRED_FIELDS",
            },
            detail: {
              type: "string",
              example: "The following required fields are missing: name, email, message.",
            },
            hint: {
              type: "string",
              example: "Ensure 'name', 'email', and 'message' are provided in the JSON body.",
            },
            invalidParams: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", example: "email" },
                  reason: { type: "string", example: "Field is required." },
                },
              },
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2026-08-25T07:13:00.000Z",
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
