"use client";

import React, {
  useImperativeHandle,
  useState,
  useRef,
  forwardRef,
} from "react";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// schemas
import { AddQuestionValues } from "@/schemas/AddQuestionSchema";

// 3rd party libraries
import { UseFormSetValue, UseFormClearErrors } from "react-hook-form";
import { RxCaretDown } from "react-icons/rx";

import { OptionKeys } from "./AddQuestionForm";

interface CorrectOptionProps {
  theme: string;
  setValue: UseFormSetValue<AddQuestionValues>;
  clearErrors: UseFormClearErrors<AddQuestionValues>;
  error?: string;
}

export interface CorrectOptionRef {
  resetCorrectOption: () => void;
}

const CorrectOption = forwardRef(function CorrectOptin(
  { theme, setValue, clearErrors, error }: CorrectOptionProps,
  ref
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [correctOption, setCorrectOption] = useState<string>("Select Option");
  const correctOptionDivRef = useRef<HTMLDivElement>(null);

  let inputValue =
    correctOption !== "Select Option"
      ? `Option ${correctOption.toUpperCase()}`
      : "Select Option";

  useImperativeHandle(ref, () => ({
    resetCorrectOption: () => setCorrectOption("Select Option"),
  }));

  useHandleOutsideClick(correctOptionDivRef, setIsDropdownOpen);

  const toggleDifficultyDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-col">
        <label
          htmlFor="correctOption"
          className="font-semibold"
          onClick={(e) => e.preventDefault()}
        >
          Correct Option
        </label>
        <div className="relative w-full" ref={correctOptionDivRef}>
          <div className="w-full" onClick={toggleDifficultyDropdown}>
            <input
              id="correctOption"
              type="text"
              className={`border ${
                theme === "light"
                  ? "bg-lighter border-light"
                  : "bg-darker border-dark"
              } mt-1 block w-full p-2 focus:outline-none cursor-pointer rounded-custom ${
                inputValue === "Select Option" ? "text-gray-400" : ""
              } ${error ? "border-[3px] border-red-300" : ""}`}
              placeholder="Select correct option"
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

          {/* Dropdown */}
          <ul
            className={`border origin-top-left ${
              theme === "light"
                ? "bg-lighter border-light"
                : "bg-darker border-dark"
            } p-2 absolute w-full modal-shadow mt-2 transition-all duration-150 ease-out rounded-custom ${
              isDropdownOpen ? "scale-100 z-10" : "scale-95 -z-10"
            } overflow-hidden`}
          >
            {(["a", "b", "c", "d"] as OptionKeys[]).map((option) => (
              <li
                key={option}
                className={`${
                  theme === "light" ? "hover:bg-light" : "hover:bg-dark"
                } p-2 cursor-pointer rounded-custom`}
                onClick={() => {
                  setCorrectOption(option);
                  setValue("correctOption", option);
                  clearErrors("correctOption");
                  toggleDifficultyDropdown();
                }}
              >
                Option {option.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
        {error && (
          <p className="text-sm text-red-500 tracking-wide">
            Correct option is required
          </p>
        )}
      </div>
    </div>
  );
});

export default CorrectOption;
