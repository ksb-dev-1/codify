"use server";

import { signIn } from "@/auth";

export async function signInAction(provider: string) {
  return signIn(provider);
}
