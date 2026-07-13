
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      userId,
      link,
      linkText,
      imgUrl,
      userName,
    } = body;

    // Validate required fields
    if (!userId || !link || !linkText || !imgUrl || !userName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All fields (userId, link, linkText, imgUrl, userName) are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Connect to MongoDB
    const db = await connectDB();

    const linksCollection = db.collection("links");

    // Insert new link
    const result = await linksCollection.insertOne({
      userId,
      link,
      linkText,
      imgUrl,
      userName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });


    return NextResponse.json(
      {
        success: true,
        message: "Link added successfully",
        data: {
          insertedId: result.insertedId.toString(),
        },
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error("ADD LINK ERROR:", error);

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

