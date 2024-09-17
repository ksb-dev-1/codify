export default function getStatusStyles(status: string) {
  switch (status) {
    case "Todo":
      return {
        bgColor: "bg-indigo-100",
        dotColor: "bg-indigo-400",
        textColor: "text-indigo-400",
      };
    case "Started":
      return {
        bgColor: "bg-red-100",
        dotColor: "bg-red-400",
        textColor: "text-red-400",
      };
    default:
      return {
        bgColor: "bg-green-100",
        dotColor: "bg-lime-600",
        textColor: "text-lime-600",
      };
  }
}
