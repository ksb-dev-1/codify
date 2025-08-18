// types
import { UserPremiumDataResult } from "@/types/types";

export async function fetchUserPremiumData({
  userId,
}: {
  userId: string | undefined;
}): Promise<UserPremiumDataResult> {
  if (!userId) {
    return {
      success: false,
      message: "User id is required",
      error: "Missing userId",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/is-premium?userId=${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        message: `Failed to fetch user premium data: ${res.status}`,
        error: errorText || "Unknown error",
      };
    }

    const data: UserPremiumDataResult = await res.json();
    return data;
  } catch (error) {
    console.error("fetchUserPremiumData error:", error);
    return {
      success: false,
      message: "Failed to fetch user premium data",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
