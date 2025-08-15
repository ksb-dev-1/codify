"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

// hooks
import { useUpdateQuestionStatus } from "@/hooks/useUpdateQuestionStatus";

// types
import { QuestionDetails } from "@/types/types";

// components
import QuestionStatus from "@/components/shared/QuestionCard/QuestionStatus";
import DifficultyTag from "@/components/shared/QuestionCard/DifficultyTag";
import SaveButton from "@/components/shared/QuestionCard/SaveButton";
import CodeSnippetRenderer from "@/components/CodeSnippetRenderer";
import LinkWithProgress from "@/components/shared/LinkWithProgress";

// prisma
import { DifficultyLevelEnum, QuestionStatusEnum } from "@prisma/client";

// 3rd party
import toast from "react-hot-toast";
import { IoMdArrowBack, IoIosCheckmark } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

export default function Details({
  questionDetails,
  userId,
}: {
  questionDetails: QuestionDetails;
  userId: string;
}) {
  const {
    id,
    status,
    difficulty,
    isSaved,
    qNo,
    question,
    topicName,
    codeSnippet,
    correctOption,
    options,
    explanation,
  } = questionDetails;

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filterStatus =
    (searchParams.get("status") as QuestionStatusEnum) || undefined;
  const filterDifficulty =
    (searchParams.get("difficulty") as DifficultyLevelEnum) || undefined;

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const updateStatusMutation = useUpdateQuestionStatus(
    userId,
    id,
    page,
    filterStatus,
    filterDifficulty,
    status,
    difficulty
  );

  const updateStatusAsAttempted = () => {
    updateStatusMutation.mutate(QuestionStatusEnum.ATTEMPTED);
  };

  const updateStatusAsSolved = () => {
    updateStatusMutation.mutate(QuestionStatusEnum.SOLVED);
  };

  const handleOptionClick = (option: string) => {
    setSubmitted(false);
    if (status === QuestionStatusEnum.SOLVED || (submitted && isCorrect))
      return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) {
      toast.error("Please select an option.");
      return;
    }

    if (status !== QuestionStatusEnum.ATTEMPTED) {
      updateStatusAsAttempted();
    }

    setSubmitted(true);

    if (selectedOption === correctOption) {
      toast.success("Correct Answer!");
      setIsCorrect(true);
    } else {
      toast.error("Wrong answer! Try again.");
      setIsCorrect(false);
    }
  };

  const handleTryAgain = () => {
    setSubmitted(false);
    setSelectedOption("");
    setIsCorrect(false);
  };

  const handleMarkAsSolved = () => {
    updateStatusAsSolved();
  };

  const handleUnmarkAsSolved = () => {
    updateStatusAsAttempted();
    setSubmitted(false);
    setSelectedOption("");
    setIsCorrect(false);
  };

  return (
    <div className="border rounded p-4 md:p-8">
      <div className="flex items-center justify-between border-b pb-4">
        <LinkWithProgress
          href="/questions?page=1"
          className="text-primary flex items-center"
        >
          <IoMdArrowBack className="mr-2" /> Back
        </LinkWithProgress>
        <div className="flex items-center gap-4 sm:gap-8">
          <QuestionStatus status={status} />
          <DifficultyTag difficulty={difficulty} />
          <SaveButton userId={userId} questionId={id} isSaved={isSaved} />
        </div>
      </div>

      <div className="mt-8">
        <p className="font-bold text-lg">
          {qNo}. {topicName}
        </p>
        <p className="mt-2">{question}</p>
      </div>

      {codeSnippet && (
        <div className="mt-4 rounded overflow-hidden">
          <CodeSnippetRenderer code={codeSnippet} />
        </div>
      )}

      <div className="mt-4 border-t py-4 grid md:grid-cols-2 gap-4">
        {Object.entries(options).map(([key, value]) => {
          let bgColor =
            !isCorrect && status !== "SOLVED"
              ? "hover:bg-slate-200 cursor-pointer"
              : "pointer-events-none";

          if (status === "SOLVED" && key === correctOption) {
            bgColor = "bg-emerald-600 text-white pointer-events-none";
          }

          if (submitted) {
            if (key === selectedOption) {
              bgColor =
                selectedOption === correctOption
                  ? "bg-emerald-600 text-white"
                  : "bg-red-600 text-white";
            }
          } else if (key === selectedOption) {
            bgColor = "bg-indigo-100 text-primary";
          }

          return (
            <button
              key={key}
              type="button"
              disabled={status === "SOLVED" || (submitted && isCorrect)}
              onClick={() => handleOptionClick(key)}
              className={`text-start border rounded px-4 py-2 transition-colors ${bgColor}`}
            >
              <strong className="capitalize">{key}:</strong> {value}
            </button>
          );
        })}
      </div>

      <div className="border-t">
        {status === "SOLVED" ? (
          <>
            {/* {updateStatusMutation.isPending ? (
              <div className="mt-4 flex items-center ">
                <span className="skeleton rounded-[4px] border text-transparent w-5 h-5 mr-2" />
                <span>Updating...</span>
              </div>
            ) : ( */}
            <button
              onClick={handleUnmarkAsSolved}
              className="mt-4 flex items-center hover:text-green-700 transition-colors"
            >
              <span className="relative h-5 w-5 rounded-[4px] border border-emerald-600 mr-2 bg-emerald-600 text-white">
                <IoIosCheckmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
              </span>
              <span>Marked as solved</span>
            </button>
            {/* )} */}
          </>
        ) : (
          <>
            {!isCorrect && (
              <button
                onClick={handleSubmitAnswer}
                className="w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary_dark transition-colors"
              >
                Submit
              </button>
            )}

            {submitted && isCorrect && (
              <div className="mt-4 flex items-center justify-between">
                {/* {updateStatusMutation.isPending ? (
                  <div className="flex items-center">
                    <span className="skeleton rounded-[4px] text-transparent border w-5 h-5 mr-2" />
                    <span>Updating...</span>
                  </div>
                ) : ( */}
                <button
                  onClick={handleMarkAsSolved}
                  className="flex items-center hover:text-green-700 transition-colors"
                >
                  <span className="h-5 w-5 rounded-[4px] border border-emerald-600 mr-2"></span>
                  <span>Mark as solved</span>
                </button>
                {/* )} */}
                <button
                  onClick={handleTryAgain}
                  className="border rounded px-4 py-2 flex items-center hover:bg-slate-100 transition-colors"
                >
                  <span className="inline-block mr-2">
                    <GrPowerReset />
                  </span>
                  <span>Try Again</span>
                </button>
              </div>
            )}
          </>
        )}

        {status === QuestionStatusEnum.SOLVED && explanation && (
          <p className="mt-4 bg-emerald-100 border border-emerald-300 text-emerald-700 p-4 rounded">
            {explanation}
          </p>
        )}
      </div>
    </div>
  );
}
