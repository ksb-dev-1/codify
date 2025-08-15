// types
import { FetchQuestionDetailsResult } from "@/types/types";

export async function fetchQuestionDetails({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<FetchQuestionDetailsResult> {
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
      throw new Error(
        `Failed to fetch question details: ${res.status} - ${
          errorText || "Unknown error"
        }`
      );
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
