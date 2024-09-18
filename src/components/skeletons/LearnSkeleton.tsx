import { useSearchParams } from "next/navigation";
import QuestionsSkeleton from "./QuestionsSkeleton";

const LearnSkeleton = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  return (
    <div className="relative max-w-[1280px] w-full px-4 my-[4.5rem]">
      <div className="flex flex-col sm:flex-row sm:items-center mt-[2rem]">
        <div className="w-full sm:w-fit">
          <div
            className={`h-[24px] w-full sm:w-[100px] rounded-custom mb-2 ${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            }`}
          ></div>
          <div
            className={`w-full sm:w-[200px] px-4 h-[41.6px] rounded-custom ${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } text-transparent`}
          >
            TOPICS
          </div>
        </div>
        <div className="w-full sm:w-fit mt-4 sm:mt-0 flex items-center">
          <div className="w-full sm:ml-4">
            <div
              className={`h-[24px] w-full sm:w-[100px] rounded-custom mb-2 ${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              }`}
            ></div>
            <div
              className={`w-full sm:w-[150px] px-4 h-[41.6px] rounded-custom ${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              } text-transparent`}
            >
              DIFFICULTY
            </div>
          </div>
          <div className="w-full sm:w-fit ml-4">
            <div
              className={`h-[24px] w-full sm:w-[100px] rounded-custom mb-2 ${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              }`}
            ></div>
            <div
              className={`w-full sm:w-[150px] px-4 h-[41.6px] rounded-custom ${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              } text-transparent`}
            >
              STATUS
            </div>
          </div>
        </div>
      </div>
      <QuestionsSkeleton />
    </div>
  );
};

export default LearnSkeleton;
