"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function StartButton() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user?.id ? (
        <Link
          href={`/pages/learn?page=1`}
          className="bg-black text-white hover:bg-[#333] rounded-[50px] px-8 py-4 custom-pulse"
        >
          Start Learning
        </Link>
      ) : (
        <Link
          href="/pages/signin"
          className="bg-black text-white hover:bg-[#333] rounded-[50px] px-8 py-4 custom-pulse"
        >
          Start Learning
        </Link>
      )}
    </>
  );
}
