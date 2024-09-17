"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// schemas
import { AddQuestionValues } from "@/schemas/AddQuestionSchema";

// 3rd party libraries
import { UseFormSetValue, UseFormClearErrors } from "react-hook-form";
import { RxCaretDown } from "react-icons/rx";

const difficulties = ["Easy", "Medium", "Hard"];

interface DifficultyProps {
  theme: string;
  setValue: UseFormSetValue<AddQuestionValues>;
  clearErrors: UseFormClearErrors<AddQuestionValues>;
  error?: string;
}

export interface DifficultyRef {
  resetDifficulty: () => void;
}

const Difficulty = forwardRef(function Difficulty(
  { theme, setValue, clearErrors, error }: DifficultyProps,
  ref
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>("Select Difficulty");
  const difficultyDivRef = useRef<HTMLDivElement>(null);

  let inputValue = difficulty;

  useImperativeHandle(ref, () => ({
    resetDifficulty: () => setDifficulty("Select Difficulty"),
  }));

  useHandleOutsideClick(difficultyDivRef, setIsDropdownOpen);

  const toggleDifficultyDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-col">
        <label
          htmlFor="difficulty"
          className="font-semibold"
          onClick={(e) => e.preventDefault()}
        >
          Difficulty
        </label>
        <div className="relative w-full" ref={difficultyDivRef}>
          <div className="w-full" onClick={toggleDifficultyDropdown}>
            <input
              type="text"
              id="difficulty"
              className={`${
                theme === "light" ? "lightBg2" : "darkBg2"
              } mt-1 block w-full p-2 focus:outline-none focus:shadow-[0_0_3px_rgba(195,195,195,0.75)] cursor-pointer rounded-custom ${
                inputValue === "Select Difficulty" ? "text-gray-400" : ""
              } ${error ? "border-[3px] border-red-300" : ""}`}
              placeholder="Select Difficulty"
              value={inputValue}
              readOnly
              onClick={(e) => {
                e.stopPropagation();
                toggleDifficultyDropdown();
              }}
            />
            <span className="absolute right-2 top-[35%] pointer-events-none">
              <RxCaretDown
                className={`transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </span>
          </div>
          <ul
            className={`${
              theme === "light"
                ? "lightBg2 border-[2px] border-[#e1e1e1]"
                : "darkBg2 border-[2px] border-[#555]"
            } p-2 absolute w-full mt-2 bg-white transition-all duration-150 ease-out rounded-custom ${
              isDropdownOpen ? "scale-100 z-10" : "scale-95 -z-10"
            }`}
          >
            {difficulties.map((difficulty) => (
              <li
                key={difficulty}
                className={`${
                  theme === "light" ? "hover:bg-[#fff]" : "hover:bg-[#282828]"
                } p-2 cursor-pointer rounded-custom`}
                onClick={() => {
                  setDifficulty(difficulty);
                  setValue("difficulty", difficulty);
                  clearErrors("difficulty");
                  toggleDifficultyDropdown();
                }}
              >
                {difficulty}
              </li>
            ))}
          </ul>
        </div>
        {error && (
          <p className="text-sm text-red-500 tracking-wide">
            Difficulty is required
          </p>
        )}
      </div>
    </div>
  );
});

export default Difficulty;
