"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// componens
import Pagination from "@/components/Pagination";
import QuestionsSkeleton from "@/components/skeletons/QuestionsSkeleton";

// hooks
import { useFetchQuestionsQuery } from "@/hooks/questions/useQuestions";
import { useGetPaymentStatusQuery } from "@/hooks/payments/usePayments";

// utils
import getStatusStyles from "@/utils/getStatusStyles";
import getDifficultyStyles from "@/utils/getDifficultyStyles";

// components
import StatusIndicator from "./StatusIndicator";
import DifficultyTag from "./DifficultyTag";

// 3rd party libraries
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";

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
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

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
    <>
      <div
        className={`border ${
          theme === "light" ? "border-light" : "border-dark"
        } mt-8 rounded-custom overflow-hidden`}
      >
        <div
          className={`${
            theme === "light" ? "bg-lighter" : "bg-darker"
          } flex items-center justify-between px-4 py-4`}
        >
          <div className="flex items-center">
            <span className="hidden sm:block sm:w-[150px] font-semibold">
              Status
            </span>
            <span className="w-fit sm:w-[250px] font-semibold">Topic</span>
          </div>
          <span className="font-semibold">Difficulty</span>
        </div>
        <div className={``}>
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
                    ? `/pages/payment?theme=${theme}`
                    : `/pages/questions/question/${question.id}?theme=${theme}`
                }
                key={question.id}
                className={`flex items-center justify-between px-4 py-4 cursor-pointer ${
                  theme === "light" && index % 2 === 0 ? "bg-light" : ""
                } ${theme === "light" && index % 2 !== 0 ? "bg-lighter" : ""}${
                  theme === "dark" && index % 2 === 0 ? "bg-dark" : ""
                }${theme === "dark" && index % 2 !== 0 ? "bg-darker" : ""}`}
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
      </div>
      <div className="w-full mt-4 flex justify-center sm:justify-end">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
};

export default QuestionsList;
