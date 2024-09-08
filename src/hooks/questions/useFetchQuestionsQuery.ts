// 3rd party libraries
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchQuestions = async ({
  currentTopic,
  currentDifficulty,
  currentStatus,
  currentPage,
}: {
  currentTopic: string;
  currentDifficulty: string;
  currentStatus: string;
  currentPage: number;
}) => {
  const baseUrl = "/api/questions";
  const queryParams = new URLSearchParams();

  queryParams.set("limit", "10");

  if (currentTopic) {
    queryParams.set("topic", currentTopic);
  }
  if (currentDifficulty) {
    queryParams.set("difficulty", currentDifficulty);
  }
  if (currentStatus) {
    queryParams.set("status", currentStatus);
  }

  queryParams.set("page", currentPage.toString());

  const queryString = queryParams.toString();
  const url = `${baseUrl}?${queryString}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error fetching questions");
  }

  return response.json();
};

interface UseQuestionsProps {
  currentTopic: string;
  currentDifficulty: string;
  currentStatus: string;
  currentPage: number;
}

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
