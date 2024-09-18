import React from "react";
import { useSearchParams } from "next/navigation";

const QuestionSkeleton = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  return (
    <div
      className={`${
        theme === "light" ? "bg-lighter text-darker" : "bg-darker text-lighter"
      } min-h-screen flex flex-col items-center px-4 pt-[6.5rem] pb-[4.5rem]`}
    >
      <div className="max-w-[750px] w-full flex items-center justify-between">
        <div
          className={`${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          } text-transparent w-[100px] rounded-xl`}
        >
          Back
        </div>
        <div
          className={`${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          } h-[40px] w-[40px] rounded-full`}
        ></div>
      </div>
      <div
        className={`border ${
          theme === "light" ? "border-light" : "border-dark"
        } max-w-[750px] w-full rounded-custom p-4 sm:p-8 mt-2`}
      >
        <p
          className={`${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          } font-semibold rounded-xl text-transparent`}
        >
          Question
        </p>
        <div
          className={`${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          } h-[200px] rounded-custom skeleton my-4 text-transparent`}
        >
          Code snippet
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } rounded-custom px-4 py-2 border border-transparent text-transparent`}
          >
            Option A
          </div>
          <div
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } rounded-custom px-4 py-2 border border-transparent text-transparent`}
          >
            Option B
          </div>
          <div
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } rounded-custom px-4 py-2 border border-transparent text-transparent`}
          >
            Option C
          </div>
          <div
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } rounded-custom px-4 py-2 border border-transparent text-transparent`}
          >
            Option D
          </div>
        </div>
        <button
          className={`${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          } h-[41.6px] rounded-custom w-full mt-4 text-transparent`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionSkeleton;
