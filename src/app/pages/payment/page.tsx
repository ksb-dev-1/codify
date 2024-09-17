"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// lib
import convertToSubCurrency from "@/lib/convertToSubCurrency";

// components
import Checkout from "@/components/Checkout";

// 3rd party libraries
import { useSession } from "next-auth/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // If user doesn't exist redirect to home
  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push(`/?theme=${theme}`);
    }
  }, [sessionStatus, session?.user?.id, router, theme]);

  const amount: number = 499;

  const content = useMemo(() => {
    if (sessionStatus === "loading") {
      return (
        <div
          className={`${
            theme === "light" ? "lightBg1" : "darkBg1"
          } w-full flex flex-col items-center justify-center rounded-custom p-8`}
        >
          <div
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } skeleton py-6 rounded-custom w-full`}
          ></div>
          <div
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } skeleton py-6 rounded-custom w-full mt-2`}
          ></div>
          <div
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } skeleton py-6 rounded-custom w-full mt-2`}
          ></div>
          <div
            className={`${
              theme === "light" ? "skeleton-light" : "skeleton-dark"
            } skeleton py-6 rounded-custom w-full mt-2`}
          ></div>
        </div>
      );
    }
    if (!session?.user?.id) {
      return (
        <div
          className={`${
            theme === "light" ? "lightBg2" : "darkBg2"
          } text-xl font-bold flex items-center justify-center`}
        >
          Logging out...
        </div>
      );
    }

    return (
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubCurrency(amount),
          currency: "inr",
        }}
      >
        <Checkout amount={amount} />
      </Elements>
    );
  }, [sessionStatus, session?.user?.id, theme]);

  return (
    <div
      className={`${
        theme === "light" ? "lightBg2" : "darkBg2"
      } min-h-screen flex flex-col items-center justify-center px-4`}
    >
      {/* <p className="font-bold text-xl max-w-[500px] w-full flex justify-start mb-4">
        Payment
      </p> */}
      <div className="max-w-[500px] w-full rounded-custom overflow-clip">
        {content}
      </div>
    </div>
  );
};

export default PaymentPage;
