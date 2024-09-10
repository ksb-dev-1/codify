"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party libraries
import { useQuery } from "@tanstack/react-query";
import { RxCaretDown } from "react-icons/rx";

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
    <div ref={topicDivRef} className="relative w-full sm:w-fit">
      <label htmlFor="topics" className="font-medium mb-2 inline-block">
        Topics
      </label>
      <div
        className="relative border border-slate-300 rounded-xl"
        onClick={toggleDropdown}
      >
        <input
          id="topics"
          type="text"
          className="w-full px-4 py-2 focus:outline-blue-300 cursor-pointer rounded-xl"
          placeholder="Select Topics"
          value={currentTopic}
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
        className={`w-full sm:w-[365px] flex flex-col sm:flex-row items-center sm:flex-wrap p-4 pb-2 absolute border border-slate-300 modal-shadow mt-2 bg-white transition-all duration-150 ease-out rounded-xl ${
          isDropdownOpen
            ? "scale-100 z-10 opacity-100"
            : "scale-95 -z-10 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        {!isLoading && isError && (
          <p className="text-sm text-red-500 tracking-wide">
            Failed to load topics
          </p>
        )}
        {isLoading ? (
          <>
            <div className="w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-xl skeleton mr-2 mb-2"></div>
            <div className="w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-xl skeleton mr-2 mb-2"></div>
            <div className="w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-xl skeleton mr-2 mb-2"></div>
            <div className="w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-xl skeleton mr-2 mb-2"></div>
            <div className="w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-xl skeleton mr-2 mb-2"></div>
            <div className="w-full sm:w-[112px] border-none h-[40px] focus:outline-none rounded-xl skeleton mr-2 mb-2"></div>
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
                href={`/pages/learn?${newParams.toString()}`}
                key={topic.id}
                className="w-full sm:w-fit px-4 py-2 border border-slate-300 hover:bg-slate-100 cursor-pointer rounded-xl mr-0 sm:mr-2 mb-2"
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
  );
}
