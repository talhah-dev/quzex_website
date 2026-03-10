import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import AdminUserModel from "@/models/AdminUser";
import type { CreateAdminPayload } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<CreateAdminPayload>;

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();
    const role = body.role === "admin" ? "admin" : "admin";

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters long.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingAdmin = await AdminUserModel.findOne({ email });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "An admin with this email already exists.",
        },
        { status: 409 }
      );
    }

    const admin = await AdminUserModel.create({
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin created successfully.",
        data: {
          _id: admin._id.toString(),
          email: admin.email,
          role: admin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/auth/signup error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create admin right now.",
      },
      { status: 500 }
    );
  }
}
