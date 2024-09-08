import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Define schema
const AddQuestionSchema = z.object({
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
  correctOption: z.enum(["a", "b", "c", "d"], {
    required_error: "Correct answer is required",
  }),
  explanation: z.string().optional(),
  topicId: z.string().min(1, "Topic is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    required_error: "Difficulty is required",
  }),
  isPremium: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const data = await request.json();

    // Server-side validation
    const parsedData = AddQuestionSchema.parse(data);

    // Add question to the database
    const newQuestion = await prisma.question.create({
      data: {
        question: parsedData.question,
        codeSnippet: parsedData.codeSnippet || null,
        options: parsedData.options as any,
        correctOption: parsedData.correctOption,
        explanation: parsedData.explanation || null,
        topic: { connect: { id: parsedData.topicId } },
        createdBy: { connect: { id: userId } },
        difficulty: parsedData.difficulty,
        isPremium: parsedData.isPremium || false,
      },
    });

    return NextResponse.json(newQuestion);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to add question" },
      { status: 400 }
    );
  }
}
