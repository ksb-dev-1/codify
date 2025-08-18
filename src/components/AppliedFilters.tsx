"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// 3rd party
import NProgress from "nprogress";
import { IoCloseSharp } from "react-icons/io5";

interface AppliedFiltersProps {
  status: string | undefined;
  difficulty: string | undefined;
}

export default function AppliedFilters({
  status,
  difficulty,
}: AppliedFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const activeFilters: { key: string; value: string }[] = [];

  if (status) activeFilters.push({ key: "status", value: status });
  if (difficulty) activeFilters.push({ key: "difficulty", value: difficulty });

  const removeFilter = (key: string) => {
    params.delete(key);
    NProgress.start();
    router.push(`${pathname}?${params.toString()}`);
    setTimeout(() => NProgress.done(), 300);
  };

  const clearAll = () => {
    activeFilters.forEach(({ key }) => params.delete(key));
    NProgress.start();
    router.push("/questions?page=1"); // no query params
    setTimeout(() => NProgress.done(), 300);
  };

  if (activeFilters.length === 0) return null;

  return (
    <div className="mb-8 flex items-center gap-2 flex-wrap">
      {activeFilters.map(({ key, value }) => (
        <span
          key={key}
          className="text-sm border rounded-full px-3 py-1 flex items-center"
        >
          {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
          <IoCloseSharp
            className="cursor-pointer ml-2 text-red-600 h-4 w-4"
            onClick={() => removeFilter(key)}
          />
        </span>
      ))}

      {activeFilters.length > 1 && (
        <button
          onClick={clearAll}
          className="text-sm rounded-full px-3 py-1 bg-red-600 text-white hover:bg-red-700 transition"
        >
          Clear
        </button>
      )}
    </div>
  );
}
