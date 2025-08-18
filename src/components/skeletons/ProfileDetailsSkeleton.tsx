import ProgressStatsSkeleton from "./ProgressStatsSkeleton";

export default function ProfileDetailsSkeleton() {
  return (
    <>
      <h1 className="text-xl font-bold mb-8 border-b pb-4">Profile Details</h1>
      <div className="relative border rounded p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="relative">
            <div className="skeleton relative h-[150px] w-[150px] rounded border"></div>
          </div>

          <div>
            <p className="skeleton rounded text-lg sm:text-xl font-bold">
              John Doe
            </p>
            <p className="skeleton rounded sm:mt-1 sm:text-lg">
              johndoe12345@gmail.com
            </p>
          </div>
        </div>

        {/* Delete account button */}
        <button
          aria-label="Delete account skeleton"
          className="skeleton absolute top-0 right-0 w-8 h-8 rounded-tr rounded-bl"
        ></button>
      </div>
      <ProgressStatsSkeleton />
    </>
  );
}
