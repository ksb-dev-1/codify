"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// hooks
import {
  useMarkQuestionStartedMutation,
  useCheckQuestionMutation,
  useUncheckQuestionMutation,
} from "@/hooks/questions/useQuestions";
import {
  useCheckBookmarkStatus,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/hooks/bookmarks/useBookmarks";

// components
import QuestionSkeleton from "@/components/skeletons/QuestionSkeleton";

// 3rd party libraries
import { useSession } from "next-auth/react";
import MonacoEditor from "@monaco-editor/react";
import { IoMdArrowBack } from "react-icons/io";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { IoIosCheckmark } from "react-icons/io";
import toast from "react-hot-toast";

interface PageProps {
  params: {
    id: string;
  };
}

interface Question {
  id: string;
  question: string;
  codeSnippet: string;
  options: Record<string, string>;
  correctOption: string;
  explanation: string;
  topic: {
    id: string;
    name: string;
  };
}

export default function QuestionDetail({ params }: PageProps) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push("/");
    }
  }, [sessionStatus, session?.user?.id, router]);

  const questionID = params.id;

  const [question, setQuestion] = useState<Question | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMutationCalled, setIsMutationCalled] = useState<boolean>(false);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  // hook for changing question status as started
  const { markQuestionAsStartedMutation } = useMarkQuestionStartedMutation(
    (data) => {
      setQuestion(data.question);
      setIsCorrect(data.isCorrect);
    }
  );

  // hook for checking question is bookmarked
  const { checkBookmarkStatusMutation } = useCheckBookmarkStatus((data) => {
    setIsBookmarked(data.isBookmarkAdded);
  });

  // hook for check question
  const { checkQuestionMutation } = useCheckQuestionMutation(() => {
    setIsCorrect(true);
    toast.success("Question marked as completed.");
  });

  // hook for uncheck question
  const { uncheckQuestionMutation } = useUncheckQuestionMutation(() => {
    setIsCorrect(false);
    toast.success("Question marked as started.");
  });

  // hook for adding bookmark
  const { addBookmarkMutation } = useAddBookmarkMutation((data) => {
    setIsBookmarked(data.isBookmarked);
  });

  // hook for removing bookmark
  const { removeBookmarkMutation } = useRemoveBookmarkMutation((data) => {
    setIsBookmarked(data.isBookmarked);
  });

  useEffect(() => {
    if (
      sessionStatus !== "loading" &&
      !isMutationCalled &&
      questionID &&
      !isCorrect
    ) {
      setIsMutationCalled(true);

      if (session?.user?.id) {
        markQuestionAsStartedMutation.mutate(questionID);
        checkBookmarkStatusMutation.mutate(questionID);
      }
    }
  }, [
    sessionStatus,
    isMutationCalled,
    questionID,
    isCorrect,
    markQuestionAsStartedMutation,
    checkBookmarkStatusMutation,
    session?.user?.id,
  ]);

  const handleSubmit = () => {
    if (!selectedOption) {
      toast.error("You must select an option!");
      return;
    }
    if (selectedOption !== question?.correctOption) {
      setWrongAnswer(selectedOption);
      setCorrectAnswer(null);
      toast.error("Wrong answer! Try again.");
      return;
    }
    if (selectedOption === question?.correctOption) {
      setCorrectAnswer(selectedOption);
      setWrongAnswer(null);
      toast.success("Correct Answer!.");
      return;
    }
  };

  const handleAddBookmark = () => {
    addBookmarkMutation.mutate(questionID);
  };

  const handleRemoveBookmark = () => {
    removeBookmarkMutation.mutate(questionID);
  };

  if (sessionStatus === "loading" || markQuestionAsStartedMutation.isPending) {
    return <QuestionSkeleton />;
  }

  if (!session?.user?.id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-xl font-bold flex items-center justify-center">
          Logging out...
        </div>
      </div>
    );
  }

  if (markQuestionAsStartedMutation.isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-xl font-bold flex items-center justify-center">
          Error: Failed to load question.
        </div>
      </div>
    );
  }

  if (question) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4  pt-[6.5rem] pb-[4.5rem]">
        <div className="max-w-[750px] w-full flex items-center justify-between">
          {/* Back Link */}
          <Link href="/pages/learn" className="text-blue-500 flex items-center">
            <IoMdArrowBack className="mr-2 mt-1" /> Back
          </Link>
          {/* Bookmark Button */}
          <>
            {(removeBookmarkMutation.isPending ||
              addBookmarkMutation.isPending) && (
              <button
                onClick={handleRemoveBookmark}
                className="relative h-[40px] w-[40px] rounded-full border border-slate-300 hover:bg-slate-100"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <span className="block loader"></span>
                </span>
              </button>
            )}
            {isBookmarked && !removeBookmarkMutation.isPending && (
              <button
                onClick={handleRemoveBookmark}
                className="relative h-[40px] w-[40px] rounded-full border border-slate-300 hover:bg-slate-100"
                aria-label="remove-bookmark"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <PiBookmarkSimpleFill className="text-red-500" />
                </span>
              </button>
            )}
            {!isBookmarked && !addBookmarkMutation.isPending && (
              <button
                onClick={handleAddBookmark}
                className="relative h-[40px] w-[40px] rounded-full border border-slate-300 hover:bg-slate-100"
                aria-label="add-bookmark"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <PiBookmarkSimpleLight />
                </span>
              </button>
            )}
          </>
        </div>
        <div className="max-w-[750px] w-full border border-slate-300 rounded-xl p-4 sm:p-8 mt-2">
          {/* Question */}
          <p className="font-semibold mb-4">{question.question}</p>

          {/* Code Snippet */}
          {question.codeSnippet && (
            <div className="rounded-xl overflow-hidden">
              <MonacoEditor
                height="200px"
                language="javascript"
                value={question.codeSnippet}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                }}
                theme="vs-dark"
                className="monaco-editor py-4"
              />
            </div>
          )}

          {/* Multiple Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Object.entries(question.options).map(([key, value]) => {
              return (
                <div
                  key={key}
                  //className={optionClasses.trim()}
                  className={`px-4 py-2 border border-slate-300 rounded-xl
                    ${!isCorrect && "cursor-default hover:shadow-md"} 
                    ${
                      selectedOption === key &&
                      !correctAnswer &&
                      !wrongAnswer &&
                      !isCorrect
                        ? "bg-slate-100"
                        : ""
                    }
                    ${
                      selectedOption === key && selectedOption === correctAnswer
                        ? "bg-green-500 text-white"
                        : ""
                    } 
                    ${
                      selectedOption === key && selectedOption === wrongAnswer
                        ? "bg-red-500 text-white"
                        : ""
                    }
                    ${
                      isCorrect && question.correctOption === key
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : ""
                    }
                    ${
                      isCorrect && question.correctOption !== key
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  onClick={() => {
                    if (!isCorrect) {
                      setSelectedOption(key);
                      setWrongAnswer("");
                      setCorrectAnswer("");
                    }
                  }}
                >
                  <span className="font-bold">{key.toUpperCase()} : </span>
                  {value}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          {checkQuestionMutation.isPending ? (
            <button
              type="button"
              className="h-[41.6px] flex items-center justify-center rounded-xl bg-black text-white w-full mt-4"
            >
              <span className="loader"></span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (!isCorrect) {
                  handleSubmit();
                }
              }}
              disabled={isCorrect ?? false}
              className={`h-[41.6px] flex items-center justify-center rounded-xl bg-black text-white w-full mt-4 ${
                isCorrect ? "opacity-50 cursor-not-allowed" : "hover:bg-[#333]"
              }`}
            >
              Submit
            </button>
          )}

          {/* check / uncheck */}
          {(correctAnswer || isCorrect) && (
            <div className="w-fit flex items-center border border-slate-300 rounded-xl p-2 mt-4">
              <span className="text-sm font-semibold">Mark as Complete</span>
              {!isCorrect && !checkQuestionMutation.isPending && (
                <button
                  onClick={() => checkQuestionMutation.mutate(questionID)}
                  className="h-[19px] w-[19px] rounded border border-green-500 ml-2"
                ></button>
              )}
              {(checkQuestionMutation.isPending ||
                uncheckQuestionMutation.isPending) && (
                <span className="h-[19px] w-[19px] rounded border border-slate-300 ml-2 skeleton"></span>
              )}
              {isCorrect && !uncheckQuestionMutation.isPending && (
                <button
                  onClick={() => uncheckQuestionMutation.mutate(questionID)}
                  className="relative h-[20px] w-[20px] rounded bg-green-500 text-white ml-2"
                >
                  <IoIosCheckmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
                </button>
              )}
            </div>
          )}

          {/* Explanation */}
          {isCorrect && (
            <div className="mt-4">
              <div className="font-semibold">Explanation:</div>
              <div className="bg-slate-100 rounded-xl px-4 py-2 mt-2">
                {question.explanation}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
