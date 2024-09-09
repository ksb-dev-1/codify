// 3rd party libraries
import axios from "axios";

// API call to get the payment status
export const getPaymentStatus = async () => {
  const response = await axios.get("/api/payment/status");
  return response.data;
};

// API call to create a payment
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
