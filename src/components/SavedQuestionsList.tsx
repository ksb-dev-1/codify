"use client";

// lib
import { fetchSavedQuestions } from "@/lib/fetchSavedQuestions";

// utils
import { queryKeys } from "@/utils/queryKeys";

// types
import { QuestionWithStatus } from "@/types/types";

// components
import ServerError from "@/components/errors/ServerError";
import NotFound from "@/components/errors/NotFound";
import QuestionListSkeleton from "./skeletons/QuestionListSkeleton";
import QuestionCard from "./shared/QuestionCard/QuestionCard";

// 3rd party
import { useQuery } from "@tanstack/react-query";

interface SavedQuestionsListProps {
  userId: string;
}

export default function SavedQuestionsList({
  userId,
}: SavedQuestionsListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.savedQuestions(userId),
    queryFn: () => fetchSavedQuestions({ userId }),
  });

  if (isLoading)
    return <QuestionListSkeleton text="Saved Questions" isMobile={true} />;

  if (isError)
    return (
      <ServerError message="Something went wrong while fetching saved questions." />
    );

  if (!data || !data.success) {
    return (
      <ServerError
        message={
          data?.message ||
          data?.error ||
          "Failed to load saved questions. Please try again later."
        }
      />
    );
  }

  if (data.questions.length === 0) {
    return <NotFound text="No saved questions found!" />;
  }

  const { questions = [], isPremiumUser = false } = data;

  return (
    <>
      <div className="mb-8 border-b pb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Saved Questions</h1>
      </div>
      <div className="w-full grid gap-4">
        {questions.map((question: QuestionWithStatus) => (
          <QuestionCard
            key={question.id}
            question={question}
            userId={userId}
            isPremiumUser={isPremiumUser}
          />
        ))}
      </div>
    </>
  );
}
