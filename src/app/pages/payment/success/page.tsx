"use client";

import Link from "next/link";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center p-8 rounded-xl bg-gradient-to-tr from-orange-500 to-yellow-500 text-white">
        <h1 className="text-xl font-bold mb-2">Thank you!</h1>
        <p className="text-lg font-semibold mt-4">
          Your payment of <span className="font-bold">₹{amount}</span> is
          successful!
        </p>
        <Link
          href="/pages/learn?page=1"
          className="bg-white text-black hover:bg-slate-100 rounded-[50px] px-8 py-4 custom-pulse inline-block custom-pulse mt-8"
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
}
