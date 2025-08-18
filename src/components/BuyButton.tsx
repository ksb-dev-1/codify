"use client";

import { useSearchParams } from "next/navigation";

// lib
import { getQueryClient } from "@/lib/getQueryClient";

// utils
import { queryKeys } from "@/utils/queryKeys";

// prisma
import { QuestionStatusEnum, DifficultyLevelEnum } from "@prisma/client";

// 3rd party
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbLoader } from "react-icons/tb";

export default function BuyButton({
  userId,
  email,
}: {
  userId: string;
  email: string | null;
}) {
  const searchParams = useSearchParams();
  const queryClient = getQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const status =
    (searchParams.get("status") as QuestionStatusEnum) || undefined;
  const difficulty =
    (searchParams.get("difficulty") as DifficultyLevelEnum) || undefined;

  const questionsListKey = queryKeys.questions(
    userId,
    page,
    status,
    difficulty
  );
  const savedQuestionsKey = queryKeys.savedQuestions(userId);
  const isUserPremiumKey = queryKeys.isPremium(userId);

  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            email,
          }),
        }
      );

      if (!response.ok) {
        toast.error(`Server error: ${response.status}`);
      }

      const { url } = await response.json();
      return url;
    },
    onSuccess: (url) => {
      queryClient.invalidateQueries({ queryKey: questionsListKey });
      queryClient.invalidateQueries({ queryKey: savedQuestionsKey });
      queryClient.invalidateQueries({ queryKey: isUserPremiumKey });
      window.location.href = url;
    },
    onError: (error) => {
      console.error("Error creating checkout session:", error);
    },
  });

  return (
    <button
      onClick={() => purchaseMutation.mutate()}
      disabled={purchaseMutation.isPending}
      className="px-4 py-2 rounded-full flex items-center bg-primary text-white hover:opacity-80 transition-opacity"
    >
      <span>Get premium access for </span>
      <span className="ml-1 text-2xl font-bold flex items-center">499</span>
      <FaIndianRupeeSign />
      {purchaseMutation.isPending && (
        <TbLoader className="ml-4 w-5 h-5 animate-spin" />
      )}
    </button>
  );
}
