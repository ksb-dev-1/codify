"use client";

export type OptionKeys = "a" | "b" | "c" | "d";

export default function AddQuestionSkeleton({ theme }: { theme: string }) {
  return (
    <div className={`max-w-[750px] w-full my-[144px] px-8 md:p-0`}>
      <h1
        className={`${
          theme === "light" ? "skeleton-light" : "skeleton-dark"
        } w-fit mb-4 text-transparent rounded-xl text-xl`}
      >
        Add Question
      </h1>
      <form
        className={`border ${
          theme === "light" ? "border-light" : "border-dark"
        } p-8 sm:p-16 w-full space-y-4 rounded-custom`}
      >
        {/* Question */}
        <div className="flex flex-col">
          <label
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-fit text-transparent rounded-xl`}
          >
            Question
          </label>
          <input
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-full py-2 rounded-custom mt-2`}
          />
        </div>

        {/* Topics */}
        <div className="flex flex-col">
          <label
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-fit text-transparent rounded-xl`}
          >
            Topics
          </label>
          <input
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-full py-2 rounded-custom mt-2`}
          />
        </div>
        {/* <div className="text-transparent rounded-custom skeleton">
          Do you want to add new topic?
        </div> */}

        {/* Code Snippet */}
        <div className="flex flex-col">
          <label
            htmlFor="codeSnippet"
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-fit text-transparent rounded-xl`}
          >
            Code Snippet (Optional)
          </label>
          <textarea
            rows={3}
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-full rounded-custom p-2 mt-2`}
          />
        </div>

        {/* 4 Options */}
        <div className="flex flex-col space-y-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(["a", "b", "c", "d"] as OptionKeys[]).map((option) => (
              <div key={option} className="flex flex-col">
                <label
                  htmlFor={`options.${option}`}
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-fit text-transparent rounded-xl`}
                >
                  Option {option.toUpperCase()}
                </label>
                <input
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full py-2 rounded-custom skeleton mt-2`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Correct Option */}
        <div className="flex flex-col">
          <label
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-fit text-transparent rounded-xl`}
          >
            Correct Option
          </label>
          <input
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-full py-2 rounded-custom mt-2`}
          />
        </div>

        {/* Difficulty */}
        <div className="flex flex-col">
          <label
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-fit text-transparent rounded-xl`}
          >
            Difficulty
          </label>
          <input
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-full py-2 rounded-custom mt-2`}
          />
        </div>

        {/* Explanation */}
        <div className="flex flex-col">
          <label
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-fit text-transparent font-semibold rounded-xl`}
          >
            Explanation (Optional)
          </label>
          <textarea
            rows={3}
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } w-full rounded-custom mt-2`}
          />
        </div>

        {/* Submit */}
        <div
          className={`${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          } text-transparent w-full h-[41.6px] rounded-custom`}
        >
          Submit
        </div>
      </form>
    </div>
  );
}
