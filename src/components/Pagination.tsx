"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
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
        className={`px-4 py-2 mx-1 border border-slate-300 rounded-xl disabled:opacity-50 ${
          currentPage === 1 ? "cursor-not-allowed" : "hover:bg-slate-100"
        }`}
      >
        Prev
      </button>
      {getVisiblePages().map((visiblePage) => (
        <button
          key={visiblePage}
          onClick={() => handlePageChange(visiblePage)}
          className={`px-4 py-2 mx-1 border border-slate-300 rounded-xl  ${
            currentPage === visiblePage
              ? "bg-black text-white hover:bg-[#333]"
              : "hover:bg-slate-100"
          }`}
        >
          {visiblePage}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 border border-slate-300 rounded-xl disabled:opacity-50 ${
          currentPage === totalPages
            ? "cursor-not-allowed"
            : "hover:bg-slate-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
