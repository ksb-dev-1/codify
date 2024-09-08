import React from "react";

const BookmarksSkeleton = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
        <p className="font-bold text-xl mb-4">Bookmarks</p>
        <div className="mb-4">
          <div className="h-[60.8px] rounded-tl-xl rounded-tr-xl border border-slate-300 text-transparent skeleton">
            Question
          </div>
          <div className="w-full flex justify-end">
            <button className="w-[100px] flex justify-center py-2 rounded-bl-xl rounded-br-xl font-semibold text-transparent skeleton">
              Remove
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className="h-[60.8px] rounded-tl-xl rounded-tr-xl border border-slate-300 text-transparent skeleton">
            Question
          </div>
          <div className="w-full flex justify-end">
            <button className="w-[100px] flex justify-center py-2 rounded-bl-xl rounded-br-xl font-semibold text-transparent skeleton">
              Remove
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className="h-[60.8px] rounded-tl-xl rounded-tr-xl border border-slate-300 text-transparent skeleton">
            Question
          </div>
          <div className="w-full flex justify-end">
            <button className="w-[100px] flex justify-center py-2 rounded-bl-xl rounded-br-xl font-semibold text-transparent skeleton">
              Remove
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className="h-[60.8px] rounded-tl-xl rounded-tr-xl border border-slate-300 text-transparent skeleton">
            Question
          </div>
          <div className="w-full flex justify-end">
            <button className="w-[100px] flex justify-center py-2 rounded-bl-xl rounded-br-xl font-semibold text-transparent skeleton">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarksSkeleton;
