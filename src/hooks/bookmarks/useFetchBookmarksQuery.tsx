// 3rd party libraries
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBookmarks = async () => {
  const response = await axios.get("/api/bookmarks");
  return response.data;
};

export const useFetchBookmarksQuery = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
