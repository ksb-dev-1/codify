"use client";

// lib
import { fetchQuestionCounts } from "@/lib/fetchQuestionCounts";

// utils
import { queryKeys } from "@/utils/queryKeys";

// components
import ServerError from "./errors/ServerError";
import ProgressStatsSkeleton from "./skeletons/ProgressStatsSkeleton";

// 3rd party
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#bfdbfe", "#60a5fa", "#2563eb"];
const LABELS = ["Todo", "Attempted", "Solved"];
// const COLORS = [" #60a5fa", "#fb923c", "#4ade80"];
// const COLORS = [" #cbd5e1", "#94a3b8", "#475569"];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ProgressPie({
  title,
  data,
}: {
  title: string;
  data: { todo: number; attempted: number; solved: number };
}) {
  const pieData = [
    { name: "Todo", value: data.todo },
    { name: "Attempted", value: data.attempted },
    { name: "Solved", value: data.solved },
  ];

  return (
    <div className="w-full max-w-xs mx-auto md:mx-4">
      <h3 className="text-center text-lg font-semibold">{title}</h3>
      <div className="w-full h-32 md:h-40 lg:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              label={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SharedLegend() {
  return (
    <div className="flex justify-center gap-4 sm:gap-8 mb-8 md:mb-16 border-y py-4">
      {LABELS.map((label, idx) => (
        <div key={label} className="flex items-center space-x-1">
          <div
            className="w-4 h-4 rounded-full mr-1"
            style={{ backgroundColor: COLORS[idx] }}
          />
          <span className="font-medium">{capitalize(label)}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProgressStats({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.questionCounts(userId),
    queryFn: () => fetchQuestionCounts({ userId }),
  });

  if (isLoading) return <ProgressStatsSkeleton />;

  if (isError)
    return (
      <ServerError message="Something went wrong while fetching question counts." />
    );

  if (!data || !data.success) {
    return (
      <ServerError
        message={
          data?.message ||
          data?.error ||
          "Failed to load question counts. Please try again later."
        }
      />
    );
  }

  return (
    <div className="mt-8 border rounded p-4 md:p-8">
      <h2 className="text-xl font-bold mb-4">Progress Breakdown</h2>

      <SharedLegend />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <ProgressPie
          title="Overall"
          data={{
            todo: data.totalTodoCount,
            attempted: data.totalAttemptedCount,
            solved: data.totalSolvedCount,
          }}
        />
        <ProgressPie title="Easy" data={data.EASY} />
        <ProgressPie title="Medium" data={data.MEDIUM} />
        <ProgressPie title="Hard" data={data.HARD} />
      </div>
    </div>
  );
}
