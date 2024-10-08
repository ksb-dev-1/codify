"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const theme = params.get("theme") || "light";
  const amount = params.get("amount");

  return (
    <div
      className={`${
        theme === "light" ? "bg-lighter" : "bg-darker"
      } min-h-screen flex flex-col items-center justify-center`}
    >
      <div className="text-center p-8 rounded-custom bg-gradient-to-tr from-orange-500 to-yellow-500 text-white">
        <h1 className="text-xl font-bold mb-2">Thank you!</h1>
        <p className="text-lg font-semibold mt-4">
          Your payment of <span className="font-bold">₹{amount}</span> is
          successful!
        </p>
        <Link
          href={`/pages/questions?theme=${theme}&page=1`}
          className="bg-white text-black hover:bg-slate-100 rounded-[50px] px-8 py-4 inline-block mt-8"
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
}
