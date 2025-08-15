import { NextRequest, NextResponse } from "next/server";

// lib
import { prisma } from "@/lib/prisma";

// types
import { FetchQuestionDetailsResult } from "@/types/types";

// prisma
import { QuestionStatusEnum } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<FetchQuestionDetailsResult>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "";
    const questionId = params.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!questionId) {
      return NextResponse.json(
        { success: false, message: "Need question id to fetch details" },
        { status: 400 }
      );
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: {
        id: true,
        qNo: true,
        question: true,
        codeSnippet: true,
        options: true,
        correctOption: true,
        explanation: true,
        difficulty: true,
        isPremium: true,
        createdAt: true,
        updatedAt: true,
        topic: { select: { name: true } },
        savedQuestions: {
          where: { userId },
          select: { id: true },
        },
        questionStatuses: {
          where: { userId },
          select: { status: true },
        },
      },
    });

    if (!question) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    const { topic, savedQuestions, questionStatuses, ...questionData } =
      question;

    const isSaved = savedQuestions.length > 0;
    const status = questionStatuses[0]?.status || QuestionStatusEnum.TODO;

    return NextResponse.json({
      success: true,
      questionDetails: {
        ...questionData,
        question: question.question ?? "",
        options: (question.options as Record<string, string>) ?? {},
        explanation: question.explanation ?? "",
        codeSnippet: question.codeSnippet ?? "",
        correctOption: question.correctOption ?? "",
        topicName: topic?.name || "",
        isSaved,
        status,
      },
    });
  } catch (error) {
    console.error("Fetch question details error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch question details",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
