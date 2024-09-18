export default function getStatusStyles(status: string) {
  switch (status) {
    case "Todo":
      return {
        bgColor: "bg-yellow-100",
        dotColor: "bg-yellow-600",
        textColor: "text-yellow-600",
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
