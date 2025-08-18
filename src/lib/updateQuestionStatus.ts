// types
import { FetchQuestionsResult } from "@/types/types"; // or define a more specific type if needed

export async function updateQuestionStatus({
  userId,
  questionId,
}: {
  userId: string | undefined;
  questionId: string | undefined;
}): Promise<FetchQuestionsResult> {
  if (!userId) {
    return {
      success: false,
      message: "User id is required",
      error: "Missing userId",
    };
  }

  if (!questionId) {
    return {
      success: false,
      message: "Question id is required",
      error: "Missing questionId",
    };
  }

  try {
    const params = new URLSearchParams({ userId });

    const res = await fetch(
      `/api/questions/${questionId}/update-status?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        message: `Failed to update question status: ${res.status}`,
        error: errorText || "Unknown error",
      };
    }

    const data: FetchQuestionsResult = await res.json();
    return data;
  } catch (error) {
    console.error("updateQuestionStatus error:", error);
    return {
      success: false,
      message: "Failed to update question status",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
