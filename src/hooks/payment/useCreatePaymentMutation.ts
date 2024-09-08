import { useRouter } from "next/navigation";

// 3rd party libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const createPayment = async ({
  amount,
  paymentIntentId,
}: {
  amount: number;
  paymentIntentId: string;
}) => {
  const response = await axios.post("/api/payment/create", {
    amount,
    paymentIntentId,
  });
  return response.data;
};

export const useCreatePaymentMutation = (
  onPaymentSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createPaymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => {
      //queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["payment-status"] });

      router.push(`/pages/payment/success?amount=${data.payment.amount}`);
    },
    onError: (error: any) => {
      console.error("Error during mutation:", error);
    },
  });

  return {
    createPaymentMutation,
  };
};
