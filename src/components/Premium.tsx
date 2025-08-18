"use client";

// lib
import { fetchUserPremiumData } from "@/lib/fetchUserPremiumData";

// utils
import { queryKeys } from "@/utils/queryKeys";

// components
import ServerError from "./errors/ServerError";
import LinkWithProgress from "./shared/LinkWithProgress";
import PremiumSkeleton from "./skeletons/PremiumSkeleton";
import BuyButton from "./BuyButton";

// 3rd party
import { useQuery } from "@tanstack/react-query";

interface PremiumProps {
  userId: string;
}

export default function Premium({ userId }: PremiumProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.isPremium(userId),
    queryFn: () => fetchUserPremiumData({ userId }),
  });

  if (isLoading) return <PremiumSkeleton text="Premium" />;

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

  if (data.isPremium) {
    return (
      <>
        <h1 className="text-xl font-bold mb-8 border-b pb-4">Premium</h1>
        <div className="border px-6 sm:px-8 md:px-16 py-8 rounded flex flex-col items-center gap-6">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center text-primary">
            You are already a premium member
          </h1>
          <p className="sm:text-lg md:text-xl text-center font-semibold text-primary">
            Thank you for your support 🎉
          </p>
          <LinkWithProgress
            href="/questions?page=1"
            className="px-6 py-3 text-xl rounded-full flex items-center bg-primary text-white hover:opacity-80 transition-opacity"
          >
            Start practicing
          </LinkWithProgress>
        </div>
      </>
    );
  }

  // Purchase button
  return (
    <>
      <h1 className="text-xl font-bold mb-8 border-b pb-4">Premium</h1>
      <div className="bg-white border px-4 md:px-8 py-8 rounded flex flex-col items-center gap-6">
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">
          Become a premium member
        </h1>
        <p className="sm:text-lg md:text-xl text-center font-medium">
          Unlock all premium questions by becoming a premium member. This grants
          you lifetime access to all current and future premium questions.
        </p>
        <BuyButton userId={userId} email={data.email} />
      </div>
    </>
  );
}
