"use client";

import { useSearchParams } from "next/navigation";

// components
import LinkWithProgress from "@/components/shared/LinkWithProgress";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const groupSize = 5;
    const groupStart =
      Math.floor((currentPage - 1) / groupSize) * groupSize + 1;

    return Array.from({ length: groupSize }, (_, i) => groupStart + i).filter(
      (page) => page <= totalPages
    );
  };

  return (
    <div className="w-full mt-8 flex justify-center md:justify-end">
      {/* Prev Button */}
      <LinkWithProgress
        href={createPageUrl(currentPage - 1)}
        className={`border px-3 py-1 mr-2 rounded ${
          currentPage === 1
            ? "pointer-events-none bg-[#d6d6d6] text-white"
            : "bg-primary border-primary text-white hover:opacity-80 transition-opacity"
        }`}
        aria-disabled={currentPage === 1}
      >
        Prev
      </LinkWithProgress>

      {/* Number Buttons */}
      <div className="flex items-center gap-2">
        {getVisiblePages().map((visiblePage) => (
          <LinkWithProgress
            key={visiblePage}
            href={createPageUrl(visiblePage)}
            className={`border h-8 w-8 rounded transition-colors flex items-center justify-center ${
              currentPage === visiblePage
                ? "bg-primary border-primary text-white pointer-events-none"
                : "bg-white hover:bg-slate-100"
            }`}
            aria-current={currentPage === visiblePage ? "page" : undefined}
          >
            {visiblePage}
          </LinkWithProgress>
        ))}
      </div>

      {/* Next Button */}
      <LinkWithProgress
        href={createPageUrl(currentPage + 1)}
        className={`border px-3 py-1 ml-2 rounded ${
          currentPage === totalPages
            ? "pointer-events-none bg-[#d6d6d6] text-white"
            : "bg-primary border-primary text-white hover:opacity-80 transition-opacity"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </LinkWithProgress>
    </div>
  );
}
