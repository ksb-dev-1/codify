export const getStatusCircleClass = (status: string) => {
  switch (status.toUpperCase()) {
    case "TODO":
      return {
        outer: "bg-blue-100",
        inner: "bg-blue-600",
      };
    case "ATTEMPTED":
      return {
        outer: "bg-orange-100",
        inner: "bg-orange-600",
      };
    case "SOLVED":
      return {
        outer: "bg-green-100",
        inner: "bg-green-700",
      };
    default:
      return {
        outer: "bg-slate-100",
        inner: "bg-slate-600",
      };
  }
};

export const getStatusTextClass = (status: string) => {
  switch (status.toUpperCase()) {
    case "TODO":
      return "text-blue-600";
    case "ATTEMPTED":
      return "text-orange-700";
    case "SOLVED":
      return "text-green-700";
    default:
      return "text-slate-600";
  }
};

export const getDifficultyTagClass = (difficulty: string) => {
  switch (difficulty.toUpperCase()) {
    case "EASY":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "HARD":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-slate-800 border-slate-300";
  }
};
