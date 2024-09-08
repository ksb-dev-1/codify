import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userID = session?.user?.id;

  if (!userID) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const whereClause: any = {};

  if (topic && topic !== "All") {
    const topicFields = await prisma.topic.findFirst({
      where: { name: topic },
    });

    if (topicFields?.id) {
      whereClause.topicId = topicFields.id;
    } else {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }
  }

  if (difficulty && difficulty !== "All") {
    whereClause.difficulty = difficulty;
  }

  // Updated Status filtering logic
  if (status && status !== "All") {
    if (status === "Todo") {
      whereClause.questionStatuses = {
        none: {
          userId: userID,
        },
      };
    } else if (status === "Started") {
      whereClause.questionStatuses = {
        some: {
          userId: userID,
          isCorrect: false,
        },
      };
    } else if (status === "Completed") {
      whereClause.questionStatuses = {
        some: {
          userId: userID,
          isCorrect: true,
        },
      };
    }
  }

  try {
    // Fetch total count
    const totalCount = await prisma.question.count({
      where: whereClause,
    });

    // Fetch questions with inclusions
    const questions = await prisma.question.findMany({
      where: whereClause,
      include: {
        questionStatuses: {
          where: { userId: userID },
          select: {
            isCorrect: true,
            completedAt: true,
          },
        },
        topic: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Map questions with additional status information
    const questionsWithStatus = questions.map((question) => {
      let questionStatus = "Todo";
      if (question.questionStatuses.length > 0) {
        questionStatus = question.questionStatuses[0].isCorrect
          ? "Completed"
          : "Started";
      }

      return {
        ...question,
        topicName: question.topic?.name || "",
        status: questionStatus,
      };
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      { questions: questionsWithStatus, totalPages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
