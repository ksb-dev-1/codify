"use client";

// hooks
import { useToggleSaveQuestion } from "@/hooks/useToggleSaveQuestion";

// 3rd party
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

interface SaveButtonProps {
  userId?: string;
  questionId: string;
  isSaved: boolean;
}

export default function SaveButton({
  userId,
  questionId,
  isSaved,
}: SaveButtonProps) {
  const { optimisticSaved, mutate, isPending } = useToggleSaveQuestion({
    userId,
    questionId,
    isSaved,
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={!userId || isPending}
      aria-label={optimisticSaved ? "Unsave question" : "Save question"} // ✅ Accessible name
      className="h-8 w-8 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
    >
      {optimisticSaved ? (
        <HiHeart className="text-red-600 h-5 w-5" />
      ) : (
        <HiOutlineHeart className="text-red-600 h-5 w-5" />
      )}
    </button>
  );
}
