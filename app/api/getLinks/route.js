import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        {
          status: 400,
        }
      );
    }

    // Connect to database
    const db = await connectDB();

    const linksCollection = db.collection("links");

    // Fetch user's links
    const links = await linksCollection
      .find({ userId })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        message: "Links fetched successfully",
        data: links,
        count: links.length,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error("GET LINKS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}