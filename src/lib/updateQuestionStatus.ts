export async function updateQuestionStatus({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}) {
  const params = new URLSearchParams({ userId });

  const res = await fetch(
    `/api/questions/${questionId}/update-status?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}
