// 3rd party ibraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const uncheckQuestion = async (questionID: string) => {
  const response = await axios.post("/api/questions/question/uncheck", {
    questionID,
  });
  return response.data;
};

export const useUncheckQuestionMutation = (onCompletedSuccess: () => void) => {
  const queryClient = useQueryClient();

  // Mutation to mark question as completed
  const uncheckQuestionMutation = useMutation({
    mutationFn: uncheckQuestion,
    onSuccess: async () => {
      onCompletedSuccess();
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["count"] });
    },
    onError: (error: any) => {
      console.error("Failed to mark question as completed:", error);
      toast.error("Failed to mark question as completed.");
    },
  });

  return {
    uncheckQuestionMutation,
  };
};
