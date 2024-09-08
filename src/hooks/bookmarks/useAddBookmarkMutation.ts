// 3rd party ibraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const addBookmark = async (questionID: string) => {
  const response = await axios.post("/api/bookmarks/add", {
    questionID,
  });
  return response.data;
};

export const useAddBookmarkMutation = (
  onBookmarkAddSuccessful: (data: any) => void
) => {
  const queryClient = useQueryClient();

  // Mutation to check bookmark
  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: (data) => {
      onBookmarkAddSuccessful(data);
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error: any) => {
      console.error("Error during mutation:", error);
    },
  });

  return {
    addBookmarkMutation,
  };
};
