import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")
    .replace(/-+/g, "-");
}

function sanitizeFolder(value: string) {
  return value
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9/_-]/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderValue = String(formData.get("folder") || "uploads");
    const folder = sanitizeFolder(folderValue) || "uploads";

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Image file is required.",
        },
        { status: 400 }
      );
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          message: "BLOB_READ_WRITE_TOKEN is missing.",
        },
        { status: 500 }
      );
    }

    const fileName = sanitizeFileName(file.name || `${Date.now()}.png`);
    const blob = await put(`${folder}/${Date.now()}-${fileName}`, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: file.type || undefined,
    });

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully.",
      data: {
        url: blob.url,
        pathname: blob.pathname,
      },
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to upload file right now.",
      },
      { status: 500 }
    );
  }
}
