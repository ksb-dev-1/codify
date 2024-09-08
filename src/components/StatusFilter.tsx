"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party libraries
import { useSearchParams } from "next/navigation";
import { RxCaretDown } from "react-icons/rx";

interface StatusProps {
  currentStatus: string;
}

const statuses = ["All", "Todo", "Started", "Completed"];

export default function StatusFilter({ currentStatus }: StatusProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const statusDivRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

  useHandleOutsideClick(statusDivRef, setIsDropdownOpen);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className="relative w-[calc(50%-0.5rem)] ml-2 sm:w-[150px] sm:ml-4"
      ref={statusDivRef}
    >
      <label htmlFor="status" className="font-medium mb-2 inline-block">
        Status
      </label>
      <div
        className="relative border border-slate-300 rounded-xl"
        onClick={toggleDropdown}
      >
        <input
          id="status"
          type="text"
          className="w-full px-4 py-2 focus:outline-blue-300 cursor-pointer rounded-xl"
          value={currentStatus}
          readOnly
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        />
        <span className="absolute right-2 top-[30%] pointer-events-none">
          <RxCaretDown
            className={`transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </div>

      <div
        className={`flex flex-col w-full p-2 absolute border border-slate-300 modal-shadow mt-2 bg-white transition-all duration-150 ease-out rounded-xl ${
          isDropdownOpen
            ? "scale-100 z-10 opacity-100"
            : "scale-95 -z-10 opacity-0 pointer-events-none"
        }} overflow-hidden`}
      >
        {statuses.map((status) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("status", status);
          newParams.set("page", "1");

          return (
            <Link
              key={status}
              href={`/pages/learn?${newParams.toString()}`}
              className="px-4 py-2 hover:bg-slate-100 rounded-xl"
              onClick={() => {
                toggleDropdown();
              }}
            >
              {status}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
