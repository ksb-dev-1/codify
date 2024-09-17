"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [pendingBookmarkId, setPendingBookmarkId] = useState<string | null>(
    null
  );

  // If user doesn't exist redirect to home
  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push(`/?theme=${theme}`);
    }
  }, [sessionStatus, session?.user?.id, router, theme]);

  // fetch bookmarks
  const {
    data,
    isLoading: isBookmarksLoading,
    isError: isBookmarksError,
  } = useFetchBookmarksQuery(
    sessionStatus !== "loading" && session?.user?.id !== undefined
  );

  // Check payment status
  const {
    data: payment,
    isLoading: isPaymentStatusLoading,
    isError: isPaymentStatusError,
  } = useGetPaymentStatusQuery(
    sessionStatus !== "loading" && session?.user?.id !== undefined
  );

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
      <div
        className={`${
          theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
        } min-h-screen flex justify-center`}
      >
        <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
          <p className="font-bold text-xl">Logging out...</p>
        </div>
      </div>
    );
  }

  if (isBookmarksError || isPaymentStatusError) {
    return (
      <div
        className={`${
          theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
        } min-h-screen flex justify-center`}
      >
        <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
          <p className="font-bold mb-4 text-xl">Bookmarks</p>
          <p className=" text-red-500">Failed to fetch bookmarks! Try again.</p>
        </div>
      </div>
    );
  }

  if (!isBookmarksError && !isPaymentStatusError && !data?.bookmarks) {
    return (
      <div
        className={`${
          theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
        } min-h-screen flex justify-center`}
      >
        <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
          <p className="font-bold mb-4 text-xl">Bookmarks</p>
          <p className="">You do not have any bookmarks! Try adding some.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
      } min-h-screen flex justify-center`}
    >
      <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
        <p className="font-bold mb-4 text-xl">Bookmarks</p>
        <div className="">
          {data?.bookmarks.map((bookmark: any, index: any) => {
            const { bgColor, dotColor, textColor } = getStatusStyles(
              bookmark.status
            );
            const {
              bgColor: dBgColor,
              borderColor,
              textColor: dTextColor,
            } = getDifficultyStyles(bookmark.difficulty);

            return (
              <div key={bookmark.id} className="mb-4">
                <Link
                  href={
                    bookmark.isPremium && payment && !payment.status
                      ? "/pages/payment"
                      : `/pages/questions/question/${bookmark.id}`
                  }
                  className={`flex items-center justify-between rounded-tl-custom rounded-tr-custom hover:shadow-[0_0_3px_rgba(195,195,195,0.75)] px-4 py-4 cursor-pointer ${
                    theme === "light" ? "lightBg1" : "darkBg1"
                  }`}
                >
                  <div className="flex items-center">
                    <StatusIndicator
                      status={bookmark.status}
                      bgColor={bgColor}
                      dotColor={dotColor}
                      textColor={textColor}
                    />

                    <div className="w-fit sm:w-[250px] flex items-center">
                      <p>{bookmark.topic}</p>
                      {bookmark.isPremium && isPaymentStatusLoading && (
                        <span className="inline-block h-[20px] w-[20px] rounded-full skeleton ml-4"></span>
                      )}
                      {bookmark.isPremium && payment && !payment.status && (
                        <BsFillLockFill className="ml-4 text-lg" />
                      )}
                      {bookmark.isPremium && payment && payment.status && (
                        <BsFillUnlockFill className="ml-4 text-lg" />
                      )}
                    </div>
                  </div>

                  <DifficultyTag
                    difficulty={bookmark.difficulty}
                    bgColor={dBgColor}
                    borderColor={borderColor}
                    textColor={dTextColor}
                  />
                </Link>
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => handleRemoveBookmark(bookmark.id)}
                    disabled={pendingBookmarkId === bookmark.id}
                    className={`w-[100px] flex justify-center bg-red-500 text-white hover:bg-red-300 py-2 rounded-bl-custom rounded-br-custom font-semibold ${
                      pendingBookmarkId === bookmark.id ? "opacity-50" : ""
                    }`}
                  >
                    {pendingBookmarkId === bookmark.id ? (
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
