import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";
import SavedQuestionsList from "@/components/SavedQuestionsList";

export const metadata: Metadata = {
  title: "Saved Questions",
  description: "List of saved questions by the user",
};

export default async function SavedPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

  return (
    <Container className="min-h-screen border-x px-6 sm:px-8 md:px-16 pb-16 pt-32">
      <SavedQuestionsList userId={userId} />
    </Container>
  );
}
