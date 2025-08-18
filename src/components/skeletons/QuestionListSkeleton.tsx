// components
import AppliedFilters from "../AppliedFilters";
import DesktopFilter from "../filter/DesktopFilter";
import MobileFilter from "../filter/MobileFilter";

export default function QuestionListSkeleton({
  status,
  difficulty,
  text,
  isMobile,
}: {
  status?: string;
  difficulty?: string;
  text: string;
  isMobile?: boolean;
}) {
  return (
    <>
      <div className="mb-8 border-b pb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{text}</h1>
        <MobileFilter />
      </div>
      <div className="w-full flex items-start gap-8">
        {!isMobile && <DesktopFilter />}
        <div className="w-full">
          {!isMobile && (status || difficulty) && (
            <AppliedFilters status={status} difficulty={difficulty} />
          )}
          <div className="w-full grid gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, index) => (
              <div
                key={index}
                className="skeleton h-[65.6px] sm:h-[81.6px] border rounded p-4 sm:p-6"
              />
            ))}
          </div>
          {/* {typeof totalPages === "number" && totalPages > 1 && (
              <Pagination currentPage={Number(page)} totalPages={totalPages} />
            )} */}
        </div>
      </div>
    </>
  );
}
