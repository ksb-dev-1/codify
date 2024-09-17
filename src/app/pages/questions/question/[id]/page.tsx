"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// hooks
import {
  useMarkQuestionStartedMutation,
  useCheckQuestionMutation,
  useUncheckQuestionMutation,
} from "@/hooks/questions/useQuestions";
import {
  useCheckBookmarkStatusQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/hooks/bookmarks/useBookmarks";

// components
import QuestionSkeleton from "@/components/skeletons/QuestionSkeleton";

// 3rd party libraries
import { useSession } from "next-auth/react";
import MonacoEditor from "@monaco-editor/react";
import { IoMdArrowBack, IoIosCheckmark } from "react-icons/io";
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
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

  const questionID = params.id;

  const [question, setQuestion] = useState<Question | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMutationCalled, setIsMutationCalled] = useState<boolean>(false);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  // hook for checking question is bookmarked
  const {
    data: bookmarkStatus,
    isLoading: isBookmarkStatusLoading,
    isError: isBookmarkStatusError,
  } = useCheckBookmarkStatusQuery(
    questionID,
    sessionStatus !== "loading" && session?.user?.id !== undefined
  );

  useEffect(() => {
    if (bookmarkStatus) {
      setIsBookmarked(bookmarkStatus.isBookmarked);
    }
  }, [bookmarkStatus]);

  // hook for changing question status as started
  const { markQuestionAsStartedMutation } = useMarkQuestionStartedMutation(
    (data) => {
      setQuestion(data.question);
      setIsCorrect(data.isCorrect);
    }
  );

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

  // useEffect to call mutation only once
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
      }
    }
  }, [
    sessionStatus,
    isMutationCalled,
    questionID,
    isCorrect,
    markQuestionAsStartedMutation,
    session?.user?.id,
  ]);

  // function fot submitting answer
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

  if (sessionStatus === "loading" || markQuestionAsStartedMutation.isPending) {
    return <QuestionSkeleton />;
  }

  if (!session?.user?.id) {
    return (
      <div
        className={`${
          theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
        } min-h-screen flex flex-col items-center px-4 pt-[6.5rem]`}
      >
        <div className="text-xl font-bold flex items-center justify-center">
          <span className="font-bold text-xl"> Logging out...</span>
        </div>
      </div>
    );
  }

  if (markQuestionAsStartedMutation.isError) {
    return (
      <div
        className={`${
          theme === "light" ? "lightBg2" : "darkBg2"
        } min-h-screen flex flex-col items-center px-4 pt-[6.5rem]`}
      >
        <div className="text-xl font-bold flex items-center justify-center">
          <span className="text-red-400 font-semibold">
            Error: Failed to load question.
          </span>
        </div>
      </div>
    );
  }

  if (question) {
    return (
      <div
        className={`${
          theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
        } min-h-screen flex flex-col items-center px-4 pt-[6.5rem] pb-[4.5rem]`}
      >
        <div className="max-w-[750px] w-full flex items-center justify-between">
          {/* Back Link */}
          <Link
            href={`/pages/questions?theme=${theme}`}
            className="text-blue-500 flex items-center"
          >
            <IoMdArrowBack className="mr-2 mt-1" /> Back
          </Link>
          {/* Bookmark Button */}
          <>
            {(isBookmarked && removeBookmarkMutation.isPending) ||
            (!isBookmarked && addBookmarkMutation.isPending) ? (
              <button
                className={`${
                  theme === "light" ? "lightBg1" : "darkBg1"
                } relative h-[40px] w-[40px] rounded-full hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <span className="block loader"></span>
                </span>
              </button>
            ) : (
              ""
            )}
            {isBookmarked && !removeBookmarkMutation.isPending ? (
              <button
                onClick={() => removeBookmarkMutation.mutate(questionID)}
                className={`${
                  theme === "light" ? "lightBg1" : "darkBg1"
                } relative h-[40px] w-[40px] rounded-full hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
                aria-label="remove-bookmark"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <PiBookmarkSimpleFill className="text-red-400" />
                </span>
              </button>
            ) : (
              ""
            )}
            {!isBookmarked && !addBookmarkMutation.isPending ? (
              <button
                onClick={() => addBookmarkMutation.mutate(questionID)}
                className={`${
                  theme === "light" ? "lightBg1" : "darkBg1"
                } relative h-[40px] w-[40px] rounded-full hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
                aria-label="add-bookmark"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <PiBookmarkSimpleLight />
                </span>
              </button>
            ) : (
              ""
            )}
          </>
        </div>
        <div
          className={`${
            theme === "light" ? "lightBg1" : "darkBg1"
          } max-w-[750px] w-full rounded-custom p-4 sm:p-8 mt-2`}
        >
          {/* Question */}
          <p className="font-semibold mb-4">{question.question}</p>

          {/* Code Snippet */}
          {question.codeSnippet && (
            <div className="rounded-custom overflow-hidden">
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
                  className={`px-4 py-2 rounded-custom
                    ${
                      !isCorrect &&
                      "cursor-default hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]"
                    }
                    ${
                      theme === "light" && selectedOption !== key && !isCorrect
                        ? "lightBg2"
                        : ""
                    }
                    ${
                      theme === "dark" && selectedOption !== key && !isCorrect
                        ? "darkBg2"
                        : ""
                    } 
                    ${
                      selectedOption === key &&
                      !correctAnswer &&
                      !wrongAnswer &&
                      !isCorrect
                        ? `outline outline-[2px] outline-blue-500 ${
                            theme === "light" ? "lightBg2" : "darkBg2"
                          }`
                        : ""
                    }
                    ${
                      selectedOption === key && selectedOption === correctAnswer
                        ? "bg-green-400 text-black"
                        : ""
                    }
                    ${
                      selectedOption === key && selectedOption === wrongAnswer
                        ? "bg-red-400 text-black"
                        : ""
                    }
                    ${
                      isCorrect && question.correctOption === key
                        ? "bg-green-400 text-black cursor-not-allowed"
                        : ""
                    }
                    ${
                      isCorrect && question.correctOption !== key
                        ? `${
                            theme === "light" ? "lightBg2" : "darkBg2"
                          } opacity-50 cursor-not-allowed`
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
          <button
            onClick={() => {
              if (!isCorrect) {
                handleSubmit();
              }
            }}
            disabled={isCorrect ?? false}
            className={`h-[41.6px] flex items-center justify-center rounded-custom bg-blue-500 text-white w-full mt-4 ${
              isCorrect ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-400"
            }`}
          >
            Submit
          </button>

          {/* check / uncheck */}
          {(correctAnswer || isCorrect) && (
            <div
              className={`${
                theme === "light" ? "lightBg2" : "darkBg2"
              } w-fit flex items-center rounded-custom p-2 mt-4`}
            >
              <span className="text-sm font-semibold">Mark as Complete</span>
              {!isCorrect && !checkQuestionMutation.isPending && (
                <button
                  onClick={() => checkQuestionMutation.mutate(questionID)}
                  className={`${
                    theme === "light" ? "lightBg1" : "darkBg1"
                  } h-[25px] w-[25px] rounded ml-2 shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
                ></button>
              )}
              {(checkQuestionMutation.isPending ||
                uncheckQuestionMutation.isPending) && (
                <span
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } h-[25px] w-[25px] rounded ml-2 shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
                ></span>
              )}
              {isCorrect && !uncheckQuestionMutation.isPending && (
                <button
                  onClick={() => uncheckQuestionMutation.mutate(questionID)}
                  className="relative h-[25px] w-[25px] rounded bg-green-500 text-white ml-2 shadow-[0_0_3px_rgba(195,195,195,0.75)]"
                >
                  <IoIosCheckmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
                </button>
              )}
            </div>
          )}

          {/* Explanation */}
          {isCorrect && question.explanation ? (
            <div className="mt-4">
              <div className="font-semibold">Explanation:</div>
              <div
                className={`${
                  theme === "light"
                    ? "lightBg2 darkColor2"
                    : "darkBg2 lightColor1"
                } rounded-custom px-4 py-2 mt-2`}
              >
                {question.explanation}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  return null;
}
