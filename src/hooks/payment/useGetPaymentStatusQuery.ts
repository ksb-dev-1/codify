import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPaymentStatus = async () => {
  const response = await axios.get("/api/payment/status");
  return response.data;
};

export const useGetPaymentStatusQuery = () => {
  return useQuery({
    queryKey: ["payment-status"],
    queryFn: getPaymentStatus,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
