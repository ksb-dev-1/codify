function SkeletonLink({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton w-28 h-16 flex items-center justify-center text-transparent ${className}`}
    >
      skeleton
    </div>
  );
}

export default function LoadingNavbarContent() {
  return (
    <>
      <div className="hidden md:flex items-center border-x">
        <SkeletonLink />
        <SkeletonLink className="border-x" />
        <SkeletonLink />
      </div>
      <div className="skeleton h-8 w-8 rounded-full" aria-hidden="true"></div>
    </>
  );
}
