// 3rd party
import { VscError } from "react-icons/vsc";

export default function ServerErrorIcon() {
  return (
    <div className="relative border rounded w-28 space-y-2 p-2">
      <div className="relative border rounded p-4">
        <span className="absolute h-3 w-3 bg-slate-200 rounded-full left-2 bottom-2"></span>
        <span className="absolute h-1 w-8 bg-slate-200 rounded right-2 bottom-2"></span>
      </div>
      <div className="relative border rounded p-4">
        <span className="absolute h-3 w-3 bg-slate-200 rounded-full left-2 bottom-2"></span>
        <span className="absolute h-1 w-8 bg-slate-200 rounded right-2 bottom-2"></span>
      </div>
      <div className="relative border rounded p-4">
        <span className="absolute h-3 w-3 bg-slate-200 rounded-full left-2 bottom-2"></span>
        <span className="absolute h-1 w-8 bg-slate-200 rounded right-2 bottom-2"></span>
      </div>
      <VscError className="absolute h-10 w-10 -top-6 -right-3 text-red-600" />
    </div>
  );
}
