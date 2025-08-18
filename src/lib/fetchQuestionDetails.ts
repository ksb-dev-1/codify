// types
import { FetchQuestionDetailsResult } from "@/types/types";

export async function fetchQuestionDetails({
  userId,
  questionId,
}: {
  userId: string | undefined;
  questionId: string | undefined;
}): Promise<FetchQuestionDetailsResult> {
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
      `${
        process.env.NEXT_PUBLIC_APP_URL
      }/api/questions/${questionId}?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        message: `Failed to fetch question details: ${res.status}`,
        error: errorText || "Unknown error",
      };
    }

    const data: FetchQuestionDetailsResult = await res.json();
    return data;
  } catch (error) {
    console.error("fetchQuestionDetails error:", error);
    return {
      success: false,
      message: "Failed to fetch question details",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
