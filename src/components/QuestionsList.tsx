"use client";

// lib
import { fetchQuestions } from "@/lib/fetchQuestions";

// utils
import { queryKeys } from "@/utils/queryKeys";

// types
import { QuestionWithStatus } from "@/types/types";

// prisma
import { DifficultyLevelEnum, QuestionStatusEnum } from "@prisma/client";

// components
import ServerError from "@/components/errors/ServerError";
import NotFound from "@/components/errors/NotFound";
import DocumentSearchIcon from "@/components/errors/DocumentSearchIcon";
import QuestionListSkeleton from "./skeletons/QuestionListSkeleton";
import QuestionCard from "@/components/shared/QuestionCard/QuestionCard";
import AppliedFilters from "@/components/AppliedFilters";
import DesktopFilter from "@/components/filter/DesktopFilter";
import MobileFilter from "@/components/filter/MobileFilter";
import Pagination from "@/components/Pagination";

// 3rd party
import { useQuery } from "@tanstack/react-query";

export default function QuestionsList({
  userId,
  page,
  limit,
  status,
  difficulty,
}: {
  userId: string;
  page: number;
  limit: number;
  status: QuestionStatusEnum;
  difficulty: DifficultyLevelEnum;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.questions(userId, page, status, difficulty),
    queryFn: () => fetchQuestions({ userId, page, limit, status, difficulty }),
  });

  if (isLoading)
    return (
      <QuestionListSkeleton
        status={status}
        difficulty={difficulty}
        text="Javascript Questions"
      />
    );

  if (isError)
    return (
      <ServerError message="Something went wrong while fetching questions." />
    );

  if (!data || !data.success) {
    return (
      <ServerError
        message={
          data?.message ||
          data?.error ||
          "Failed to load questions. Please try again later."
        }
      />
    );
  }

  const isFilterApplied = Boolean(status || difficulty);

  if (data.questions.length === 0) {
    return isFilterApplied ? (
      <>
        <div className="mb-8 border-b pb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Javascript Questions</h1>
          <MobileFilter />
        </div>
        <div className="w-full flex items-start gap-8">
          <DesktopFilter />
          <div className="w-full">
            <AppliedFilters status={status} difficulty={difficulty} />
            <div className="min-h-[calc(100vh-256px)] border rounded p-8 w-full flex flex-col items-center justify-center gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                No questions found!
              </h2>
              <h3 className="text-primary">Try applying different filters.</h3>
              <DocumentSearchIcon />
            </div>
          </div>
        </div>
      </>
    ) : (
      <NotFound text="No questions found!" />
    );
  }

  const { questions = [], totalPages = 0, isPremiumUser = false } = data;

  return (
    <>
      <div className="mb-8 border-b pb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Javascript Questions</h1>
        <MobileFilter />
      </div>
      <div className="w-full flex items-start gap-8">
        <DesktopFilter />
        <div className="w-full">
          {(status || difficulty) && (
            <AppliedFilters status={status} difficulty={difficulty} />
          )}
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
          {typeof totalPages === "number" && totalPages > 1 && (
            <Pagination currentPage={Number(page)} totalPages={totalPages} />
          )}
        </div>
      </div>
    </>
  );
}
