"use client";

import Link from "next/link";

// context
import { useThemeContext } from "@/context/ThemeContext";

// 3rd party libraries
import { useSession } from "next-auth/react";

export default function StartButton() {
  const { theme } = useThemeContext();
  const { data: session } = useSession();

  return (
    <Link
      href={`${!session?.user?.id} ? "/pages/signin": "/pages/learn?page=1"`}
      className={`${
        theme === "light"
          ? "darkBg2 lightColor1 hover:bg-[#555]"
          : "lightBg1 darkColor2 hover:bg-slate-100"
      }  rounded-[50px] px-8 py-4`}
    >
      Start Learning
    </Link>
  );
}
