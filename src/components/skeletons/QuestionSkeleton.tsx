import React from "react";

const QuestionSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-[6.5rem] pb-[4.5rem]">
      <div className="max-w-[750px] w-full flex items-center justify-between">
        <div className="text-transparent w-[100px] rounded-xl skeleton">
          Back
        </div>
        <div className="h-[40px] w-[40px] rounded-full skeleton"></div>
      </div>
      <div className="max-w-[750px] w-full border border-slate-300 rounded-xl p-8 mt-2">
        <p className="font-semibold rounded-xl text-transparent skeleton">
          Question
        </p>
        <div className="h-[200px] rounded-xl skeleton my-4 text-transparent skeleton">
          Code snippet
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl px-4 py-2 border border-transparent text-transparent skeleton">
            Option A
          </div>
          <div className="rounded-xl px-4 py-2 border border-transparent text-transparent skeleton">
            Option B
          </div>
          <div className="rounded-xl px-4 py-2 border border-transparent text-transparent skeleton">
            Option C
          </div>
          <div className="rounded-xl px-4 py-2 border border-transparent text-transparent skeleton">
            Option D
          </div>
        </div>
        <button className="h-[41.6px] rounded-xl w-full mt-4 text-transparent skeleton">
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionSkeleton;
