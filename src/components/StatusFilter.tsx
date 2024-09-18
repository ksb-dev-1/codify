"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party libraries
import { useSearchParams } from "next/navigation";
import { PiCaretDownBold } from "react-icons/pi";

interface StatusProps {
  currentStatus: string;
}

const statuses = ["All", "Todo", "Started", "Completed"];

export default function StatusFilter({ currentStatus }: StatusProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const statusDivRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

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
      <div className="relative rounded-custom" onClick={toggleDropdown}>
        <input
          id="status"
          type="text"
          className={`border ${
            theme === "light"
              ? "bg-lighter border-light"
              : "bg-darker border-dark"
          } w-full px-4 py-2 focus:outline-none cursor-pointer rounded-custom`}
          value={currentStatus}
          readOnly
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        />
        <span className="absolute right-4 top-[30%] pointer-events-none">
          <PiCaretDownBold
            className={`transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </div>

      {/* Dropdown */}
      <div
        className={`border origin-top-left ${
          theme === "light"
            ? "bg-lighter text-darker border-light"
            : "bg-darker text-lighter border-dark"
        } flex flex-col w-full p-2 absolute modal-shadow mt-2 rounded-custom ${
          isDropdownOpen
            ? "scale-100 z-10 opacity-100"
            : "scale-95 -z-10 opacity-0 pointer-events-none"
        }} transition-transform overflow-hidden`}
      >
        {statuses.map((status) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("status", status);
          newParams.set("page", "1");

          return (
            <Link
              key={status}
              href={`/pages/questions?${newParams.toString()}`}
              className={`${
                theme === "light" ? "hover:bg-light" : "hover:bg-dark"
              } px-4 py-2 rounded-custom`}
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
