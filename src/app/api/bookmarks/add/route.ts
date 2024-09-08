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

    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        questionId: questionID,
        userId: userID,
      },
    });

    if (!existingBookmark) {
      await prisma.bookmark.create({
        data: {
          questionId: questionID,
          userId: userID,
        },
      });

      return NextResponse.json(
        { message: "Question added to bookmarks", isBookmarked: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Question already bookmarked", isBookmarked: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to bookmark question:", error);
    return NextResponse.json(
      { error: "Failed to bookmark question" },
      { status: 500 }
    );
  }
}
