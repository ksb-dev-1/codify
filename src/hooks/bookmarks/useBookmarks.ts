// lib
import {
  fetchBookmarks,
  checkBookmarkStatus,
  addBookmark,
  removeBookmark,
} from "@/lib/bookmarks/bookmarks";

// 3rd party libraries
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch bookmark status
export const useCheckBookmarkStatusQuery = (questionID: string) => {
  return useQuery({
    queryKey: ["bookmarkStatus", questionID],
    queryFn: () => checkBookmarkStatus(questionID),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// useFetchBookmarksQuery hook
export const useFetchBookmarksQuery = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// useAddBookmarkMutation hook
export const useAddBookmarkMutation = (
  onBookmarkAddSuccessful: (data: any) => void
) => {
  const queryClient = useQueryClient();

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

  return { addBookmarkMutation };
};

// useRemoveBookmarkMutation hook
export const useRemoveBookmarkMutation = (
  onBookmarkRemoveSuccessful: (data: any) => void
) => {
  const queryClient = useQueryClient();

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

  return { removeBookmarkMutation };
};
