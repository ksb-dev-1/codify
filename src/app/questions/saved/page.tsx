import { Metadata } from "next";
import { redirect } from "next/navigation";

// components
import Container from "@/components/shared/Container";
import SavedQuestionsList from "@/components/SavedQuestionsList";

// lib
// import { fetchSavedQuestions } from "@/lib/fetchSavedQuestions";
// import { getQueryClient } from "@/lib/getQueryClient";

// utils
// import { queryKeys } from "@/utils/queryKeys";

// 3rd party
import { auth } from "@/auth";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Saved Questions",
  description: "List of saved questions by the user",
};

export default async function SavedPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: queryKeys.savedQuestions(userId),
  //   queryFn: () => fetchSavedQuestions({ userId }),
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <Container className="min-h-screen border-x px-6 sm:px-8 md:px-16 pb-16 pt-32">
      <SavedQuestionsList userId={userId} />
    </Container>
    // </HydrationBoundary>
  );
}
