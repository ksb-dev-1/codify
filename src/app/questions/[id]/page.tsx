import { Metadata } from "next";
import { redirect } from "next/navigation";

// components
import Container from "@/components/shared/Container";
import QuestionDetails from "@/components/QuestionDetails";

// lib
// import { fetchQuestionDetails } from "@/lib/fetchQuestionDetails";

// utils
// import { queryKeys } from "@/utils/queryKeys";

// 3rd party
import { auth } from "@/auth";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getQueryClient } from "@/lib/getQueryClient";

export const metadata: Metadata = {
  title: "Question Details",
  description:
    "View detailed question, choose your answer, and see if you're correct",
};

export default async function QuestionDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

  const { id } = params;

  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: queryKeys.questionDetails(userId, id),
  //   queryFn: () => fetchQuestionDetails({ userId, questionId: id }),
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <Container className="min-h-screen border-x px-6 sm:px-8 md:px-16 pb-16 pt-32">
      <QuestionDetails userId={userId} questionId={id} />
    </Container>
    // </HydrationBoundary>
  );
}
