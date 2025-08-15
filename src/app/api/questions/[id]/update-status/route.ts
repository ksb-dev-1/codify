import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// lib
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // ✅ Check authentication
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Parse body
    const { questionId, status } = await req.json();

    if (!questionId) {
      return NextResponse.json(
        { success: false, message: "Question ID is required" },
        { status: 400 }
      );
    }

    // ✅ Check if status exists
    const existingStatus = await prisma.questionStatus.findFirst({
      where: { questionId, userId },
    });

    if (existingStatus) {
      // Update
      await prisma.questionStatus.update({
        where: { id: existingStatus.id },
        data: { status },
      });
    } else {
      // Create
      await prisma.questionStatus.create({
        data: { questionId, userId, status },
      });
    }

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Failed to update question status:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update question status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
