export default function StatusIndicator({
  status,
  bgColor,
  dotColor,
  textColor,
}: {
  status: string;
  bgColor: string;
  dotColor: string;
  textColor: string;
}) {
  return (
    <div className="w-[20px] sm:w-[150px] flex items-center">
      <div
        className={`${bgColor} relative h-[15px] w-[15px] rounded-full mr-2`}
      >
        <span
          className={`${dotColor} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[5px] w-[5px] rounded-full`}
        ></span>
      </div>
      <span
        className={`${textColor} font-semibold text-sm tracking-wide hidden sm:inline-block`}
      >
        {status}
      </span>
    </div>
  );
}
