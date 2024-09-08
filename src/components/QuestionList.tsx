"use client";

import Link from "next/link";

// componens
import Pagination from "@/components/Pagination";
import QuestionsSkeleton from "@/components/skeletons/QuestionsSkeleton";

// hooks
import { useFetchQuestionsQuery } from "@/hooks/questions/useFetchQuestionsQuery";
import { useGetPaymentStatusQuery } from "@/hooks/payment/useGetPaymentStatusQuery";

// utils
import getStatusStyles from "@/utils/getStatusStyles";
import getDifficultyStyles from "@/utils/getDifficultyStyles";

// components
import StatusIndicator from "./StatusIndicator";
import DifficultyTag from "./DifficultyTag";

// 3rd party libraries
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";

interface QuestionsProps {
  currentTopic: string;
  currentDifficulty: string;
  currentStatus: string;
  currentPage: number;
}

const QuestionsList = ({
  currentTopic,
  currentDifficulty,
  currentStatus,
  currentPage,
}: QuestionsProps) => {
  // Fetch questions
  const {
    data: questionList,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useFetchQuestionsQuery({
    currentTopic,
    currentDifficulty,
    currentStatus,
    currentPage,
  });

  // Check payment status
  const {
    data: payment,
    isLoading: isPaymentStatusLoading,
    isError: isPaymentStatusError,
  } = useGetPaymentStatusQuery();

  const totalPages = questionList?.totalPages || 1;
  const questions = questionList?.questions || [];

  if (isQuestionsLoading || isPaymentStatusLoading) {
    return <QuestionsSkeleton />;
  }

  if (isQuestionsError && isPaymentStatusError) {
    return (
      <div className="mt-8">
        <p className="font-semibold text-red-500">
          Failed to fetch questions! Try again.
        </p>
      </div>
    );
  }

  if (!isQuestionsError && !isPaymentStatusError && questions.length === 0) {
    return (
      <div className="mt-8">
        <p className="font-semibold">No questions available!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between border border-black bg-black text-white px-4 py-4 rounded-xl mb-4">
        <div className="flex items-center">
          <span className="hidden sm:block sm:w-[150px] font-bold">Status</span>
          <span className="w-fit sm:w-[250px] font-bold">Topic</span>
        </div>
        <span className="font-bold">Difficulty</span>
      </div>
      <div className="border-t border-r border-l border-slate-300 rounded-xl overflow-clip">
        {questions.map((question: any, index: any) => {
          const { bgColor, dotColor, textColor } = getStatusStyles(
            question.status
          );
          const {
            bgColor: dBgColor,
            borderColor,
            textColor: dTextColor,
          } = getDifficultyStyles(question.difficulty);

          return (
            <Link
              href={
                question.isPremium && payment && !payment.status
                  ? "/pages/payment"
                  : `/pages/learn/question/${question.id}`
              }
              key={question.id}
              className={`flex items-center justify-between border-b border-slate-300 px-4 py-4 cursor-pointer hover:bg-slate-100 ${
                index % 2 === 0 ? "bg-white" : "bg-white"
              }`}
            >
              <div className="flex items-center">
                <StatusIndicator
                  status={question.status}
                  bgColor={bgColor}
                  dotColor={dotColor}
                  textColor={textColor}
                />

                <div className="w-fit sm:w-[250px] flex items-center">
                  <p>{question.topicName}</p>
                  {question.isPremium && isPaymentStatusLoading && (
                    <span className="inline-block h-[20px] w-[20px] rounded-full skeleton ml-4"></span>
                  )}
                  {question.isPremium && payment && !payment.status && (
                    <BsFillLockFill className="ml-4 text-lg" />
                  )}
                  {question.isPremium && payment && payment.status && (
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
          );
        })}
      </div>
      {/* Pagination */}
      <div className="w-full mt-4 flex justify-center sm:justify-end">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default QuestionsList;
