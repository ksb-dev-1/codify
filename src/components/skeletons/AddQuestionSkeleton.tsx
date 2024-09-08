"use client";

export type OptionKeys = "a" | "b" | "c" | "d";

export default function AddQuestionSkeleton() {
  return (
    <div className="max-w-[750px] w-full my-[144px] px-8 md:p-0">
      <h1 className="w-fit mb-2 text-transparent rounded-xl text-xl skeleton">
        Add Question
      </h1>
      <form className="bg-white p-8 sm:p-16 w-full space-y-4 rounded-xl border border-slate-300">
        {/* Question */}
        <div className="flex flex-col">
          <label className="w-fit text-transparent rounded-xl skeleton">
            Question
          </label>
          <input className="w-full py-2 rounded-xl skeleton mt-2" />
        </div>

        {/* Topics */}
        <div className="flex flex-col">
          <label className="w-fit text-transparent rounded-xl skeleton">
            Topics
          </label>
          <input className="w-full py-2 rounded-xl skeleton mt-2" />
        </div>
        <div className="text-transparent rounded-xl skeleton">
          Do you want to add new topic?
        </div>

        {/* Code Snippet */}
        <div className="flex flex-col">
          <label
            htmlFor="codeSnippet"
            className="w-fit text-transparent rounded-xl skeleton"
          >
            Code Snippet (Optional)
          </label>
          <textarea rows={3} className="w-full rounded-xl skeleton p-2 mt-2" />
        </div>

        {/* 4 Options */}
        <div className="flex flex-col space-y-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(["a", "b", "c", "d"] as OptionKeys[]).map((option) => (
              <div key={option} className="flex flex-col">
                <label
                  htmlFor={`options.${option}`}
                  className="w-fit text-transparent rounded-xl skeleton"
                >
                  Option {option.toUpperCase()}
                </label>
                <input className="w-full py-2 rounded-xl skeleton mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Correct Option */}
        <div className="flex flex-col">
          <label className="w-fit text-transparent rounded-xl skeleton">
            Correct Option
          </label>
          <input className="w-full py-2 rounded-xl skeleton mt-2" />
        </div>

        {/* Difficulty */}
        <div className="flex flex-col">
          <label className="w-fit text-transparent rounded-xl skeleton">
            Difficulty
          </label>
          <input className="w-full py-2 rounded-xl skeleton mt-2" />
        </div>

        {/* Explanation */}
        <div className="flex flex-col">
          <label className="w-fit text-transparent font-semibold rounded-xl skeleton">
            Explanation (Optional)
          </label>
          <textarea rows={3} className="w-full rounded-xl skeleton mt-2" />
        </div>

        {/* Submit */}
        <div className="text-transparent w-full h-[41.6px] rounded-xl skeleton">
          Submit
        </div>
      </form>
    </div>
  );
}
