import QuestionsSkeleton from "./QuestionsSkeleton";

const LearnSkeleton = () => {
  return (
    <div className="relative max-w-[1280px] w-full px-4 my-[4.5rem]">
      <div className="flex flex-col sm:flex-row sm:items-center mt-[2rem]">
        <div className="w-full sm:w-fit">
          <div className="h-[24px] w-full sm:w-[100px] rounded-xl mb-2 skeleton"></div>
          <div className="w-full sm:w-[200px] px-4 h-[41.6px] rounded-xl skeleton text-transparent">
            ALL
          </div>
        </div>
        <div className="w-full sm:w-fit mt-4 sm:mt-0 flex items-center">
          <div className="w-full sm:ml-4">
            <div className="h-[24px] w-full sm:w-[100px] rounded-xl mb-2 skeleton"></div>
            <div className="w-full sm:w-[150px] px-4 h-[41.6px] rounded-xl skeleton text-transparent">
              ALL
            </div>
          </div>
          <div className="w-full sm:w-fit ml-4">
            <div className="h-[24px] w-full sm:w-[100px] rounded-xl mb-2 skeleton"></div>
            <div className="w-full sm:w-[150px] px-4 h-[41.6px] rounded-xl skeleton text-transparent">
              ALL
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="px-4 h-[57.6px] rounded-xl text-transparent skeleton mb-4">
          header
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
    </div>
  );
};

export default LearnSkeleton;
