"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// hooks
import {
  useFetchBookmarksQuery,
  useRemoveBookmarkMutation,
} from "@/hooks/bookmarks/useBookmarks";
import { useGetPaymentStatusQuery } from "@/hooks/payments/usePayments";

// utils
import getStatusStyles from "@/utils/getStatusStyles";
import getDifficultyStyles from "@/utils/getDifficultyStyles";

// components
import StatusIndicator from "@/components/StatusIndicator";
import DifficultyTag from "@/components/DifficultyTag";
import BookmarksSkeleton from "@/components/skeletons/BookmarksSkeleton";

// 3rd party libraries
import { useSession } from "next-auth/react";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";

const BookmarksPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [pendingBookmarkId, setPendingBookmarkId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push("/");
    }
  }, [sessionStatus, session?.user?.id, router]);

  // fetch bookmarks
  const {
    data,
    isLoading: isBookmarksLoading,
    isError: isBookmarksError,
  } = useFetchBookmarksQuery();

  // Check payment status
  const {
    data: payment,
    isLoading: isPaymentStatusLoading,
    isError: isPaymentStatusError,
  } = useGetPaymentStatusQuery();

  // hook for removing bookmark
  const { removeBookmarkMutation } = useRemoveBookmarkMutation((data) => {
    setPendingBookmarkId(null);
  });

  const handleRemoveBookmark = (questionID: string) => {
    setPendingBookmarkId(questionID);
    removeBookmarkMutation.mutate(questionID);
  };

  if (
    sessionStatus === "loading" ||
    isPaymentStatusLoading ||
    isBookmarksLoading
  ) {
    return <BookmarksSkeleton />;
  }

  if (!session?.user?.id) {
    return (
      <div className="text-xl font-bold flex items-center justify-center">
        Logging out...
      </div>
    );
  }

  if (isBookmarksError || isPaymentStatusError) {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
          <p className="font-bold mb-4 text-xl">Bookmarks</p>
          <p className=" text-red-500">Failed to fetch bookmarks! Try again.</p>
        </div>
      </div>
    );
  }

  if (!isBookmarksError && !isPaymentStatusError && !data?.bookmarks) {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
          <p className="font-bold mb-4 text-xl">Bookmarks</p>
          <p className="">You do not have any bookmarks! Try adding some.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
        <p className="font-bold mb-4 text-xl">Bookmarks</p>
        <div className="">
          {data?.bookmarks.map((bookmark: any, index: any) => {
            const { bgColor, dotColor, textColor } = getStatusStyles(
              bookmark.question.questionStatuses[0].status
            );
            const {
              bgColor: dBgColor,
              borderColor,
              textColor: dTextColor,
            } = getDifficultyStyles(bookmark.question.difficulty);

            return (
              <div key={bookmark.id} className="mb-4">
                <Link
                  href={
                    bookmark.question.isPremium && payment && !payment.status
                      ? "/pages/payment"
                      : `/pages/learn/question/${bookmark.question.id}`
                  }
                  className={`flex items-center justify-between rounded-tl-xl rounded-tr-xl border border-slate-300 px-4 py-4 cursor-pointer hover:bg-slate-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <StatusIndicator
                      status={bookmark.question.questionStatuses[0].status}
                      bgColor={bgColor}
                      dotColor={dotColor}
                      textColor={textColor}
                    />

                    <div className="w-fit sm:w-[250px] flex items-center">
                      <p>{bookmark.question.topic.name}</p>
                      {bookmark.question.isPremium &&
                        isPaymentStatusLoading && (
                          <span className="inline-block h-[20px] w-[20px] rounded-full skeleton ml-4"></span>
                        )}
                      {bookmark.question.isPremium &&
                        payment &&
                        !payment.status && (
                          <BsFillLockFill className="ml-4 text-lg" />
                        )}
                      {bookmark.question.isPremium &&
                        payment &&
                        payment.status && (
                          <BsFillUnlockFill className="ml-4 text-lg" />
                        )}
                    </div>
                  </div>

                  <DifficultyTag
                    difficulty={bookmark.question.difficulty}
                    bgColor={dBgColor}
                    borderColor={borderColor}
                    textColor={dTextColor}
                  />
                </Link>
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => handleRemoveBookmark(bookmark.question.id)}
                    disabled={pendingBookmarkId === bookmark.question.id}
                    className={`w-[100px] flex justify-center bg-red-500 text-white hover:bg-red-400 py-2 rounded-bl-xl rounded-br-xl font-semibold ${
                      pendingBookmarkId === bookmark.question.id
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    {pendingBookmarkId === bookmark.question.id ? (
                      <span className="loader block"></span>
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
