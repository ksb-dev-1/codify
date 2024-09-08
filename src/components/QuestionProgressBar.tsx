import React from "react";

interface QuestionProgressBarProps {
  totalQuestions: number;
  completedQuestions: number;
  totalEasyQuestions: number;
  completedEasyQuestions: number;
  totalMediumQuestions: number;
  completedMediumQuestions: number;
  totalHardQuestions: number;
  completedHardQuestions: number;
}

const QuestionProgressBar: React.FC<QuestionProgressBarProps> = ({
  totalQuestions,
  completedQuestions,
  totalEasyQuestions,
  completedEasyQuestions,
  totalMediumQuestions,
  completedMediumQuestions,
  totalHardQuestions,
  completedHardQuestions,
}) => {
  // Calculate percentage widths
  const totalCompletedPercentage = (completedQuestions / totalQuestions) * 100;
  const totalEasyCompletedPercentage =
    (completedEasyQuestions / totalEasyQuestions) * 100;
  const totalMediumCompletedPercentage =
    (completedMediumQuestions / totalMediumQuestions) * 100;
  const totalHardCompletedPercentage =
    (completedHardQuestions / totalHardQuestions) * 100;

  const remainingQuestions = totalQuestions - completedQuestions;
  const remainingEasyQuestions = totalEasyQuestions - completedEasyQuestions;
  const remainingMediumQuestions =
    totalMediumQuestions - completedMediumQuestions;
  const remainingHardQuestions = totalHardQuestions - completedHardQuestions;

  return (
    <>
      <div className="mb-2">
        <p className="font-semibold">Total - {totalQuestions}</p>
        <div className="w-full bg-black h-8 rounded-[7.5px] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#555] rounded"
            style={{ width: `${totalCompletedPercentage}%` }}
          ></div>

          <div className="flex items-center justify-between font-semibold text-white text-xs rounded-[7.5px] px-4 absolute top-0 left-0 w-full h-full">
            <span>{completedQuestions}</span>
            <span> {remainingQuestions}</span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <p className="font-bold">Easy - {totalEasyQuestions}</p>
        <div className="w-full bg-green-400 h-8 rounded-[7.5px] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded"
            style={{ width: `${totalEasyCompletedPercentage}%` }}
          ></div>

          <div className="flex items-center justify-between font-semibold text-white text-xs rounded-[7.5px] px-4 absolute top-0 left-0 w-full h-full">
            <span>{completedEasyQuestions}</span>
            <span> {remainingEasyQuestions}</span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <p className="font-bold">Medium - {totalMediumQuestions}</p>
        <div className="w-full bg-orange-400 h-8 rounded-[7.5px] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-orange-500 rounded"
            style={{ width: `${totalMediumCompletedPercentage}%` }}
          ></div>

          <div className="flex items-center justify-between font-semibold text-white text-xs rounded-[7.5px] px-4 absolute top-0 left-0 w-full h-full">
            <span>{completedMediumQuestions}</span>
            <span> {remainingMediumQuestions}</span>
          </div>
        </div>
      </div>

      <div className="">
        <p className="font-bold">Hard - {totalHardQuestions}</p>
        <div className="w-full bg-red-400 h-8 rounded-[7.5px] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-red-500 rounded"
            style={{ width: `${totalHardCompletedPercentage}%` }}
          ></div>

          <div className="flex items-center justify-between font-semibold text-white text-xs rounded-[7.5px] px-4 absolute top-0 left-0 w-full h-full">
            <span>{completedHardQuestions}</span>
            <span> {remainingHardQuestions}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionProgressBar;
