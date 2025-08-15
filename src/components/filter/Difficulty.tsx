"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// prisma
import { DifficultyLevelEnum } from "@prisma/client";

// 3rd party
import NProgress from "nprogress";
import { IoIosCheckmark } from "react-icons/io";

const difficulties: {
  label: string;
  value: DifficultyLevelEnum;
}[] = [
  { label: "Easy", value: DifficultyLevelEnum.EASY },
  { label: "Medium", value: DifficultyLevelEnum.MEDIUM },
  { label: "Hard", value: DifficultyLevelEnum.HARD },
];

export default function Difficulty({
  setIsMobileFilterOpen,
}: {
  setIsMobileFilterOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentDifficulty = searchParams.get("difficulty") || "";

  const toggleDifficulty = (difficulty: string) => {
    // if (setIsMobileFilterOpen) setIsMobileFilterOpen(false);

    const newDifficulty = currentDifficulty === difficulty ? "" : difficulty;
    const params = new URLSearchParams(searchParams.toString());

    if (newDifficulty) {
      params.set("page", "1");
      params.set("difficulty", newDifficulty);
    } else {
      params.delete("difficulty");
    }

    NProgress.start();
    router.push(`${pathname}?${params.toString()}`);
    // setTimeout(() => NProgress.done(), 300);
  };

  return (
    <div className="flex flex-col">
      <p className="font-bold mb-4">Difficulty</p>
      <div className="space-y-3 ml-4">
        {difficulties.map(({ label, value }) => {
          const isSelected = currentDifficulty === value;

          return (
            <button
              key={value}
              onClick={() => {
                if (setIsMobileFilterOpen) setIsMobileFilterOpen(false);
                toggleDifficulty(value);
              }}
              className={`${
                isSelected ? "text-primary" : ""
              } flex items-center hover:text-primary transition-colors`}
            >
              <span
                className={`relative w-5 h-5 rounded-full border mr-2 flex items-center justify-center
                  ${isSelected ? "border-primary bg-primary text-white" : ""}
                `}
              >
                {isSelected && (
                  <IoIosCheckmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
                )}
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
