import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const { questionID } = await req.json(); // Get data from request body
    const session = await auth();
    const userID = session?.user?.id;

    if (!questionID || typeof questionID !== "string") {
      return NextResponse.json(
        { error: "Invalid question ID" },
        { status: 400 }
      );
    }

    if (!userID) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Check if the question exists
    const question = await prisma.question.findUnique({
      where: { id: questionID },
    });

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Find existing completion record
    const existingCompletion = await prisma.questionStatus.findFirst({
      where: {
        questionId: questionID,
        userId: userID,
      },
    });

    if (existingCompletion) {
      // Update existing record
      const updatedCompletion = await prisma.questionStatus.update({
        where: { id: existingCompletion.id }, // Use the id of the existing record
        data: {
          status: "Completed",
          isCorrect: true,
        },
      });

      return NextResponse.json(
        {
          message: "Question checked",
          updatedCompletion,
          isCorrect: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error marking question as completed:", error);
    return NextResponse.json(
      { error: "Failed to mark question as completed" },
      { status: 500 }
    );
  }
}
