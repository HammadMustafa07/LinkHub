import { ObjectId } from "mongodb";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Validate ID
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        {
          status: 400,
        }
      );
    }

    // Validate MongoDB ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid link ID",
        },
        {
          status: 400,
        }
      );
    }

    // Connect to MongoDB
    const db = await connectDB();

    const linksCollection = db.collection("links");

    // Delete link
    const result = await linksCollection.deleteOne({
      _id: new ObjectId(id),
    });


    // Check if document existed
    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Link not found",
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json(
      {
        success: true,
        message: "Link deleted successfully",
      },
      {
        status: 200,
      }
    );


  } catch (error) {
    console.error("DELETE LINK ERROR:", error);

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

