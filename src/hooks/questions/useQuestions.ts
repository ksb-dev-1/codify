// lib
import {
  fetchQuestions,
  fetchQuestionsCount,
  markQuestionAsStarted,
  checkQuestion,
  uncheckQuestion,
} from "@/lib/questions/questions";

// 3rd party libraries
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UseQuestionsProps {
  currentTopic: string;
  currentDifficulty: string;
  currentStatus: string;
  currentPage: number;
}

// useFetchQuestionsQuery hook
export const useFetchQuestionsQuery = ({
  currentTopic,
  currentDifficulty,
  currentStatus,
  currentPage,
}: UseQuestionsProps) => {
  return useQuery({
    queryKey: [
      "questions",
      currentTopic,
      currentDifficulty,
      currentStatus,
      currentPage,
    ],
    queryFn: () =>
      fetchQuestions({
        currentTopic,
        currentDifficulty,
        currentStatus,
        currentPage,
      }),
    //placeholderData: keepPreviousData,
    staleTime: 0,
    gcTime: 0,
  });
};

// useFetchQuestionsCountQuery hook
export const useFetchQuestionsCountQuery = () => {
  return useQuery({
    queryKey: ["count"],
    queryFn: fetchQuestionsCount,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// useCheckQuestionMutation hook
export const useCheckQuestionMutation = (onCompletedSuccess: () => void) => {
  const queryClient = useQueryClient();

  const checkQuestionMutation = useMutation({
    mutationFn: checkQuestion,
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

  return { checkQuestionMutation };
};

// useMarkQuestionStartedMutation hook
export const useMarkQuestionStartedMutation = (
  onStartedSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

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

  return { markQuestionAsStartedMutation };
};

// useUncheckQuestionMutation hook
export const useUncheckQuestionMutation = (onCompletedSuccess: () => void) => {
  const queryClient = useQueryClient();

  const uncheckQuestionMutation = useMutation({
    mutationFn: uncheckQuestion,
    onSuccess: async () => {
      onCompletedSuccess();
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["count"] });
    },
    onError: (error: any) => {
      console.error("Failed to uncheck question:", error);
      toast.error("Failed to uncheck question.");
    },
  });

  return { uncheckQuestionMutation };
};
