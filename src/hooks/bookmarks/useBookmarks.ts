// lib
import {
  fetchBookmarks,
  checkBookmarkStatus,
  addBookmark,
  removeBookmark,
} from "@/lib/bookmarks/bookmarks";

// 3rd party libraries
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// useFetchBookmarksQuery hook
export const useFetchBookmarksQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
};

// Fetch bookmark status
export const useCheckBookmarkStatusQuery = (
  questionID: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["bookmark-status", questionID],
    queryFn: () => checkBookmarkStatus(questionID),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
};

// useAddBookmarkMutation hook
export const useAddBookmarkMutation = (
  onBookmarkAddSuccessful: (data: any) => void
) => {
  const queryClient = useQueryClient();

  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: async (data) => {
      onBookmarkAddSuccessful(data);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
        queryClient.invalidateQueries({ queryKey: ["bookmark-status"] }),
      ]);
    },
    onError: (error: unknown) => {
      console.error("Failed to add bookmark:", error);
      if (error instanceof Error) {
        toast.error(`Failed to add bookmark: ${error.message}`);
      } else {
        toast.error("Failed to add bookmark.");
      }
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
    onSuccess: async (data) => {
      onBookmarkRemoveSuccessful(data);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
        queryClient.invalidateQueries({ queryKey: ["bookmark-status"] }),
      ]);
    },
    onError: (error: unknown) => {
      console.error("Failed to remove bookmark:", error);
      if (error instanceof Error) {
        toast.error(`Failed to remove bookmark: ${error.message}`);
      } else {
        toast.error("Failed to remove bookmark.");
      }
    },
  });

  return { removeBookmarkMutation };
};
