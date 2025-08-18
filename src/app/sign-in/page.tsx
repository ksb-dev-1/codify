import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Sign-in",
  description: "Sign in to codify",
};

// actions
import { githubSignIn, googleSignIn } from "@/actions/sign-in";

// components
import Container from "@/components/shared/Container";
import {
  GoogleSignInButton,
  GitHubSignInButton,
} from "@/components/SignInButtons";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user?.id) redirect("/questions?page=1");

  return (
    <Container className="min-h-screen flex items-center justify-center border-x px-6 sm:px-8 md:px-16">
      <div className="max-w-md w-full space-y-4 border rounded p-4 sm:p-8">
        <h1 className="text-2xl font-bold text-center">
          Sign in to <span className="text-primary">codify</span>
        </h1>
        <form action={googleSignIn}>
          <GoogleSignInButton />
        </form>
        <form action={githubSignIn}>
          <GitHubSignInButton />
        </form>
      </div>
    </Container>
  );
}
