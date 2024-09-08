// 3rd party ibraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const markQuestionAsStarted = async (questionID: string) => {
  const response = await axios.post("/api/questions/question/started", {
    questionID,
  });
  return response.data;
};

export const useMarkQuestionStartedMutation = (
  onStartedSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  // Mutation to mark question as started
  const markQuestionAsStartedMutation = useMutation({
    mutationFn: markQuestionAsStarted,
    onSuccess: (data) => {
      onStartedSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      console.error("Error during mutation:", error);
    },
  });

  return {
    markQuestionAsStartedMutation,
  };
};
