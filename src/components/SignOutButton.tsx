"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = async () => {
    const res = await signOut({ redirect: false });
  };

  return (
    <button
      onClick={handleSignOut}
      type="submit"
      className="w-full block px-4 py-2 text-gray-800 hover:bg-slate-100"
    >
      Sign out
    </button>
  );
}
