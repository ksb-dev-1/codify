// components
import DifficultyTag from "./DifficultyTag";
import LinkWithProgress from "@/components/shared/LinkWithProgress";
import QuestionStatus from "./QuestionStatus";
import SaveButton from "./SaveButton";
import Seperator from "./Seperator";

// types
import { QuestionWithStatus } from "@/types/types";

// 3rd party
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";

interface QuestionCardProps {
  question: QuestionWithStatus;
  userId: string | undefined;
  isPremiumUser: boolean | undefined;
}

export default function QuestionCard({
  question,
  userId,
  isPremiumUser,
}: QuestionCardProps) {
  const { id, status, qNo, topicName, isPremium, difficulty, isSaved } =
    question;

  return (
    <div className="border rounded p-4 sm:p-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="md:w-[120px] flex items-start mr-2">
          <QuestionStatus status={status} />
        </div>

        <LinkWithProgress
          href={!isPremium || isPremiumUser ? `/questions/${id}` : "/premium"}
          className="sm:text-lg hover:text-primary transition-colors"
        >
          {qNo}. {topicName}
        </LinkWithProgress>

        {isPremium && !isPremiumUser && (
          <BiSolidLock className="text-gray-500 sm:h-5 sm:w-5 ml-2" />
        )}
        {isPremium && isPremiumUser && (
          <BiSolidLockOpen className="text-gray-500 sm:h-5 sm:w-5 ml-2" />
        )}
      </div>

      <div className="flex items-center">
        <DifficultyTag difficulty={difficulty} />
        <Seperator className="mx-2" />

        {!isPremium || isPremiumUser ? (
          // Try SaveFormSimple first to debug, then switch back to SaveForm
          <SaveButton userId={userId} questionId={id} isSaved={isSaved} />
        ) : (
          <span className="h-8 w-8 rounded-full bg-transparent border border-transparent flex items-center justify-center" />
        )}
      </div>
    </div>
  );
}
