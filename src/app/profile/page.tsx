import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";
import ProfileDetails from "@/components/ProfileDetails";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "See your profile information and track your learning progress here",
};

export default async function ProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

  const name = session.user?.name;
  const email = session.user?.email;
  const image = session.user?.image;

  return (
    <Container className="min-h-screen border-x px-6 sm:px-8 md:px-16 pb-16 pt-32">
      <ProfileDetails userId={userId} name={name} email={email} image={image} />
    </Container>
  );
}
