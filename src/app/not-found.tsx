"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function NotFound() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      } min-h-screen flex flex-col items-center justify-center p-6`}
    >
      <h2 className="text-4xl font-bold mb-4">404 Not Found!</h2>
      <p className="text-lg mb-6">Could not find requested resource</p>
      <Link
        href="/"
        className="flex items-center text-blue-500 hover:underline"
      >
        <IoMdArrowBack className="mr-2" /> Go back to Home
      </Link>
    </div>
  );
}
