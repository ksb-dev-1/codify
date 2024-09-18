"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party libraries
import { useSearchParams } from "next/navigation";
import { PiCaretDownBold } from "react-icons/pi";

interface DifficultyProps {
  currentDifficulty: string;
}

const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function DifficultyFilter({
  currentDifficulty,
}: DifficultyProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const difficultyDivRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  useHandleOutsideClick(difficultyDivRef, setIsDropdownOpen);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className="relative w-[calc(50%-0.5rem)] mr-2 sm:mr-0 sm:w-[150px] sm:ml-4"
      ref={difficultyDivRef}
    >
      <label htmlFor="difficulty" className="font-medium mb-2 inline-block">
        Difficulty
      </label>
      <div className="relative rounded-custom" onClick={toggleDropdown}>
        <input
          id="difficulty"
          type="text"
          className={`border ${
            theme === "light"
              ? "bg-lighter border-light"
              : "bg-darker border-dark"
          } w-full px-4 py-2 focus:outline-none cursor-pointer rounded-custom`}
          value={currentDifficulty}
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
        {difficulties.map((difficulty) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("difficulty", difficulty);
          newParams.set("page", "1");

          return (
            <Link
              key={difficulty}
              href={`/pages/questions?${newParams.toString()}`}
              className={`${
                theme === "light" ? "hover:bg-light" : "hover:bg-dark"
              } px-4 py-2 rounded-custom`}
              onClick={() => {
                toggleDropdown();
              }}
            >
              {difficulty}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
