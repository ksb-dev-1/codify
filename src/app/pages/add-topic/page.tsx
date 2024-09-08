"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

// Components
import AddTopicForm from "./AddTopicForm";
import AddTopicSkeleton from "@/components/skeletons/AddTopicSkeleton";

// 3rd party libraries
import { useSession } from "next-auth/react";

export default function AddQuestionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session?.user?.id) {
      router.push("/");
    }
  }, [status, session?.user?.id, router]);

  const content = useMemo(() => {
    if (status === "loading") {
      return <AddTopicSkeleton />;
    }
    if (!session?.user?.id) {
      return <div className="text-xl font-bold">Logging out...</div>;
    }
    return <AddTopicForm />;
  }, [status, session?.user?.id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {content}
    </div>
  );
}
