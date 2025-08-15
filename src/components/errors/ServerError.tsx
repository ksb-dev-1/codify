// components
import ServerErrorIcon from "./ServerErrorIcon";

export default function ServerError({ message }: { message?: string }) {
  return (
    <div className="min-h-[calc(100vh-192px)] border rounded p-8 w-full flex flex-col items-center justify-center gap-6">
      <h2 className="text-xl md:text-2xl font-semibold">{message}</h2>
      <ServerErrorIcon />
    </div>
  );
}
