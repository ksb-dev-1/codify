export default function DifficultyTag({
  difficulty,
  bgColor,
  borderColor,
  textColor,
}: {
  difficulty: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}) {
  return (
    <div className="ml-2 flex items-center justify-end">
      <span
        className={`${bgColor}  ${borderColor} ${textColor} border-2 px-2 py-1 rounded-xl font-semibold text-xs tracking-wide`}
      >
        {difficulty}
      </span>
    </div>
  );
}
