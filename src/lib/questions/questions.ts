import axios from "axios";

// Fetch Questions API call
export const fetchQuestions = async ({
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

// Fetch Questions Count API call
export const fetchQuestionsCount = async () => {
  const response = await axios.get("/api/questions/count");
  return response.data;
};

// Mark Question as Started API call
export const markQuestionAsStarted = async (questionID: string) => {
  const response = await axios.post("/api/questions/question/started", {
    questionID,
  });
  return response.data;
};

// Check Question API call
export const checkQuestion = async (questionID: string) => {
  const response = await axios.post("/api/questions/question/check", {
    questionID,
  });
  return response.data;
};

// Uncheck Question API call
export const uncheckQuestion = async (questionID: string) => {
  const response = await axios.post("/api/questions/question/uncheck", {
    questionID,
  });
  return response.data;
};
