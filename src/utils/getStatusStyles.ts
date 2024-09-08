export default function getStatusStyles(status: string) {
  switch (status) {
    case "Todo":
      return {
        bgColor: "bg-blue-100",
        dotColor: "bg-blue-600",
        textColor: "text-blue-600",
      };
    case "Started":
      return {
        bgColor: "bg-red-100",
        dotColor: "bg-red-600",
        textColor: "text-red-600",
      };
    default:
      return {
        bgColor: "bg-green-100",
        dotColor: "bg-lime-600",
        textColor: "text-lime-600",
      };
  }
}
