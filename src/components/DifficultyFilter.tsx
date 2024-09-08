"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party libraries
import { useSearchParams } from "next/navigation";
import { RxCaretDown } from "react-icons/rx";

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
      <div
        className="relative border border-slate-300 rounded-xl"
        onClick={toggleDropdown}
      >
        <input
          id="difficulty"
          type="text"
          className="w-full px-4 py-2 focus:outline-blue-300 cursor-pointer rounded-xl"
          value={currentDifficulty}
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
        {difficulties.map((difficulty) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("difficulty", difficulty);
          newParams.set("page", "1");

          return (
            <Link
              key={difficulty}
              href={`/pages/learn?${newParams.toString()}`}
              className="px-4 py-2 hover:bg-slate-100 rounded-xl"
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
