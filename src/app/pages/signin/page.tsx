import { redirect } from "next/navigation";
import { signIn } from "@/auth";

// components
import GoogleSignInButton from "@/components/GoogleSignInButton";
import GitHubSignInButton from "@/components/GitHubSignInButton";
import getSession from "@/lib/getSession";

export default async function SignInPage() {
  const session = await getSession();
  const userID = session?.user?.id;

  if (userID) {
    redirect(`/pages/learn?page=1`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="mb-2 font-bold text-xl">Sign In</h1>
        <div className="bg-white rounded-xl p-8 sm:p-16 border border-slate-300">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <GoogleSignInButton />
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <GitHubSignInButton />
          </form>
        </div>
      </div>
    </div>
  );
}
