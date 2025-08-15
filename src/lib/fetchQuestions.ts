// lib/fetchQuestions.ts

// types
import { FetchQuestionsResult } from "@/types/types";

// prisma enums
import { DifficultyLevelEnum, QuestionStatusEnum } from "@prisma/client";

interface FetchQuestionsParams {
  userId: string;
  page: number;
  limit: number;
  status?: QuestionStatusEnum | null;
  difficulty?: DifficultyLevelEnum | null;
}

export async function fetchQuestions({
  userId,
  page,
  limit,
  status,
  difficulty,
}: FetchQuestionsParams): Promise<FetchQuestionsResult> {
  const params = new URLSearchParams({
    userId,
    page: String(page),
    limit: String(limit),
  });

  if (status) params.set("status", status);
  if (difficulty) params.set("difficulty", difficulty);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/questions?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch questions: ${res.status} - ${
          errorText || "Unknown error"
        }`
      );
    }

    const data: FetchQuestionsResult = await res.json();
    return data;
  } catch (error) {
    console.error("fetchQuestions error:", error);
    return {
      success: false,
      message: "Failed to fetch questions",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
