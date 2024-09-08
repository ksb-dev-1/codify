import { NextResponse } from "next/server";
import { auth } from "@/auth";

// lib
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const userID = session?.user?.id;

  if (!userID) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: userID },
      include: {
        question: {
          select: {
            id: true,
            question: true,
            codeSnippet: true,
            options: true,
            correctOption: true,
            explanation: true,
            difficulty: true,
            isPremium: true,
            topic: {
              select: {
                name: true,
              },
            },
            questionStatuses: {
              select: {
                status: true,
              },
            },
          },
        },
      },
    });

    if (bookmarks.length === 0) {
      return NextResponse.json(
        { message: "No bookmarks found for the user" },
        { status: 200 }
      );
    }

    return NextResponse.json({ bookmarks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookmarks with question details:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}
