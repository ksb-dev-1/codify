import { QuestionStatusEnum } from "@prisma/client";

// utils
import { getStatusCircleClass, getStatusTextClass } from "@/utils/classNames";

export default function QuestionStatus({
  status,
}: {
  status: QuestionStatusEnum;
}) {
  return (
    <div className="flex items-center">
      <span
        className={`md:mr-2 relative h-4 w-4 rounded-full ${
          getStatusCircleClass(status).outer
        } flex items-center justify-center`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            getStatusCircleClass(status).inner
          }`}
        ></span>
      </span>
      <span className={`hidden md:block ${getStatusTextClass(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
      </span>
    </div>
  );
}
