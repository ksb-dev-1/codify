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

  if (isLoading) return <div>Loading...</div>;

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
  );
}
