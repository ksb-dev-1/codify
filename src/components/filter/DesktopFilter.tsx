// components
import Status from "./Status";
import Difficulty from "./Difficulty";

// 3rd parrty
import { IoFilter } from "react-icons/io5";

export default function DesktopFilter() {
  return (
    <div className="hidden w-[350px] border rounded lg:flex flex-col overflow-hidden pb-8">
      <p className="flex items-center pl-6 py-3 border-b mb-6">
        <IoFilter className="mr-3 h-6 w-6" />
        <span className="text-lg font-bold">Filters</span>
      </p>
      <div className="ml-6 mb-8">
        <Status />
      </div>
      <div className="ml-6">
        <Difficulty />
      </div>
    </div>
  );
}
