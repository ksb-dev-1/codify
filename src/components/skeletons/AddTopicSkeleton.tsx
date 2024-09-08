"use client";

export default function AddTopicSkeleton() {
  return (
    <div className="max-w-[750px] w-full my-[144px] px-8 md:p-0">
      <h1 className="mb-4 font-bold text-xl">Add Topic</h1>
      <form className="p-8 sm:p-16 w-full bg-white space-y-4 rounded-xl border border-slate-300">
        <div>
          <label className="text-transparent rounded-xl skeleton">
            New Topic
          </label>
          <input className="w-full py-2 rounded-xl skeleton mt-2" />
        </div>
        <div className="text-transparent w-full h-[41.6px] rounded-xl skeleton">
          Submit
        </div>
        <div className="w-fit text-transparent rounded-xl skeleton">
          Go back to add question
        </div>
      </form>
    </div>
  );
}
