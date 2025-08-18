"use client";

// lib
import { fetchQuestionDetails } from "@/lib/fetchQuestionDetails";

// utils
import { queryKeys } from "@/utils/queryKeys";

// components
import ServerError from "./errors/ServerError";
import NotFound from "./errors/NotFound";
import QuestionDetailsSkeleton from "./skeletons/QuestionDetailsSkeleton";
import Details from "./Details";

// 3rd party
import { useQuery } from "@tanstack/react-query";

export default function QuestionDetails({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.questionDetails(userId, questionId),
    queryFn: () => fetchQuestionDetails({ userId, questionId }),
  });

  if (isLoading) return <QuestionDetailsSkeleton />;

  if (isError)
    return (
      <ServerError message="Something went wrong while fetching question details." />
    );

  if (!data || !data.success) {
    return (
      <ServerError
        message={
          data?.message ||
          data?.error ||
          "Failed to load question details. Please try again later."
        }
      />
    );
  }

  if (!data.questionDetails) {
    return <NotFound text="No question details found!" />;
  }

  const { questionDetails } = data;

  return <Details questionDetails={questionDetails} userId={userId} />;
}
