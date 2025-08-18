export default function ProgressStatsSkeleton() {
  return (
    <div className="mt-8 border rounded p-4 md:p-8">
      <h2 className="text-xl font-bold mb-4 skeleton rounded w-48 h-6"></h2>

      {/* Legend Skeleton */}
      <div className="flex justify-center gap-4 sm:gap-8 mb-8 md:mb-16 border-y py-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full skeleton" />
            <span className="skeleton rounded w-12 h-4"></span>
          </div>
        ))}
      </div>

      {/* Pie Charts Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="w-full max-w-xs mx-auto md:mx-4 flex flex-col items-center"
          >
            <h3 className="skeleton rounded w-20 h-5 mb-2"></h3>
            <div className="w-full h-32 md:h-40 lg:h-48 flex items-center justify-center">
              <div className="relative skeleton rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
