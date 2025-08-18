// types
import { FetchQuestionsResult } from "@/types/types";

export async function fetchSavedQuestions({
  userId,
}: {
  userId: string | undefined;
}): Promise<FetchQuestionsResult> {
  if (!userId) {
    return {
      success: false,
      message: "User id is required",
      error: "Missing userId",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/questions/saved?userId=${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        message: `Failed to fetch saved questions: ${res.status}`,
        error: errorText || "Unknown error",
      };
    }

    const data: FetchQuestionsResult = await res.json();
    return data;
  } catch (error) {
    console.error("fetchSavedQuestions error:", error);
    return {
      success: false,
      message: "Failed to fetch saved questions",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
