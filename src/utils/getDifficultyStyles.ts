export default function getDifficultyStyles(status: string) {
  switch (status) {
    case "Easy":
      return {
        bgColor: "bg-green-600",
        borderColor: "border-green-600",
        textColor: "text-white",
      };
    case "Medium":
      return {
        bgColor: "bg-orange-600",
        borderColor: "border-orange-600",
        textColor: "text-white",
      };
    default:
      return {
        bgColor: "bg-red-600",
        borderColor: "border-red-600",
        textColor: "text-white",
      };
  }
}
