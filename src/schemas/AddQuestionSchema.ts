// 3rd party libraries
import { z } from "zod";

export const AddQuestionSchema = z.object({
  question: z
    .string()
    .min(10, "Question should be at least 10 characters long"),
  codeSnippet: z.string().optional(),
  options: z.object({
    a: z.string().min(1, "Option A is required"),
    b: z.string().min(1, "Option B is required"),
    c: z.string().min(1, "Option C is required"),
    d: z.string().min(1, "Option D is required"),
  }),
  correctOption: z.string().min(1, "Correct option is required"),
  explanation: z.string().optional(),
  topicId: z.string().min(1, "Topic is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  isPremium: z.boolean().optional(),
});

export type AddQuestionValues = z.infer<typeof AddQuestionSchema>;
