import React from "react";
import { useSearchParams } from "next/navigation";

const QuestionsSkeleton = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  return (
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
      <div className="">
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          }`}
        >
          Question 1
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "bg-lighter" : "bg-darker"
          }`}
        >
          Question 2
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          }`}
        >
          Question 3
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "bg-lighter" : "bg-darker"
          }`}
        >
          Question 4
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          }`}
        >
          Question 5
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "bg-lighter" : "bg-darker"
          }`}
        >
          Question 6
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          }`}
        >
          Question 7
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "bg-lighter" : "bg-darker"
          }`}
        >
          Question 8
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          }`}
        >
          Question 9
        </div>
        <div
          className={`px-4 h-[59.2px] text-transparent ${
            theme === "light" ? "bg-lighter" : "bg-darker"
          }`}
        >
          Question 10
        </div>
      </div>
    </div>
  );
};

export default QuestionsSkeleton;
