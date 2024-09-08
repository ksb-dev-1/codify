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

    const existingCompletion = await prisma.questionStatus.findFirst({
      where: {
        questionId: questionID,
        userId: userID,
      },
    });

    if (existingCompletion) {
      // If the question is already completed, return the isCorrect property with the question
      if (existingCompletion.isCorrect) {
        const question = await prisma.question.findUnique({
          where: { id: questionID },
        });

        if (!question) {
          return NextResponse.json(
            { error: "Question not found" },
            { status: 404 }
          );
        }

        return NextResponse.json(
          {
            message: "Question already completed",
            isCorrect: existingCompletion.isCorrect,
            question,
          },
          { status: 200 }
        );
      }
    }

    if (!existingCompletion) {
      await prisma.questionStatus.create({
        data: {
          questionId: questionID,
          userId: userID,
          status: "Started",
          isCorrect: false,
        },
      });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionID },
    });

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Question marked as started", question },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating question status:", error);
    return NextResponse.json(
      { error: "Failed to update question status" },
      { status: 500 }
    );
  }
}
