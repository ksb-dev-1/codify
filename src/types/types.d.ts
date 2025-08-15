export type QuestionWithStatus = {
  id: string;
  qNo: number;
  difficulty: DifficultyLevel;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  topicName: string;
  status: QuestionStatusEnum;
  isSaved: boolean;
};

export type FetchQuestionsResult =
  | {
      success: true;
      questions: QuestionWithStatus[];
      totalPages?: number;
      isPremiumUser?: boolean;
    }
  | {
      success: false;
      message: string;
      error?: string;
    };

export type QuestionDetails = QuestionWithStatus & {
  question: string;
  options: Record<string, string>;
  explanation: string;
  codeSnippet: string;
  correctOption: string;
};

export type FetchQuestionDetailsResult =
  | {
      success: true;
      questionDetails: QuestionDetails;
    }
  | {
      success: false;
      message: string;
      error?: string;
    };

export type QuestionsCountResult =
  | {
      success: true;
      totalQuestionsCount: number;
      EASY: {
        todo: number;
        attempted: number;
        solved: number;
      };
      MEDIUM: {
        todo: number;
        attempted: number;
        solved: number;
      };
      HARD: {
        todo: number;
        attempted: number;
        solved: number;
      };
      totalEasyCount: number;
      totalMediumCount: number;
      totalHardCount: number;
      totalTodoCount: number;
      totalAttemptedCount: number;
      totalSolvedCount: number;
    }
  | {
      success: false;
      message: string;
      error?: string;
    };

type UserPremiumDataResult =
  | {
      success: true;
      email: string | null;
      isPremium: boolean;
    }
  | {
      success: false;
      message: string;
      error?: string;
    };
