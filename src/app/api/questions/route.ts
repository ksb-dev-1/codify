import { NextRequest, NextResponse } from "next/server";

// lib
import { prisma } from "@/lib/prisma";

// types
import { FetchQuestionsResult } from "@/types/types";

// prisma
import { DifficultyLevelEnum, QuestionStatusEnum } from "@prisma/client";

// GET /api/questions
export async function GET(
  req: NextRequest
): Promise<NextResponse<FetchQuestionsResult>> {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId") || "";
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const status = searchParams.get("status") || "";
    const difficulty = searchParams.get("difficulty") || "";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Check Premium Access
    const hasActivePayment = await prisma.payment.findFirst({
      where: { userId, isPaid: true },
      select: { id: true },
    });
    const isPremiumUser = !!hasActivePayment;

    const currentStatus = status.toUpperCase();
    const currentDifficulty = difficulty.toUpperCase();
    const allowedDifficulties = Object.values(DifficultyLevelEnum);
    const allowedStatuses = Object.values(QuestionStatusEnum);

    const parsedDifficulty = allowedDifficulties.includes(
      currentDifficulty as DifficultyLevelEnum
    )
      ? (currentDifficulty as DifficultyLevelEnum)
      : undefined;

    const parsedStatus = allowedStatuses.includes(
      currentStatus as QuestionStatusEnum
    )
      ? (currentStatus as QuestionStatusEnum)
      : undefined;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: Record<string, any> = {};

    if (parsedDifficulty) {
      whereClause.difficulty = parsedDifficulty;
    }

    const allQuestions = await prisma.question.findMany({
      where: whereClause,
      select: {
        id: true,
        qNo: true,
        difficulty: true,
        isPremium: true,
        createdAt: true,
        updatedAt: true,
        topic: { select: { name: true } },
      },
      orderBy: { qNo: "asc" },
    });

    const questionIds = allQuestions.map((q) => q.id);

    const [questionStatuses, savedQuestions] = await Promise.all([
      prisma.questionStatus.findMany({
        where: { userId, questionId: { in: questionIds } },
        select: { questionId: true, status: true },
      }),
      prisma.savedQuestion.findMany({
        where: { userId, questionId: { in: questionIds } },
        select: { questionId: true },
      }),
    ]);

    const statusMap = Object.fromEntries(
      questionStatuses.map((qs) => [qs.questionId, qs.status])
    );
    const savedSet = new Set(savedQuestions.map((sq) => sq.questionId));

    let questionsWithStatus = allQuestions.map(({ topic, ...q }) => ({
      ...q,
      topicName: topic?.name || "",
      status: statusMap[q.id] || QuestionStatusEnum.TODO,
      isSaved: savedSet.has(q.id),
    }));

    if (parsedStatus) {
      questionsWithStatus = questionsWithStatus.filter(
        (q) => q.status === parsedStatus
      );
    }

    const totalCount = questionsWithStatus.length;
    const totalPages = Math.ceil(totalCount / limitNumber);
    const paginatedQuestions = questionsWithStatus.slice(
      (pageNumber - 1) * limitNumber,
      pageNumber * limitNumber
    );

    return NextResponse.json({
      success: true,
      questions: paginatedQuestions,
      totalPages,
      isPremiumUser,
    });
  } catch (error) {
    console.error("Fetch questions API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch questions",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
