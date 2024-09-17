"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Components
import AddQuestionForm from "./AddQuestionForm";
import AddQuestionSkeleton from "@/components/skeletons/AddQuestionSkeleton";

// 3rd party libraries
import { useSession } from "next-auth/react";

export default function AddQuestionPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  // If user doesn't exist redirect to home
  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push(`/?theme=${theme}`);
    }
  }, [sessionStatus, session?.user?.id, router, theme]);

  const content = useMemo(() => {
    if (sessionStatus === "loading") {
      return <AddQuestionSkeleton theme={theme} />;
    }
    if (!session?.user?.id) {
      return <div className="text-xl font-bold">Logging out...</div>;
    }
    return <AddQuestionForm theme={theme} />;
  }, [sessionStatus, session?.user?.id, theme]);

  return (
    <div
      className={`${
        theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
      } min-h-screen flex flex-col items-center justify-center`}
    >
      {content}
    </div>
  );
}
