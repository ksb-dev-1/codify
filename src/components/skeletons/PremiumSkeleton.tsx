export default function PremiumSkeleton({ text }: { text: string }) {
  return (
    <>
      <h1 className="text-xl font-bold mb-8 border-b pb-4">{text}</h1>
      <div className="border px-6 sm:px-8 md:px-16 py-8 rounded flex flex-col items-center gap-6">
        <h1 className="skeleton rounded font-bold text-xl sm:text-2xl md:text-3xl text-center">
          You are already a premium member
        </h1>
        <p className="skeleton rounded sm:text-lg md:text-xl text-center font-semibold">
          Thank you for your support 🎉
        </p>
        <div className="skeleton rounded px-6 py-3 text-xl flex items-center">
          Start practicing
        </div>
      </div>
    </>
  );
}
