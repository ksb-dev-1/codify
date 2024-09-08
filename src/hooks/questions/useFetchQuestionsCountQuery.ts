// 3rd party libraries
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchQuestionsCount = async () => {
  const response = await axios.get("/api/questions/count");
  return response.data;
};

export const useFetchQuestionsCountQuery = () => {
  return useQuery({
    queryKey: ["count"],
    queryFn: fetchQuestionsCount,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
