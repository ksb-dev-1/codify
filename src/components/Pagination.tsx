"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const router = useRouter();

  const getVisiblePages = () => {
    const startPage = Math.floor((currentPage - 1) / 3) * 3 + 1;
    return [startPage, startPage + 1, startPage + 2].filter(
      (page) => page > 0 && page <= totalPages
    );
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded-custom disabled:opacity-50 ${
          theme === "light" ? "lightBg1 darkColor2" : "darkBg1 lightColor1"
        } ${
          currentPage === 1
            ? "cursor-not-allowed"
            : "cursor-pointer hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]"
        } w-full px-4 py-2 focus:outline-none rounded-custom`}
      >
        Prev
      </button>
      {getVisiblePages().map((visiblePage) => (
        <button
          key={visiblePage}
          onClick={() => handlePageChange(visiblePage)}
          className={`px-4 py-2 mx-1 rounded-custom hover:shadow-[0_0_3px_rgba(195,195,195,0.75)] ${
            currentPage === visiblePage
              ? "bg-black text-white hover:bg-[#333]"
              : ""
          }${
            theme === "light"
              ? currentPage === visiblePage
                ? "text-white"
                : "darkColor1" + " lightBg1"
              : "darkBg1 lightColor1"
          }`}
        >
          {visiblePage}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded-custom disabled:opacity-50 ${
          theme === "light" ? "lightBg1 darkColor2" : "darkBg1 lightColor1"
        } ${
          currentPage === totalPages
            ? "cursor-not-allowed"
            : "cursor-pointer hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]"
        } w-full px-4 py-2 focus:outline-none rounded-custom`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
