export default function Seperator({ className }: { className: string }) {
  return (
    <span
      className={`inline-block h-5 w-[1px] bg-transparent ${className}`}
    ></span>
  );
}
