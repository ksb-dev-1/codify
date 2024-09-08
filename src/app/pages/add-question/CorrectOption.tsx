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
  setValue: UseFormSetValue<AddQuestionValues>;
  clearErrors: UseFormClearErrors<AddQuestionValues>;
  error?: string;
}

export interface CorrectOptionRef {
  resetCorrectOption: () => void;
}

const CorrectOption = forwardRef(function CorrectOptin(
  { setValue, clearErrors, error }: CorrectOptionProps,
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
              className={`mt-1 block w-full border p-2 focus:outline-blue-300 cursor-pointer rounded-xl ${
                error ? "border-[3px] border-red-300" : "border-slate-300"
              }`}
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
          <ul
            className={`p-2 absolute w-full border border-slate-300 modal-shadow mt-2 bg-white transition-all duration-150 ease-out rounded-xl ${
              isDropdownOpen ? "scale-100 z-10" : "scale-95 -z-10"
            } overflow-hidden`}
          >
            {(["a", "b", "c", "d"] as OptionKeys[]).map((option) => (
              <li
                key={option}
                className="p-2 hover:bg-slate-100 cursor-pointer rounded-xl"
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
