import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";
import QuestionsList from "@/components/QuestionsList";

// prisma
import { DifficultyLevelEnum, QuestionStatusEnum } from "@prisma/client";

export const metadata: Metadata = {
  title: "Questions",
  description: "List of Javascript MCQ questions",
};

type SearchParams = {
  page?: string;
  status?: QuestionStatusEnum;
  difficulty?: DifficultyLevelEnum;
};

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const status = (params?.status as QuestionStatusEnum) || undefined;
  const difficulty = (params?.difficulty as DifficultyLevelEnum) || undefined;
  const limit = 10;

  return (
    <Container className="min-h-screen border-x px-6 sm:px-8 md:px-16 pb-16 pt-32">
      <QuestionsList
        userId={userId}
        page={page}
        limit={limit}
        status={status}
        difficulty={difficulty}
      />
    </Container>
  );
}
