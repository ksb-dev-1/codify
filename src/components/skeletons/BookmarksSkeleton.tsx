import React from "react";
import { useSearchParams } from "next/navigation";

const BookmarksSkeleton = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  return (
    <div
      className={`${
        theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
      } min-h-screen flex justify-center`}
    >
      <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
        <p className="font-bold text-xl mb-4">Bookmarks</p>
        <div className="mb-4">
          <div
            className={`h-[59.2px] rounded-tl-custom rounded-tr-custom text-transparent ${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            }`}
          >
            Question
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`w-[100px] flex justify-center py-2 rounded-bl-custom rounded-br-custom font-semibold text-transparent ${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              }`}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div
            className={`h-[59.2px] rounded-tl-custom rounded-tr-custom text-transparent ${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            }`}
          >
            Question
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`w-[100px] flex justify-center py-2 rounded-bl-custom rounded-br-custom font-semibold text-transparent ${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              }`}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div
            className={`h-[59.2px] rounded-tl-custom rounded-tr-custom text-transparent ${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            }`}
          >
            Question
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`w-[100px] flex justify-center py-2 rounded-bl-custom rounded-br-custom font-semibold text-transparent ${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              }`}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div
            className={`h-[59.2px] rounded-tl-custom rounded-tr-custom text-transparent ${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            }`}
          >
            Question
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`w-[100px] flex justify-center py-2 rounded-bl-custom rounded-br-custom font-semibold text-transparent ${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              }`}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarksSkeleton;
