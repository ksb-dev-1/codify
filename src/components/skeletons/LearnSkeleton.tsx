import QuestionsSkeleton from "./QuestionsSkeleton";

const LearnSkeleton = () => {
  return (
    <div className="relative max-w-[1280px] w-full px-4 my-[4.5rem]">
      <div className="flex items-center mt-[2rem]">
        <div>
          <div className="h-[24px] w-[100px] rounded-xl mb-2 skeleton"></div>
          <div className="w-[200px] px-4 py-2 rounded-xl skeleton text-transparent">
            ALL
          </div>
        </div>
        <div className="ml-4">
          <div className="h-[24px] w-[100px] rounded-xl mb-2 skeleton"></div>
          <div className="w-[150px] px-4 py-2 rounded-xl skeleton text-transparent">
            ALL
          </div>
        </div>
        <div className="ml-4">
          <div className="h-[24px] w-[100px] rounded-xl mb-2 skeleton"></div>
          <div className="w-[150px] px-4 py-2 rounded-xl skeleton text-transparent">
            ALL
          </div>
        </div>
      </div>
      <QuestionsSkeleton />
    </div>
  );
};

export default LearnSkeleton;
