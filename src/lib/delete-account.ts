import axios from "axios";

// fetch user added questions
export const deleteAccount = async () => {
  const response = await axios.delete("/api/delete-account");
  return response.data;
};
