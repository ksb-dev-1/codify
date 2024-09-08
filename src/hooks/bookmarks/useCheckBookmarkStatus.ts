// 3rd party ibraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const checkBookmarkStatus = async (questionID: string) => {
  const response = await axios.post("/api/bookmarks/status", {
    questionID,
  });
  return response.data;
};

export const useCheckBookmarkStatus = (
  onCheckBookmarkSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();

  // Mutation to check bookmark
  const checkBookmarStatuskMutation = useMutation({
    mutationFn: checkBookmarkStatus,
    onSuccess: (data) => {
      onCheckBookmarkSuccess(data);
      //queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      console.error("Error during mutation:", error);
    },
  });

  return {
    checkBookmarStatuskMutation,
  };
};
