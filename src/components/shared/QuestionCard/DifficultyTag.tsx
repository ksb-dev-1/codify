import { DifficultyLevelEnum } from "@prisma/client";

// utils
import { getDifficultyTagClass } from "@/utils/classNames";

export default function DifficultyTag({
  difficulty,
}: {
  difficulty: DifficultyLevelEnum;
}) {
  return (
    <span
      className={`text-sm sm:text-base px-1 sm:px-2 py-[2px] rounded border ${getDifficultyTagClass(
        difficulty
      )}`}
    >
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()}
    </span>
  );
}
