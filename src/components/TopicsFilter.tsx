"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party libraries
import { useQuery } from "@tanstack/react-query";
import { PiCaretDownBold } from "react-icons/pi";

interface TopicsProps {
  currentTopic: string;
}

async function fetchTopics() {
  const response = await fetch("/api/topics");
  if (!response.ok) {
    throw new Error("Failed to fetch topics");
  }
  return response.json();
}

export default function TopicsFilter({ currentTopic }: TopicsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const topicDivRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useHandleOutsideClick(topicDivRef, setIsDropdownOpen);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  let allTopics: any = [];

  if (!isError && data?.topics.length > 0) {
    allTopics = [{ id: "all", name: "All" }, ...data.topics];
  } else if (data?.topics) {
    allTopics = [...data?.topics];
  }

  return (
    <div className={`relative w-full sm:w-fit`}>
      <label htmlFor="topics" className="font-medium mb-2 inline-block">
        Topics
      </label>
      <div ref={topicDivRef}>
        <div className={`relative rounded-custom`} onClick={toggleDropdown}>
          <input
            id="topics"
            type="text"
            className={`border ${
              theme === "light"
                ? "bg-lighter border-light"
                : "bg-darker border-dark"
            } w-full px-4 py-2 focus:outline-none cursor-pointer rounded-custom`}
            placeholder="Select Topics"
            value={currentTopic}
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
          } w-full sm:w-[365px] flex flex-col sm:flex-row items-center sm:flex-wrap p-4 pb-2 absolute modal-shadow mt-2 rounded-custom ${
            isDropdownOpen
              ? "scale-100 z-10 opacity-100"
              : "scale-95 -z-10 opacity-0 pointer-events-none"
          } transition-transform overflow-hidden`}
        >
          {!isLoading && isError && (
            <p className="text-sm text-red-500 tracking-wide">
              Failed to load topics
            </p>
          )}
          {isLoading ? (
            <>
              <div
                className={`w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-custom ${
                  theme === "light" ? "skeleton-light" : "skeleton-dark"
                } mr-2 mb-2`}
              ></div>
              <div
                className={`w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-custom ${
                  theme === "light" ? "skeleton-light" : "skeleton-dark"
                } mr-2 mb-2`}
              ></div>
              <div
                className={`w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-custom ${
                  theme === "light" ? "skeleton-light" : "skeleton-dark"
                } mr-2 mb-2`}
              ></div>
              <div
                className={`w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-custom ${
                  theme === "light" ? "skeleton-light" : "skeleton-dark"
                } mr-2 mb-2`}
              ></div>
              <div
                className={`w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-custom ${
                  theme === "light" ? "skeleton-light" : "skeleton-dark"
                } mr-2 mb-2`}
              ></div>
              <div
                className={`w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-custom ${
                  theme === "light" ? "skeleton-light" : "skeleton-dark"
                } mr-2 mb-2`}
              ></div>
            </>
          ) : allTopics.length === 0 ? (
            <p className="font-semibold mb-2">{data.message}</p>
          ) : (
            allTopics.map((topic: any) => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("topic", topic.name);
              newParams.set("page", "1");

              return (
                <Link
                  href={`/pages/questions?${newParams.toString()}`}
                  key={topic.id}
                  className={`border ${
                    theme === "light"
                      ? "border-light hover:bg-light"
                      : "border-dark hover:bg-dark"
                  } w-full sm:w-fit px-4 py-2 cursor-pointer rounded-custom mr-0 sm:mr-2 mb-2`}
                  onClick={() => {
                    toggleDropdown();
                  }}
                >
                  {topic.name}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
