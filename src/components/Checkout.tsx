import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// hooks
import { useGetPaymentStatusQuery } from "@/hooks/payment/useGetPaymentStatusQuery";
import { useCreatePaymentMutation } from "@/hooks/payment/useCreatePaymentMutation";

// 3rd party libraries
import { useSession } from "next-auth/react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";

export default function Checkout({ amount }: { amount: number }) {
  const session = useSession();
  const userID = session.data?.user?.id;
  const router = useRouter();

  useEffect(() => {
    if (session.status !== "loading" && !userID) {
      router.push("/");
    }
  }, [userID, session.status, router]);

  // check for premium user
  const { data: payment, isLoading, isError } = useGetPaymentStatusQuery();

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // save payment to database
  const { createPaymentMutation } = useCreatePaymentMutation((data) => {
    //console.log(data);
  });

  useEffect(() => {
    const description = "Payment for service/product";
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubCurrency(amount),
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        setErrorMessage("Failed to initiate payment.");
      });
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/payment/success?amount=${amount}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      createPaymentMutation.mutate({
        amount,
        paymentIntentId: paymentIntent.id,
      });
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements || isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (payment && payment.status) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg text-center font-semibold mb-2">
          You are already a premium member!
        </h1>
        <Link
          href="/pages/learn?page=1"
          className="bg-black text-white hover:bg-[#333] rounded-[50px] px-8 py-4 custom-pulse inline-block custom-pulse mt-4"
        >
          Continue Learning
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading || createPaymentMutation.isPending}
        className="bg-black text-white w-full p-4 mt-2 rounded font-bold disabled:opacity-50"
      >
        {!loading && !createPaymentMutation.isPending
          ? `Pay ₹${amount}`
          : "Processing..."}
      </button>
    </form>
  );
}
