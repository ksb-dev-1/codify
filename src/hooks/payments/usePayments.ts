import { useRouter } from "next/navigation";

// lib
import { getPaymentStatus, createPayment } from "@/lib/payments/payments";

// 3rd party libraries
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// useCreatePaymentMutation hook
export const useCreatePaymentMutation = (
  onPaymentSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createPaymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => {
      // Invalidate the payment status query to refresh data
      queryClient.invalidateQueries({ queryKey: ["payment-status"] });

      // Redirect to the payment success page with the payment amount
      router.push(`/pages/payment/success?amount=${data.payment.amount}`);

      // Trigger any additional success callback
      onPaymentSuccess(data);
    },
    onError: (error: any) => {
      console.error("Error during payment mutation:", error);
    },
  });

  return {
    createPaymentMutation,
  };
};

// useGetPaymentStatusQuery hook
export const useGetPaymentStatusQuery = () => {
  return useQuery({
    queryKey: ["payment-status"],
    queryFn: getPaymentStatus,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
