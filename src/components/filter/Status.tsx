"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// prisma
import { QuestionStatusEnum } from "@prisma/client";

// 3rd party
import NProgress from "nprogress";
import { IoIosCheckmark } from "react-icons/io";

const statuses: {
  label: string;
  value: QuestionStatusEnum;
}[] = [
  { label: "Todo", value: QuestionStatusEnum.TODO },
  { label: "Attempted", value: QuestionStatusEnum.ATTEMPTED },
  { label: "Solved", value: QuestionStatusEnum.SOLVED },
];

export default function Status({
  setIsMobileFilterOpen,
}: {
  setIsMobileFilterOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "";

  const toggleStatus = (status: string) => {
    // if (setIsMobileFilterOpen) setIsMobileFilterOpen(false);

    const isSame = currentStatus === status;
    const newStatus = isSame ? "" : status;

    const params = new URLSearchParams(searchParams.toString());

    if (newStatus) {
      params.set("page", "1");
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }

    NProgress.start();
    router.push(`${pathname}?${params.toString()}`);
    // setTimeout(() => NProgress.done(), 300);
  };

  return (
    <div className="flex flex-col">
      <p className="font-bold mb-4">Status</p>
      <div className="space-y-3 ml-4">
        {statuses.map(({ label, value }) => {
          const isSelected = currentStatus === value;

          return (
            <button
              key={value}
              onClick={() => {
                if (setIsMobileFilterOpen) setIsMobileFilterOpen(false);
                toggleStatus(value);
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
