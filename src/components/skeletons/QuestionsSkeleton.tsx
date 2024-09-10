import React from "react";

const QuestionsSkeleton = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between border border-black bg-black text-white px-4 py-4 rounded-xl mb-4">
        <div className="flex items-center">
          <span className="hidden sm:block sm:w-[150px] font-bold">Status</span>
          <span className="w-fit sm:w-[250px] font-bold">Topic</span>
        </div>
        <span className="font-bold">Difficulty</span>
      </div>
      <div className="">
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 1
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 2
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 3
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 4
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 5
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 6
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 7
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 8
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 9
        </div>
        <div className="px-4 h-[60px] text-transparent rounded-xl mb-4 skeleton">
          Question 10
        </div>
      </div>
    </div>
  );
};

export default QuestionsSkeleton;
