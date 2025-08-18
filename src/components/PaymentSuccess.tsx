"use client";

// lib
import { fetchUserPremiumData } from "@/lib/fetchUserPremiumData";

// components
import ServerError from "@/components/errors/ServerError";
import PremiumSkeleton from "./skeletons/PremiumSkeleton";
import LinkWithProgress from "@/components/shared/LinkWithProgress";

// utils
import { queryKeys } from "@/utils/queryKeys";

// 3rd party
import { useQuery } from "@tanstack/react-query";

export default function PaymentSuccess({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.isPremium(userId),
    queryFn: () => fetchUserPremiumData({ userId }),
  });

  if (isLoading) return <PremiumSkeleton text="Payment Success" />;

  if (isError)
    return (
      <ServerError message="Something went wrong while fetching user premium data." />
    );

  if (!data || !data.success) {
    return (
      <ServerError
        message={
          data?.message ||
          data?.error ||
          "Failed to load user premium data. Please try again later."
        }
      />
    );
  }

  const { isPremium } = data;

  return (
    <>
      <h1 className="text-xl font-bold mb-8 border-b pb-4">Payment Status</h1>
      <div className="bg-white border px-6 sm:px-8 md:px-16 py-8 rounded flex flex-col items-center gap-6">
        {isPremium && (
          <>
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center text-green-700">
              🎉 Payment Successful
            </h1>
            <p className="sm:text-lg md:text-xl text-center font-medium">
              Premium questions are now unlocked.
            </p>
            <LinkWithProgress
              href="/questions?page=1"
              className="px-6 py-3 text-xl rounded-full flex items-center bg-primary text-white hover:opacity-80 transition-opacity"
            >
              Start practicing
            </LinkWithProgress>
          </>
        )}
      </div>
    </>
  );
}
