import { NextRequest, NextResponse } from "next/server";

// lib
import { prisma } from "@/lib/prisma";

// types
import { FetchQuestionsResult } from "@/types/types";

// prisma
import { QuestionStatusEnum } from "@prisma/client";

export async function GET(
  req: NextRequest
): Promise<NextResponse<FetchQuestionsResult>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const hasActivePayment = await prisma.payment.findFirst({
      where: { userId, isPaid: true },
      select: { id: true },
    });
    const isPremiumUser = !!hasActivePayment;

    const savedQuestions = await prisma.savedQuestion.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      select: {
        questionId: true,
        question: {
          select: {
            id: true,
            qNo: true,
            difficulty: true,
            isPremium: true,
            createdAt: true,
            updatedAt: true,
            topic: { select: { name: true } },
          },
        },
      },
    });

    if (savedQuestions.length === 0) {
      return NextResponse.json({
        success: true,
        questions: [],
        isPremiumUser,
      });
    }

    const savedQuestionIds = savedQuestions.map((sq) => sq.questionId);
    const statuses = await prisma.questionStatus.findMany({
      where: {
        userId,
        questionId: { in: savedQuestionIds },
      },
      select: { questionId: true, status: true },
    });

    const statusMap = Object.fromEntries(
      statuses.map((s) => [s.questionId, s.status])
    );

    const formattedQuestions = savedQuestions.map((sq) => {
      const q = sq.question;
      return {
        ...q,
        topicName: q.topic?.name || "",
        status: statusMap[q.id] || QuestionStatusEnum.TODO,
        isSaved: true,
      };
    });

    return NextResponse.json({
      success: true,
      questions: formattedQuestions,
      isPremiumUser,
    });
  } catch (error) {
    console.error("Fetch saved questions API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch saved questions",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
