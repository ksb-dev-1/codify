import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// hooks
import {
  useGetPaymentStatusQuery,
  useCreatePaymentMutation,
} from "@/hooks/payments/usePayments";

// 3rd party libraries
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";

export default function Checkout({ amount }: { amount: number }) {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

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
    fetch(`/api/stripe/create-payment-intent`, {
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
      <div
        className={`border ${
          theme === "light"
            ? "bg-lighter border-light"
            : "bg-darker border-dark"
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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg text-red-500 text-center font-semibold mb-2">
          Failed to check your payment status! Refresh.
        </h1>
      </div>
    );
  }

  if (payment && payment.status) {
    return (
      <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-orange-500 to-yellow-500 text-white p-8">
        <h1 className="text-lg text-center font-semibold mb-2">
          You are already a premium member!
        </h1>
        <Link
          href={`/pages/questions?theme=${theme}&page=1`}
          className="bg-white text-black hover:bg-slate-100 rounded-[50px] px-8 py-4 inline-block mt-4"
        >
          Continue Learning
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`border ${
        theme === "light"
          ? "bg-lighter text-darker border-light"
          : "bg-lighter text-darker border-dark"
      } rounded-custom p-8`}
    >
      <span
        className={`${
          theme === "light" ? "bg-light" : "bg-dark text-lighter"
        } font-medium text-sm mb-4 inline-block px-4 py-2 rounded-custom`}
      >
        Card No : 4242 4242 4242 4242
      </span>
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading || createPaymentMutation.isPending}
        className="bg-gradient-to-tr from-orange-500 to-yellow-500 text-white w-full p-4 mt-2 rounded-custom font-bold disabled:opacity-50"
      >
        {!loading && !createPaymentMutation.isPending
          ? `Pay ₹${amount}`
          : "Processing..."}
      </button>
    </form>
  );
}
