// types
import { QuestionsCountResult } from "@/types/types";

export async function fetchQuestionCounts({
  userId,
}: {
  userId: string | undefined;
}): Promise<QuestionsCountResult> {
  if (!userId) {
    return {
      success: false,
      message: "User id is required",
      error: "Missing userId",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/questions/count?userId=${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        message: `Failed to fetch question counts: ${res.status}`,
        error: errorText || "Unknown error",
      };
    }

    const data: QuestionsCountResult = await res.json();
    return data;
  } catch (error) {
    console.error("fetchQuestionCounts error:", error);
    return {
      success: false,
      message: "Failed to fetch question counts",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
