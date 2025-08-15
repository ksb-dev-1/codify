// components
import DocumentSearchIcon from "./DocumentSearchIcon";

export default function NotFound({
  text,
  isFilterApplied,
}: {
  text: string;
  isFilterApplied?: boolean;
}) {
  return (
    <div className="min-h-[calc(100vh-192px)] border rounded p-8 w-full flex flex-col items-center justify-center gap-6">
      <h2 className="text-xl md:text-2xl font-semibold">{text}</h2>
      {isFilterApplied && (
        <h3 className="text-primary">Try applying different filters.</h3>
      )}
      <DocumentSearchIcon />
    </div>
  );
}
