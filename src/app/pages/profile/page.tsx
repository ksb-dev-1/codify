"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// hooks
import {
  useFetchQuestionsCountQuery,
  useFetchUserAddedQuestionsQuery,
  useRemoveUserAddedQuestionkMutation,
} from "@/hooks/questions/useQuestions";
import { useGetPaymentStatusQuery } from "@/hooks/payments/usePayments";
import { useDeleteAccountMutation } from "@/hooks/useDeleteAccount";

// utils
import getDifficultyStyles from "@/utils/getDifficultyStyles";
import getStatusStyles from "@/utils/getStatusStyles";

// components
import QuestionProgressBar from "@/components/QuestionProgressBar";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import DifficultyTag from "@/components/DifficultyTag";
import StatusIndicator from "@/components/StatusIndicator";

// 3rd party libraries
import { useSession, signOut } from "next-auth/react";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { CiUser } from "react-icons/ci";

const ProfilePage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const [pendingQuestionId, setPendingQuestionId] = useState<string | null>(
    null
  );

  const deleteAccountBtnRef = useRef<HTMLButtonElement>(null);
  const deleteAccountModalRef = useRef<HTMLDivElement>(null);
  const deleteAccountInnerRef = useRef<HTMLDivElement>(null);
  const noOptionRef = useRef<HTMLButtonElement>(null);
  const yesOptionRef = useRef<HTMLButtonElement>(null);

  // If user doesn't exist redirect to home
  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push(`/?theme=${theme}`);
    }
  }, [sessionStatus, session?.user?.id, router, theme]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        deleteAccountBtnRef.current &&
        !deleteAccountBtnRef.current.contains(event.target as Node) &&
        deleteAccountModalRef.current &&
        deleteAccountModalRef.current.contains(event.target as Node) &&
        deleteAccountInnerRef.current &&
        !deleteAccountInnerRef.current.contains(event.target as Node)
      ) {
        deleteAccountModalRef.current.style.transform = "scale(0)";
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showModal = (event: any) => {
    if (deleteAccountModalRef.current) {
      deleteAccountModalRef.current.style.transform = "scale(100%)";
    }
  };

  const hideModal = (event: any) => {
    if (
      deleteAccountModalRef.current &&
      deleteAccountModalRef.current.contains(event.target as Node)
    ) {
      deleteAccountModalRef.current.style.transform = "scale(0)";
    }
  };

  // fetch questions count
  const {
    data: questionsCount,
    isLoading: isQuestionsCountLoading,
    isError: isQuestionsCountError,
  } = useFetchQuestionsCountQuery(
    sessionStatus !== "loading" && session?.user?.id !== undefined
  );

  // check payment status
  const {
    data: payment,
    isLoading: isPaymentStatusLoading,
    isError: isPaymentStatusError,
  } = useGetPaymentStatusQuery(
    sessionStatus !== "loading" && session?.user?.id !== undefined
  );

  // fetch user added questions
  const {
    data: userAddedQuestions,
    isLoading: isUserAddedQuestionsLoading,
    isError: isUserAddedQuestionsError,
  } = useFetchUserAddedQuestionsQuery(
    sessionStatus !== "loading" && session?.user?.id !== undefined
  );

  // hook for removing bookmark
  const { removeUserAddedQuestionkMutation } =
    useRemoveUserAddedQuestionkMutation((data) => {
      setPendingQuestionId(null);
    });

  // hook for deleting account
  const { deleteAccountMutation } = useDeleteAccountMutation(() =>
    router.push("/")
  );

  const handleRemoveUserAddedQuestion = (questionID: string) => {
    setPendingQuestionId(questionID);
    removeUserAddedQuestionkMutation.mutate(questionID);
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate();
  };

  if (sessionStatus === "loading" || isQuestionsCountLoading) {
    return <ProfileSkeleton />;
  }

  if (!session?.user?.id) {
    return (
      <div
        className={`${
          theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
        } min-h-screen flex items-center justify-center`}
      >
        <p className="font-bold text-xl">Logging Out...</p>
      </div>
    );
  }

  if (isQuestionsCountError) {
    return (
      <div
        className={`${
          theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
        } min-h-screen flex justify-center`}
      >
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
    <>
      <div
        className={`${
          theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
        } min-h-screen flex justify-center`}
      >
        <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
          <p className="font-bold mb-4 text-xl">Profile</p>
          <div className="flex flex-col md:flex-row md:items-start">
            <div
              className={`${
                theme === "light" ? "lightBg1" : "darkBg1"
              } md:max-w-[350px] w-full flex flex-col p-4 md:p-8 rounded-custom`}
            >
              <div className="flex flex-col items-center">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    height={100}
                    width={100}
                    alt="Profile Image"
                    className="rounded-full"
                    priority
                  />
                ) : (
                  <div
                    className={`${
                      theme === "light" ? "lightBg2" : "darkBg2"
                    } relative rounded-full w-[100px] h-[100px]`}
                  >
                    <CiUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl" />
                  </div>
                )}
                <div className="flex flex-col items-center mt-4">
                  {session.user.name ? (
                    <p className="font-bold">{session.user.name}</p>
                  ) : (
                    ""
                  )}
                  {session.user.email ? <p>{session.user.email}</p> : ""}
                </div>
              </div>
              {isPaymentStatusLoading ? (
                <Link
                  href="#"
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } mt-4 font-semibold px-4 py-2 rounded-custom text-transparent`}
                >
                  Add Que...
                </Link>
              ) : (
                ""
              )}
              {payment && !payment.status ? (
                <Link
                  href={`/pages/payment?theme=${theme}`}
                  className={`${
                    theme === "light" ? "lightBg2" : "darkBg2"
                  } mt-4 font-semibold px-4 py-2 rounded-custom text-center hover:shadow-[0_0_3px_rgba(195,195,195,0.75)] flex items-center justify-center`}
                >
                  Add Question <BsFillLockFill className="text-lg ml-2" />
                </Link>
              ) : (
                ""
              )}
              {payment && payment.status ? (
                <Link
                  href={`/pages/add-question?theme=${theme}`}
                  className={`${
                    theme === "light" ? "lightBg2" : "darkBg2"
                  } mt-4 font-semibold px-4 py-2 rounded-custom text-center hover:shadow-[0_0_3px_rgba(195,195,195,0.75)] flex items-center justify-center`}
                >
                  Add Question <BsFillUnlockFill className="text-lg ml-2" />
                </Link>
              ) : (
                ""
              )}
              <button
                ref={deleteAccountBtnRef}
                onClick={(e) => showModal(e)}
                className={`mt-2 font-semibold bg-red-500 text-white px-4 py-2 rounded-custom hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
              >
                Delete Account
              </button>
            </div>
            <div className="w-full flex flex-col">
              <div
                className={`${
                  theme === "light" ? "lightBg1" : "darkBg1"
                } mt-4 md:mt-0 md:ml-4 p-4 md:p-8 rounded-custom`}
              >
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
              <div className="mt-8 md:ml-4">
                <p className="font-semibold mb-4">
                  Your Questions (
                  {userAddedQuestions && userAddedQuestions.length})
                </p>
                {isUserAddedQuestionsLoading ? "Loading..." : ""}
                {userAddedQuestions &&
                  userAddedQuestions.length > 0 &&
                  userAddedQuestions.map((question: any, index: any) => {
                    const { bgColor, dotColor, textColor } = getStatusStyles(
                      question.questionStatuses.length > 0
                        ? question.questionStatuses[0].status
                        : "Todo"
                    );

                    const {
                      bgColor: dBgColor,
                      borderColor,
                      textColor: dTextColor,
                    } = getDifficultyStyles(question.difficulty);

                    return (
                      <div key={question.id} className="mb-4">
                        <Link
                          href={
                            question.isPremium && payment && !payment.status
                              ? `/pages/payment?theme=${theme}`
                              : `/pages/questions/question/${question.id}?theme=${theme}`
                          }
                          className={`flex items-center justify-between px-4 py-4 cursor-pointer hover:shadow-[0_0_3px_rgba(195,195,195,0.75)] rounded-tl-custom rounded-tr-custom ${
                            theme === "light"
                              ? "lightBg1 darkColor2"
                              : "darkBg1 lightColor1"
                          }`}
                        >
                          <div className="flex items-center">
                            <StatusIndicator
                              status={
                                question.questionStatuses.length > 0
                                  ? question.questionStatuses[0].status
                                  : "Todo"
                              }
                              bgColor={bgColor}
                              dotColor={dotColor}
                              textColor={textColor}
                              isProfilePage={true}
                            />

                            <div className="w-fit sm:w-[250px] flex items-center">
                              <p>{question.topic.name}</p>
                              {question.isPremium && isPaymentStatusLoading && (
                                <span className="inline-block h-[20px] w-[20px] rounded-full skeleton ml-4"></span>
                              )}
                              {question.isPremium &&
                                payment &&
                                !payment.status && (
                                  <BsFillLockFill className="ml-4 text-lg" />
                                )}
                              {question.isPremium &&
                                payment &&
                                payment.status && (
                                  <BsFillUnlockFill className="ml-4 text-lg" />
                                )}
                            </div>
                          </div>

                          <DifficultyTag
                            difficulty={question.difficulty}
                            bgColor={dBgColor}
                            borderColor={borderColor}
                            textColor={dTextColor}
                          />
                        </Link>
                        <div className="w-full flex justify-end">
                          <button
                            onClick={() =>
                              handleRemoveUserAddedQuestion(question.id)
                            }
                            disabled={pendingQuestionId === question.id}
                            className={`${
                              pendingQuestionId === question.id
                                ? "opacity-50"
                                : ""
                            } w-[100px] flex justify-center bg-red-500 text-white hover:bg-red-300 py-2 rounded-bl-custom rounded-br-custom font-semibold`}
                          >
                            {pendingQuestionId === question.id ? (
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
        </div>
      </div>
      <div
        ref={deleteAccountModalRef}
        className={`${
          theme === "light"
            ? "bg-[rgba(241,245,249,0.95)] darkColor2"
            : "bg-[rgba(26,26,26,0.95)] lightColor1"
        } fixed z-30 top-0 left-0 right-0 bottom-0 flex items-center justify-center scale-0 transition px-4`}
      >
        <div
          ref={deleteAccountInnerRef}
          className={`${
            theme === "light" ? "lightBg1" : "darkBg1"
          } w-fit rounded-custom p-8 flex flex-col items-center modal-shadow`}
        >
          <p className="text-red-500 font-semibold">
            Do you want to delete your account?
          </p>
          <div className="flex items-center mt-4">
            {deleteAccountMutation.isPending ? (
              <button
                //ref={yesOptionRef}
                className={`bg-red-500 text-white h-[40px] w-[77.63px] flex items-center justify-center rounded-custom px-4 py-2 mr-2 hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
              >
                <span className="loader"></span>
              </button>
            ) : (
              <button
                ref={yesOptionRef}
                onClick={handleDeleteAccount}
                //disabled={deleteAccountMutation.isPending}
                className={`bg-red-500 text-white rounded-custom px-4 py-2 mr-2 hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
              >
                Delete
              </button>
            )}
            <button
              onClick={(e) => hideModal(e)}
              ref={noOptionRef}
              className={`${
                theme === "light"
                  ? "darkBg1 lightColor1"
                  : "lightBg1 darkColor2"
              } rounded-custom px-4 py-2 ml-2 hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
