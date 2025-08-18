"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QuestionStatusEnum, DifficultyLevelEnum } from "@prisma/client";
import { queryKeys } from "@/utils/queryKeys";
import toast from "react-hot-toast";
import {
  FetchQuestionsResult,
  FetchQuestionDetailsResult,
  QuestionsCountResult,
} from "@/types/types";

export function useUpdateQuestionStatus(
  userId: string,
  questionId: string,
  page: number,
  filterStatus: QuestionStatusEnum,
  filterDifficulty: DifficultyLevelEnum,
  questionDifficulty: DifficultyLevelEnum, // Fixed property - never changes
  currentQuestionStatus: QuestionStatusEnum
) {
  const queryClient = useQueryClient();

  const questionDetailsKey = queryKeys.questionDetails(userId, questionId);
  const questionsListKey = queryKeys.questions(
    userId,
    page,
    filterStatus,
    filterDifficulty
  );
  const savedQuestionsKey = queryKeys.savedQuestions(userId);
  const questionCountsKey = queryKeys.questionCounts(userId);

  return useMutation({
    mutationFn: async (newStatus: QuestionStatusEnum) => {
      const res = await fetch(
        `/api/questions/${questionId}/update-status?userId=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId, status: newStatus }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update status: ${res.status} ${errorText}`);
      }
      return res.json();
    },

    onMutate: async (newStatus) => {
      // Cancel all related queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: questionDetailsKey }),
        queryClient.cancelQueries({ queryKey: questionsListKey }),
        queryClient.cancelQueries({ queryKey: savedQuestionsKey }),
        queryClient.cancelQueries({ queryKey: questionCountsKey }),
      ]);

      // Store previous data for rollback
      const prevDetails =
        queryClient.getQueryData<FetchQuestionDetailsResult>(
          questionDetailsKey
        );
      const prevList =
        queryClient.getQueryData<FetchQuestionsResult>(questionsListKey);
      const prevSaved =
        queryClient.getQueryData<FetchQuestionsResult>(savedQuestionsKey);
      const prevCounts =
        queryClient.getQueryData<QuestionsCountResult>(questionCountsKey);

      // Use the passed current status instead of trying to derive it
      const currentStatus = currentQuestionStatus;

      // Update question details
      queryClient.setQueryData<FetchQuestionDetailsResult>(
        questionDetailsKey,
        (old) => {
          if (!old || !old.success) return old;
          return {
            ...old,
            questionDetails: { ...old.questionDetails, status: newStatus },
          };
        }
      );

      // Update questions list and saved questions
      const updateQuestionsList = (old: FetchQuestionsResult | undefined) => {
        if (!old || !old.success) return old;

        const updatedQuestions = old.questions.map((q) => {
          if (q.id === questionId) {
            return { ...q, status: newStatus };
          }
          return q;
        });

        return {
          ...old,
          questions: updatedQuestions,
        };
      };

      // Update both question lists
      const updatedList = updateQuestionsList(prevList);
      const updatedSaved = updateQuestionsList(prevSaved);

      queryClient.setQueryData<FetchQuestionsResult>(
        questionsListKey,
        () => updatedList
      );
      queryClient.setQueryData<FetchQuestionsResult>(
        savedQuestionsKey,
        () => updatedSaved
      );

      // Update question counts using the question's fixed difficulty
      queryClient.setQueryData<QuestionsCountResult>(
        questionCountsKey,
        (old) => {
          if (!old || !old.success) return old;

          const updated = { ...old };

          // Use the question's difficulty (this is a fixed property)
          const difficultyKey = questionDifficulty as keyof Pick<
            QuestionsCountResult & { success: true },
            "EASY" | "MEDIUM" | "HARD"
          >;

          const difficultyStats = { ...updated[difficultyKey] };

          // Decrease count for previous status
          switch (currentStatus) {
            case QuestionStatusEnum.SOLVED:
              difficultyStats.solved = Math.max(0, difficultyStats.solved - 1);
              updated.totalSolvedCount = Math.max(
                0,
                updated.totalSolvedCount - 1
              );
              break;
            case QuestionStatusEnum.ATTEMPTED:
              difficultyStats.attempted = Math.max(
                0,
                difficultyStats.attempted - 1
              );
              updated.totalAttemptedCount = Math.max(
                0,
                updated.totalAttemptedCount - 1
              );
              break;
            case QuestionStatusEnum.TODO:
              difficultyStats.todo = Math.max(0, difficultyStats.todo - 1);
              updated.totalTodoCount = Math.max(0, updated.totalTodoCount - 1);
              break;
          }

          // Increase count for new status
          switch (newStatus) {
            case QuestionStatusEnum.SOLVED:
              difficultyStats.solved += 1;
              updated.totalSolvedCount += 1;
              break;
            case QuestionStatusEnum.ATTEMPTED:
              difficultyStats.attempted += 1;
              updated.totalAttemptedCount += 1;
              break;
            case QuestionStatusEnum.TODO:
              difficultyStats.todo += 1;
              updated.totalTodoCount += 1;
              break;
          }

          updated[difficultyKey] = difficultyStats;

          return updated;
        }
      );

      return { prevDetails, prevList, prevSaved, prevCounts, currentStatus };
    },

    onError: (error, _newStatus, ctx) => {
      console.error("Question status update error:", error);

      // Rollback all optimistic updates
      if (ctx?.prevDetails) {
        queryClient.setQueryData(questionDetailsKey, ctx.prevDetails);
      }
      if (ctx?.prevList) {
        queryClient.setQueryData(questionsListKey, ctx.prevList);
      }
      if (ctx?.prevSaved) {
        queryClient.setQueryData(savedQuestionsKey, ctx.prevSaved);
      }
      if (ctx?.prevCounts) {
        queryClient.setQueryData(questionCountsKey, ctx.prevCounts);
      }

      toast.error("Failed to update question status");
    },

    onSuccess: () => {
      // const statusText =
      //   newStatus === QuestionStatusEnum.SOLVED
      //     ? "marked as solved"
      //     : newStatus === QuestionStatusEnum.ATTEMPTED
      //     ? "marked as attempted"
      //     : "marked as todo";
      // toast.success(`Question ${statusText}!`);
    },

    onSettled: () => {
      // Invalidate all related queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: questionDetailsKey });
      queryClient.invalidateQueries({ queryKey: questionsListKey });
      queryClient.invalidateQueries({ queryKey: savedQuestionsKey });
      queryClient.invalidateQueries({ queryKey: questionCountsKey });

      // Also invalidate all questions lists that might be affected
      queryClient.invalidateQueries({
        queryKey: ["questions", userId],
        exact: false,
      });
    },
  });
}
