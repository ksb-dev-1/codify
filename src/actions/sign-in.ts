"use server";

import { signIn } from "@/auth";

export async function googleSignIn() {
  return await signIn("google", { redirectTo: "/questions?page=1" });
}

export async function githubSignIn() {
  return await signIn("github", { redirectTo: "/questions?page=1" });
}
