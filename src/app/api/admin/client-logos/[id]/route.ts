import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import ClientLogoModel from "@/models/ClientLogo";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function getClientLogoId(context: RouteContext) {
  const { id } = await context.params;
  return id;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const id = await getClientLogoId(context);
    const body = (await request.json()) as {
      name?: string;
      url?: string;
    };

    const name = String(body.name || "").trim();
    const url = String(body.url || "").trim();

    if (!id || !name || !url) {
      return NextResponse.json(
        {
          success: false,
          message: "Logo id, name, and URL are required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const logo = await ClientLogoModel.findByIdAndUpdate(
      id,
      {
        name,
        src: url,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!logo) {
      return NextResponse.json(
        {
          success: false,
          message: "Client logo not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Client logo updated successfully.",
      data: {
        ...logo.toObject(),
        _id: logo._id.toString(),
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/client-logos/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update client logo right now.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const id = await getClientLogoId(context);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Logo id is required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const logo = await ClientLogoModel.findByIdAndDelete(id);

    if (!logo) {
      return NextResponse.json(
        {
          success: false,
          message: "Client logo not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Client logo deleted successfully.",
      data: {
        ...logo.toObject(),
        _id: logo._id.toString(),
      },
    });
  } catch (error) {
    console.error("DELETE /api/admin/client-logos/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete client logo right now.",
      },
      { status: 500 }
    );
  }
}
