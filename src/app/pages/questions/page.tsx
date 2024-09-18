"use client";

//import { Suspense } from "react";
import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// components
import LearnSkeleton from "@/components/skeletons/LearnSkeleton";

// 3rd party libraries
import { useSession } from "next-auth/react";

import TopicsFilter from "@/components/TopicsFilter";
import DifficultyFilter from "@/components/DifficultyFilter";
import StatusFilter from "@/components/StatusFilter";
import QuestionsList from "@/components/QuestionList";

const Learn = () => {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "All";
  const difficulty = searchParams.get("difficulty") || "All";
  const status = searchParams.get("status") || "All";
  const page = searchParams.get("page") || "1";

  return (
    <div className="relative max-w-[1280px] w-full px-4 my-[4.5rem]">
      <div className="w-full flex flex-col sm:flex-row sm:items-center mt-[2rem]">
        <TopicsFilter currentTopic={topic.toString()} />
        <div className="mt-4 sm:mt-0 flex items-center">
          <DifficultyFilter currentDifficulty={difficulty.toString()} />
          <StatusFilter currentStatus={status.toString()} />
        </div>
      </div>
      <QuestionsList
        currentTopic={topic.toString()}
        currentDifficulty={difficulty.toString()}
        currentStatus={status.toString()}
        currentPage={Number(page)}
      />
    </div>
  );
};

const LearnPage = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // If user doesn't exist redirect to home
  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push(`/?theme=${theme}`);
    }
  }, [sessionStatus, session?.user?.id, router, theme]);

  if (sessionStatus === "loading") {
    return (
      <div
        className={`${
          theme === "light"
            ? "bg-lighter text-darker"
            : "bg-darker text-lighter"
        } min-h-screen flex justify-center`}
      >
        <LearnSkeleton />
      </div>
    );
  }

  if (!session?.user?.id) {
    return (
      <div
        className={`${
          theme === "light"
            ? "bg-lighter text-darker"
            : "bg-darker text-lighter"
        } min-h-screen flex justify-center`}
      >
        <div className="text-xl font-bold flex items-center justify-center">
          Logging out...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        theme === "light" ? "bg-lighter text-darker" : "bg-darker text-lighter"
      } min-h-screen flex justify-center`}
    >
      <Learn />
    </div>
  );
};

export default LearnPage;
