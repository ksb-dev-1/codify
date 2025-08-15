import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// lib
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
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
    const { questionId } = await req.json();

    if (!questionId) {
      return NextResponse.json(
        { success: false, message: "Question ID is required" },
        { status: 400 }
      );
    }

    // ✅ Toggle save
    const existingSaved = await prisma.savedQuestion.findFirst({
      where: { userId, questionId },
    });

    let result;
    if (existingSaved) {
      await prisma.savedQuestion.delete({ where: { id: existingSaved.id } });
      result = { success: true, saved: false };
    } else {
      await prisma.savedQuestion.create({ data: { userId, questionId } });
      result = { success: true, saved: true };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("toggleSave API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to toggle save",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
