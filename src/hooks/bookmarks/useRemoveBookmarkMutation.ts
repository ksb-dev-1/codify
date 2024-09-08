// 3rd party ibraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const removeBookmark = async (questionID: string) => {
  const response = await axios.post("/api/bookmarks/remove", {
    questionID,
  });
  return response.data;
};

export const useRemoveBookmarkMutation = (
  onBookmarkRemoveSuccessful: (data: any) => void
) => {
  const queryClient = useQueryClient();

  // Mutation to check bookmark
  const removeBookmarkMutation = useMutation({
    mutationFn: removeBookmark,
    onSuccess: (data) => {
      onBookmarkRemoveSuccessful(data);
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error: any) => {
      console.error("Error during mutation:", error);
    },
  });

  return {
    removeBookmarkMutation,
  };
};
