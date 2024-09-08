import QuestionsSkeleton from "./QuestionsSkeleton";

const LearnSkeleton = () => {
  return (
    <div className="relative max-w-[1280px] w-full px-4 my-[4.5rem]">
      <div className="flex flex-col sm:flex-row sm:items-center mt-[2rem]">
        <div className="w-full sm:w-fit">
          <div className="h-[24px] w-full sm:w-[100px] rounded-xl mb-2 skeleton"></div>
          <div className="w-full sm:w-[200px] px-4 py-2 rounded-xl skeleton text-transparent">
            ALL
          </div>
        </div>
        <div className="w-full sm:w-fit mt-4 sm:mt-0 flex items-center">
          <div className="w-full sm:ml-4">
            <div className="h-[24px] w-full sm:w-[100px] rounded-xl mb-2 skeleton"></div>
            <div className="w-full sm:w-[150px] px-4 py-2 rounded-xl skeleton text-transparent">
              ALL
            </div>
          </div>
          <div className="w-full sm:w-fit ml-4">
            <div className="h-[24px] w-full sm:w-[100px] rounded-xl mb-2 skeleton"></div>
            <div className="w-full sm:w-[150px] px-4 py-2 rounded-xl skeleton text-transparent">
              ALL
            </div>
          </div>
        </div>
      </div>
      <QuestionsSkeleton />
    </div>
  );
};

export default LearnSkeleton;
