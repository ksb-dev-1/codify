"use client";

import { useRef, useState } from "react";

// hooks
import { useAutoCloseOnGreaterThanOrEqualToBreakpoint } from "@/hooks/useAutoCloseOnGreaterThanOrEqualToBreakPoint";

// components
import Modal from "../shared/Modal";
import Status from "./Status";
import Difficulty from "./Difficulty";

// 3rd parrty
import { IoFilter } from "react-icons/io5";

export default function MobileFilter() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useAutoCloseOnGreaterThanOrEqualToBreakpoint(
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    1024
  );

  return (
    <>
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="flex items-center lg:hidden border rounded px-4 py-2 hover:bg-slate-100 transition-colors font-bold"
      >
        <IoFilter className="mr-2" />
        Filters
      </button>
      <Modal
        ref={filterRef}
        isOpen={isMobileFilterOpen}
        setIsOpen={setIsMobileFilterOpen}
        padding="p-8"
      >
        <div className="w-full">
          <p className="flex items-center py-3 border-b mb-6">
            <IoFilter className="mr-3 h-6 w-6" />
            <span className="text-lg font-bold">Filters</span>
          </p>
          <div className="mb-8">
            <Status setIsMobileFilterOpen={setIsMobileFilterOpen} />
          </div>
          <Difficulty setIsMobileFilterOpen={setIsMobileFilterOpen} />
        </div>
      </Modal>
    </>
  );
}
