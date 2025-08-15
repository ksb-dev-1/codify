// 3rd party
import { BsSearch } from "react-icons/bs";

export default function DocumentSearchIcon() {
  return (
    <div className="relative border rounded w-28 h-32">
      <div className="bg-white absolute top-4 -left-4 border rounded w-28 h-32 p-4 space-y-2">
        <div className="h-2 w-full bg-gray-100 rounded"></div>
        <div className="h-2 w-full bg-gray-100 rounded"></div>
        <div className="h-2 w-full bg-gray-100 rounded"></div>
        <div className="h-2 w-[75%] bg-gray-100 rounded"></div>
        <div className="h-2 w-[50%] bg-gray-100 rounded"></div>
        <BsSearch className="absolute h-12 w-12 -right-2 top-8 text-primary" />
      </div>
    </div>
  );
}
