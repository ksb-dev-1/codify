export default function getDifficultyStyles(status: string) {
  switch (status) {
    case "Easy":
      return {
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-600",
      };
    case "Medium":
      return {
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-600",
      };
    default:
      return {
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-600",
      };
  }
}
