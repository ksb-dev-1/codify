// types
import { UserPremiumDataResult } from "@/types/types";

export async function fetchUserPremiumData({
  userId,
}: {
  userId: string;
}): Promise<UserPremiumDataResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/is-premium?userId=${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch saved questions: ${res.status} - ${
          errorText || "Unknown error"
        }`
      );
    }

    const data: UserPremiumDataResult = await res.json();
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
