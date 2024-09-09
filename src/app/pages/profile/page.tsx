"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// hooks
import { useFetchQuestionsCountQuery } from "@/hooks/questions/useQuestions";

// components
import QuestionProgressBar from "@/components/QuestionProgressBar";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

// 3rd party libraries
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push("/");
    }
  }, [sessionStatus, session?.user?.id, router]);

  const {
    data: questionsCount,
    isLoading: isQuestionsCountLoading,
    isError: isQuestionsCountError,
  } = useFetchQuestionsCountQuery();

  if (sessionStatus === "loading" || isQuestionsCountLoading) {
    return <ProfileSkeleton />;
  }

  if (!session?.user?.id) {
    return (
      <div className="text-xl font-bold flex items-center justify-center">
        Logging out...
      </div>
    );
  }

  if (isQuestionsCountError) {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
          <p className="font-bold mb-4 text-xl">Profile</p>
          <p className=" text-red-500">
            Failed to fetch profile information! Try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
        <p className="font-bold mb-4 text-xl">Profile</p>
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center bg-black text-white p-8 rounded-xl">
            {session.user.image ? (
              <Image
                src={session.user.image}
                height={100}
                width={100}
                alt="Profile Image"
                className="rounded-full border-[4px] border-white"
                priority
              />
            ) : (
              ""
            )}
            <div className="mt-4 sm:mt-0 sm:ml-4">
              {session.user.name ? (
                <p className="font-bold">{session.user.name}</p>
              ) : (
                ""
              )}
              {session.user.email ? <p>{session.user.email}</p> : ""}
            </div>
          </div>
          <div className="w-full mt-4 border border-slate-300 p-4 rounded-xl">
            {questionsCount && (
              <QuestionProgressBar
                totalQuestions={questionsCount.totalQuestionsCount}
                completedQuestions={questionsCount.totalCompletedCount}
                totalEasyQuestions={questionsCount.totalEasyCount}
                completedEasyQuestions={questionsCount.easy.completed}
                totalMediumQuestions={questionsCount.totalMediumCount}
                completedMediumQuestions={questionsCount.medium.completed}
                totalHardQuestions={questionsCount.totalHardCount}
                completedHardQuestions={questionsCount.hard.completed}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
