"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { googleSigninAction, githubSigninAction } from "./signinAction";

// components
import GoogleSignInButton from "@/components/GoogleSignInButton";
import GitHubSignInButton from "@/components/GitHubSignInButton";

// 3rd party libraries
import { useSession } from "next-auth/react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // If user doesn't exist redirect to home
  useEffect(() => {
    if (sessionStatus !== "loading" && session?.user?.id) {
      router.push(`/pages/questions?theme=${theme}&page=1`);
    }
  }, [sessionStatus, session?.user?.id, router, theme]);

  return (
    <div
      className={`${
        theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
      } min-h-screen flex flex-col items-center justify-center`}
    >
      <div>
        <h1 className="mb-2 font-bold text-xl">Sign In</h1>
        <div
          className={`${
            theme === "light" ? "lightBg1" : "darkBg1"
          } rounded-custom p-8 sm:p-16`}
        >
          <form action={googleSigninAction}>
            <GoogleSignInButton theme={theme} />
          </form>
          <form action={githubSigninAction}>
            <GitHubSignInButton />
          </form>
        </div>
      </div>
    </div>
  );
}
