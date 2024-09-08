"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

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
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus !== "loading" && !session?.user?.id) {
      router.push("/");
    }
  }, [sessionStatus, session?.user?.id, router]);

  const amount: number = 499;

  const content = useMemo(() => {
    if (sessionStatus === "loading") {
      return <div>Loading...</div>;
    }
    if (!session?.user?.id) {
      return (
        <div className="text-xl font-bold flex items-center justify-center">
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
  }, [sessionStatus, session?.user?.id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-[500px] w-full border border-slate-300 rounded-xl overflow-clip p-8">
        {content}
      </div>
    </div>
  );
};

export default PaymentPage;
