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
      <div className="mb-4">
        <p className="font-semibold mb-2">Total - {totalQuestions}</p>
        <div className="w-full bg-blue-200 h-12 rounded-custom relative overflow-hidden">
          <div
            className="absolute top-2 left-2 h-8 bg-blue-400 rounded-custom"
            style={{ width: `${totalCompletedPercentage}%` }}
          ></div>

          <div className="flex items-center justify-between font-semibold text-black rounded-custom px-4 absolute top-0 left-0 w-full h-full">
            <span>{completedQuestions}</span>
            <span>{remainingQuestions}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Easy - {totalEasyQuestions}</p>
        <div className="w-full bg-green-200 h-12 rounded-custom relative overflow-hidden">
          <div
            className="absolute top-2 left-2 h-8 bg-green-400 rounded-custom"
            style={{ width: `${totalEasyCompletedPercentage}%` }}
          ></div>

          <div className="flex items-center justify-between font-semibold text-black rounded-custom px-4 absolute top-0 left-0 w-full h-full">
            <span>{completedEasyQuestions}</span>
            <span>{remainingEasyQuestions}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Medium - {totalMediumQuestions}</p>
        <div className="w-full bg-orange-200 h-12 rounded-custom relative overflow-hidden">
          <div
            className="absolute top-2 left-2 h-8 bg-orange-400 rounded-custom"
            style={{ width: `${totalMediumCompletedPercentage}%` }}
          ></div>

          <div className="flex items-center justify-between font-semibold text-black text-sm rounded-custom px-4 absolute top-0 left-0 w-full h-full">
            <span>{completedMediumQuestions}</span>
            <span>{remainingMediumQuestions}</span>
          </div>
        </div>
      </div>

      <div className="">
        <p className="font-semibold mb-2">Hard - {totalHardQuestions}</p>
        <div className="w-full bg-red-200 h-12 rounded-custom relative overflow-hidden">
          <div
            className="absolute top-2 left-2 h-8 bg-red-400 rounded-custom"
            style={{ width: `${totalHardCompletedPercentage}%` }}
          ></div>

          <div className="flex items-center justify-between font-semibold text-black text-sm rounded-custom px-4 absolute top-0 left-0 w-full h-full">
            <span>{completedHardQuestions}</span>
            <span>{remainingHardQuestions}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionProgressBar;
