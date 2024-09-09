import axios from "axios";

// Fetch All Bookmarks API call
export const fetchBookmarks = async () => {
  const response = await axios.get("/api/bookmarks");
  return response.data;
};

// Check Bookmark Status API call
export const checkBookmarkStatus = async (questionID: string) => {
  const response = await axios.post("/api/bookmarks/status", { questionID });
  return response.data;
};

// Add Bookmark API call
export const addBookmark = async (questionID: string) => {
  const response = await axios.post("/api/bookmarks/add", { questionID });
  return response.data;
};

// Remove Bookmark API call
export const removeBookmark = async (questionID: string) => {
  const response = await axios.post("/api/bookmarks/remove", { questionID });
  return response.data;
};
