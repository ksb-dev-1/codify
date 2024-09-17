// lib
import {
  fetchQuestions,
  fetchQuestionsCount,
  fetchUserAddedQuestioins,
  markQuestionAsStarted,
  checkQuestion,
  uncheckQuestion,
  removeUserAddedQuestion,
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
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// useFetchQuestionsCountQuery hook
export const useFetchQuestionsCountQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["count"],
    queryFn: fetchQuestionsCount,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
};

// useFetchQuestionsCountQuery hook
export const useFetchUserAddedQuestionsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["user-questions"],
    queryFn: fetchUserAddedQuestioins,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
};

// useMarkQuestionStartedMutation hook
export const useMarkQuestionStartedMutation = (
  onStartedSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  const markQuestionAsStartedMutation = useMutation({
    mutationFn: markQuestionAsStarted,
    onSuccess: async (data) => {
      onStartedSuccess(data);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["questions"] }),
        queryClient.invalidateQueries({ queryKey: ["user-questions"] }),
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
      ]);
    },
    onError: (error: unknown) => {
      console.error("Failed to mark question as started :", error);
      if (error instanceof Error) {
        toast.error(`Failed to mark question as started : ${error.message}`);
      } else {
        toast.error("Failed to mark question as started .");
      }
    },
  });

  return { markQuestionAsStartedMutation };
};

// useCheckQuestionMutation hook
export const useCheckQuestionMutation = (onCompletedSuccess: () => void) => {
  const queryClient = useQueryClient();

  const checkQuestionMutation = useMutation({
    mutationFn: checkQuestion,
    onSuccess: async () => {
      onCompletedSuccess();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["questions"] }),
        queryClient.invalidateQueries({ queryKey: ["count"] }),
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
      ]);
    },
    onError: (error: unknown) => {
      console.error("Failed to check question:", error);
      if (error instanceof Error) {
        toast.error(`Failed to check question: ${error.message}`);
      } else {
        toast.error("Failed to check question.");
      }
    },
  });

  return { checkQuestionMutation };
};

// useUncheckQuestionMutation hook
export const useUncheckQuestionMutation = (onCompletedSuccess: () => void) => {
  const queryClient = useQueryClient();

  const uncheckQuestionMutation = useMutation({
    mutationFn: uncheckQuestion,
    onSuccess: async () => {
      onCompletedSuccess();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["questions"] }),
        queryClient.invalidateQueries({ queryKey: ["count"] }),
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
      ]);
    },
    onError: (error: unknown) => {
      console.error("Failed to uncheck question:", error);
      if (error instanceof Error) {
        toast.error(`Failed to uncheck question: ${error.message}`);
      } else {
        toast.error("Failed to uncheck question.");
      }
    },
  });

  return { uncheckQuestionMutation };
};

// useRemoveBookmarkMutation hook
export const useRemoveUserAddedQuestionkMutation = (
  onBookmarkRemoveSuccessful: (data: any) => void
) => {
  const queryClient = useQueryClient();

  const removeUserAddedQuestionkMutation = useMutation({
    mutationFn: removeUserAddedQuestion,
    onSuccess: async (data) => {
      onBookmarkRemoveSuccessful(data);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["questions"] }),
        queryClient.invalidateQueries({ queryKey: ["user-questions"] }),
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
        queryClient.invalidateQueries({ queryKey: ["count"] }),
      ]);
    },
    onError: (error: unknown) => {
      console.error("Failed to remove user added question:", error);
      if (error instanceof Error) {
        toast.error(`Failed to remove user added question: ${error.message}`);
      } else {
        toast.error("Failed to remove user added question.");
      }
    },
  });

  return { removeUserAddedQuestionkMutation };
};
