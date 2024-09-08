import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userID = session?.user?.id;

    if (!userID) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { questionID } = await req.json();

    if (!questionID || typeof questionID !== "string") {
      return NextResponse.json(
        { error: "Invalid question ID" },
        { status: 400 }
      );
    }

    // Check if the bookmark exists
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        questionId: questionID,
        userId: userID,
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });

      return NextResponse.json(
        { message: "Question removed from bookmarks", isBookmarked: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Bookmark not found", isBookmarked: false },
      { status: 404 }
    );
  } catch (error) {
    console.error("Failed to remove bookmark:", error);
    return NextResponse.json(
      { error: "Failed to remove bookmark" },
      { status: 500 }
    );
  }
}
