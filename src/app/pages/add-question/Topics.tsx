"use client";

import { useState, useRef, useImperativeHandle, forwardRef } from "react";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// schemas
import { AddQuestionValues } from "@/schemas/AddQuestionSchema";

// 3rd party libraries
import { useQuery } from "@tanstack/react-query";
import { UseFormSetValue, UseFormClearErrors } from "react-hook-form";
import { RxCaretDown } from "react-icons/rx";

interface TopicsProps {
  theme: string;
  setValue: UseFormSetValue<AddQuestionValues>;
  clearErrors: UseFormClearErrors<AddQuestionValues>;
  error?: string;
}

export interface TopicRef {
  resetTopic: () => void;
}

async function fetchTopics() {
  const response = await fetch("/api/topics");
  if (!response.ok) {
    throw new Error("Failed to fetch topics");
  }
  return response.json();
}

const Topics = forwardRef(function Topics(
  { theme, setValue, clearErrors, error }: TopicsProps,
  ref
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("Select Topic");
  const topicDivRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  let inputValue = topic !== "Select Topic" ? topic : "Select Topic";

  useHandleOutsideClick(topicDivRef, setIsDropdownOpen);

  useImperativeHandle(ref, () => ({
    resetTopic: () => setTopic("Select Topic"),
  }));

  const toggleDifficultyDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-col">
        <label
          htmlFor="topic"
          className="font-semibold"
          onClick={(e) => e.preventDefault()}
        >
          Topic
        </label>

        <div className="relative w-full" ref={topicDivRef}>
          <div className="w-full" onClick={toggleDifficultyDropdown}>
            <input
              id="topic"
              type="text"
              className={`${
                theme === "light" ? "lightBg2" : "darkBg2"
              } mt-1 block w-full p-2 focus:outline-none focus:shadow-[0_0_3px_rgba(195,195,195,0.75)] cursor-pointer rounded-custom ${
                inputValue === "Select Topic" ? "text-gray-400" : ""
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
          <ul
            className={`${
              theme === "light"
                ? "lightBg2 border-[2px] border-[#e1e1e1]"
                : "darkBg2 border-[2px] border-[#555]"
            } p-2 absolute w-full modal-shadow mt-2 transition-all duration-150 ease-out rounded-custom modal-shadow ${
              isDropdownOpen ? "scale-100 z-10" : "scale-95 -z-10"
            } overflow-hidden`}
          >
            {!isLoading && isError && (
              <p className="text-sm text-red-500 tracking-wide">
                Failed to load topics
              </p>
            )}
            {isLoading ? (
              <>
                <div
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full border-none h-[40px] focus:outline-none rounded-custom`}
                ></div>
                <div
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full border-none h-[40px] focus:outline-none rounded-custom mt-2`}
                ></div>
                <div
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full border-none h-[40px] focus:outline-none rounded-custom mt-2`}
                ></div>
                <div
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full border-none h-[40px] focus:outline-none rounded-custom mt-2`}
                ></div>
              </>
            ) : data?.topics.length === 0 ? (
              <p className="">No topics available. Please check back later.</p>
            ) : (
              data.topics.map((topic: any) => (
                <li
                  key={topic.id}
                  className={`${
                    theme === "light" ? "hover:bg-[#fff]" : "hover:bg-[#282828]"
                  } p-2 cursor-pointer rounded-custom`}
                  onClick={() => {
                    setTopic(topic.name);
                    setValue("topicId", topic.id);
                    clearErrors("topicId");
                    toggleDifficultyDropdown();
                  }}
                >
                  {topic.name}
                </li>
              ))
            )}
          </ul>
        </div>
        {error && (
          <p className="text-sm text-red-500 tracking-wide">
            Topic is required
          </p>
        )}
      </div>
    </div>
  );
});

export default Topics;
