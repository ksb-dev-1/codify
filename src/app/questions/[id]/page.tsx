import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";
import QuestionDetails from "@/components/QuestionDetails";

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

  return (
    <Container className="min-h-screen border-x px-6 sm:px-8 md:px-16 pb-16 pt-32">
      <QuestionDetails userId={userId} questionId={id} />
    </Container>
  );
}
