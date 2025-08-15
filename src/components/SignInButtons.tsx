"use client";

import { useFormStatus } from "react-dom";

// 3rd party
import { TbLoader } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SignInButtonProps {
  icon: React.ReactNode;
  text: string;
}

function SignInButton({ icon, text }: SignInButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="relative w-full border p-4 rounded-full flex items-center justify-center hover:bg-slate-100 transition"
    >
      <span className="mr-4">{icon}</span>
      <span className="font-medium">{text}</span>
      {pending && (
        <TbLoader className="absolute right-4 h-5 w-5 text-slate-500 animate-spin" />
      )}
    </button>
  );
}

export function GoogleSignInButton() {
  return (
    <SignInButton
      icon={<FcGoogle className="h-6 w-6" />}
      text="Sign in with Google"
    />
  );
}

export function GitHubSignInButton() {
  return (
    <SignInButton
      icon={<FaGithub className="h-6 w-6" />}
      text="Sign in with GitHub"
    />
  );
}
