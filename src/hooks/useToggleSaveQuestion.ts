/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DifficultyLevelEnum, QuestionStatusEnum } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryKeys } from "@/utils/queryKeys";

interface Question {
  id: string;
  isSaved: boolean;
}

interface QuestionWithStatus {
  questions: Question[];
}

export function useToggleSaveQuestion({
  userId,
  questionId,
  isSaved,
}: {
  userId?: string;
  questionId: string;
  isSaved: boolean;
}) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const status =
    (searchParams.get("status") as QuestionStatusEnum) || undefined;
  const difficulty =
    (searchParams.get("difficulty") as DifficultyLevelEnum) || undefined;

  const questionsQueryKey = queryKeys.questions(
    userId,
    page,
    status,
    difficulty
  );
  const savedQuestionsQueryKey = queryKeys.savedQuestions(userId);
  const questionDetailsQueryKey = queryKeys.questionDetails(userId, questionId);

  const [optimisticSaved, setOptimisticSaved] = useState(isSaved);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/toggle-save", {
        method: "POST",
        body: JSON.stringify({ questionId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to toggle save");
      return res.json();
    },

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: questionsQueryKey }),
        queryClient.cancelQueries({ queryKey: savedQuestionsQueryKey }),
        queryClient.cancelQueries({ queryKey: questionDetailsQueryKey }),
      ]);

      const prevQuestions =
        queryClient.getQueryData<QuestionWithStatus>(questionsQueryKey);
      const prevSavedQuestions = queryClient.getQueryData<QuestionWithStatus>(
        savedQuestionsQueryKey
      );
      const prevDetails = queryClient.getQueryData<any>(
        questionDetailsQueryKey
      );

      const newSavedState = !optimisticSaved;
      setOptimisticSaved(newSavedState);

      queryClient.setQueryData<QuestionWithStatus>(questionsQueryKey, (old) =>
        old
          ? {
              ...old,
              questions: old.questions.map((q) =>
                q.id === questionId ? { ...q, isSaved: newSavedState } : q
              ),
            }
          : old
      );

      queryClient.setQueryData<QuestionWithStatus>(
        savedQuestionsQueryKey,
        (old) => {
          if (!old) return old;
          const alreadySaved = old.questions.some((q) => q.id === questionId);

          if (newSavedState && !alreadySaved) {
            const mainList =
              queryClient.getQueryData<QuestionWithStatus>(questionsQueryKey);
            const newQuestion = mainList?.questions.find(
              (q) => q.id === questionId
            );
            return newQuestion
              ? {
                  ...old,
                  questions: [
                    ...old.questions,
                    { ...newQuestion, isSaved: true },
                  ],
                }
              : old;
          } else if (!newSavedState && alreadySaved) {
            return {
              ...old,
              questions: old.questions.filter((q) => q.id !== questionId),
            };
          }
          return old;
        }
      );

      queryClient.setQueryData<any>(questionDetailsQueryKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          questionDetails: { ...old.questionDetails, isSaved: newSavedState },
        };
      });

      return { prevQuestions, prevSavedQuestions, prevDetails };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevQuestions)
        queryClient.setQueryData(questionsQueryKey, ctx.prevQuestions);
      if (ctx?.prevSavedQuestions)
        queryClient.setQueryData(
          savedQuestionsQueryKey,
          ctx.prevSavedQuestions
        );
      if (ctx?.prevDetails)
        queryClient.setQueryData(questionDetailsQueryKey, ctx.prevDetails);

      setOptimisticSaved(isSaved);
      toast.error("Something went wrong ❌");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionDetailsQueryKey });
      queryClient.invalidateQueries({ queryKey: questionsQueryKey });
      queryClient.invalidateQueries({ queryKey: savedQuestionsQueryKey });
    },
  });

  return {
    optimisticSaved,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}
