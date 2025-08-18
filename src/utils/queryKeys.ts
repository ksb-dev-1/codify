import { DifficultyLevelEnum, QuestionStatusEnum } from "@prisma/client";

// src/utils/queryKeys.ts
export const queryKeys = {
  questions: (
    userId: string | undefined,
    page: number,
    status: QuestionStatusEnum,
    difficulty: DifficultyLevelEnum
  ) => ["questions", userId, page, status, difficulty] as const,

  savedQuestions: (userId: string | undefined) =>
    ["saved-questions", userId] as const,

  questionDetails: (userId: string | undefined, questionId: string) =>
    ["question-details", userId, questionId] as const,

  questionCounts: (userId: string | undefined) =>
    ["question-counts", userId] as const,

  isPremium: (userId: string | undefined) => ["is-premium", userId] as const,
};
