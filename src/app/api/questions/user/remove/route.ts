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

    // Check if the question exists and belongs to the user
    const userAddedQuestion = await prisma.question.findFirst({
      where: {
        id: questionID,
        userId: userID,
      },
    });

    if (userAddedQuestion) {
      // Remove the question
      await prisma.question.delete({
        where: {
          id: questionID,
        },
      });

      return NextResponse.json(
        { message: "User added question removed", isQuestionRemoved: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Question not found", isQuestionRemoved: false },
      { status: 404 }
    );
  } catch (error) {
    console.error("Failed to remove user added question:", error);
    return NextResponse.json(
      { error: "Failed to remove user added question!" },
      { status: 500 }
    );
  }
}
