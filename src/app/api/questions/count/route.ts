import { NextResponse } from "next/server";
import { auth } from "@/auth";

// lib
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const userID = session?.user?.id;

  if (!userID) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Fetch all counts concurrently using Promise.all
    const [
      totalQuestionsCount,

      // Count "Started" questions by difficulty for the authenticated user
      startedEasyCount,
      startedMediumCount,
      startedHardCount,

      // Count "Completed" questions by difficulty for the authenticated user
      completedEasyCount,
      completedMediumCount,
      completedHardCount,

      // Count total questions by difficulty
      easyDifficultyCount,
      mediumDifficultyCount,
      hardDifficultyCount,
    ] = await Promise.all([
      // Count the total number of questions
      prisma.question.count(),

      // Count "Started" questions by difficulty for this user
      prisma.questionStatus.count({
        where: {
          userId: userID, // Filter by userID
          status: "Started",
          question: {
            difficulty: "Easy",
          },
        },
      }),
      prisma.questionStatus.count({
        where: {
          userId: userID, // Filter by userID
          status: "Started",
          question: {
            difficulty: "Medium",
          },
        },
      }),
      prisma.questionStatus.count({
        where: {
          userId: userID, // Filter by userID
          status: "Started",
          question: {
            difficulty: "Hard",
          },
        },
      }),

      // Count "Completed" questions by difficulty for this user
      prisma.questionStatus.count({
        where: {
          userId: userID, // Filter by userID
          status: "Completed",
          question: {
            difficulty: "Easy",
          },
        },
      }),
      prisma.questionStatus.count({
        where: {
          userId: userID, // Filter by userID
          status: "Completed",
          question: {
            difficulty: "Medium",
          },
        },
      }),
      prisma.questionStatus.count({
        where: {
          userId: userID, // Filter by userID
          status: "Completed",
          question: {
            difficulty: "Hard",
          },
        },
      }),

      // Count total questions by difficulty (this can be global, without user filtering)
      prisma.question.count({
        where: {
          difficulty: "Easy",
        },
      }),
      prisma.question.count({
        where: {
          difficulty: "Medium",
        },
      }),
      prisma.question.count({
        where: {
          difficulty: "Hard",
        },
      }),
    ]);

    // Calculate the Todo status count for each difficulty level
    const todoEasyCount =
      easyDifficultyCount - (startedEasyCount + completedEasyCount);
    const todoMediumCount =
      mediumDifficultyCount - (startedMediumCount + completedMediumCount);
    const todoHardCount =
      hardDifficultyCount - (startedHardCount + completedHardCount);

    // Total counts for each difficulty
    const totalEasyCount = easyDifficultyCount;
    const totalMediumCount = mediumDifficultyCount;
    const totalHardCount = hardDifficultyCount;

    // Calculate the total number of Todo, Started, and Completed questions
    const totalTodoCount = todoEasyCount + todoMediumCount + todoHardCount;
    const totalStartedCount =
      startedEasyCount + startedMediumCount + startedHardCount;
    const totalCompletedCount =
      completedEasyCount + completedMediumCount + completedHardCount;

    // Return the data
    return NextResponse.json(
      {
        totalQuestionsCount,

        // Todo, Started, and Completed counts by difficulty
        easy: {
          todo: todoEasyCount,
          started: startedEasyCount,
          completed: completedEasyCount,
        },
        medium: {
          todo: todoMediumCount,
          started: startedMediumCount,
          completed: completedMediumCount,
        },
        hard: {
          todo: todoHardCount,
          started: startedHardCount,
          completed: completedHardCount,
        },

        // Total counts for each difficulty
        totalEasyCount,
        totalMediumCount,
        totalHardCount,

        // Total counts for Todo, Started, and Completed questions across all difficulties
        totalTodoCount,
        totalStartedCount,
        totalCompletedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching question counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch question counts" },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import { auth } from "@/auth";

// // lib
// import prisma from "@/lib/prisma";

// export async function GET() {
//   const session = await auth();
//   const userID = session?.user?.id;

//   if (!userID) {
//     return NextResponse.json(
//       { error: "User not authenticated" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Fetch all counts concurrently using Promise.all
//     const [
//       totalQuestionsCount,

//       // Count "Started" questions by difficulty
//       startedEasyCount,
//       startedMediumCount,
//       startedHardCount,

//       // Count "Completed" questions by difficulty
//       completedEasyCount,
//       completedMediumCount,
//       completedHardCount,

//       // Count total questions by difficulty
//       easyDifficultyCount,
//       mediumDifficultyCount,
//       hardDifficultyCount,
//     ] = await Promise.all([
//       // Count the total number of questions
//       prisma.question.count(),

//       // Count "Started" questions by difficulty
//       prisma.questionStatus.count({
//         where: {
//           status: "Started",
//           question: {
//             difficulty: "Easy",
//           },
//         },
//       }),
//       prisma.questionStatus.count({
//         where: {
//           status: "Started",
//           question: {
//             difficulty: "Medium",
//           },
//         },
//       }),
//       prisma.questionStatus.count({
//         where: {
//           status: "Started",
//           question: {
//             difficulty: "Hard",
//           },
//         },
//       }),

//       // Count "Completed" questions by difficulty
//       prisma.questionStatus.count({
//         where: {
//           status: "Completed",
//           question: {
//             difficulty: "Easy",
//           },
//         },
//       }),
//       prisma.questionStatus.count({
//         where: {
//           status: "Completed",
//           question: {
//             difficulty: "Medium",
//           },
//         },
//       }),
//       prisma.questionStatus.count({
//         where: {
//           status: "Completed",
//           question: {
//             difficulty: "Hard",
//           },
//         },
//       }),

//       // Count total questions by difficulty
//       prisma.question.count({
//         where: {
//           difficulty: "Easy",
//         },
//       }),
//       prisma.question.count({
//         where: {
//           difficulty: "Medium",
//         },
//       }),
//       prisma.question.count({
//         where: {
//           difficulty: "Hard",
//         },
//       }),
//     ]);

//     // Calculate the Todo status count for each difficulty level
//     const todoEasyCount =
//       easyDifficultyCount - (startedEasyCount + completedEasyCount);
//     const todoMediumCount =
//       mediumDifficultyCount - (startedMediumCount + completedMediumCount);
//     const todoHardCount =
//       hardDifficultyCount - (startedHardCount + completedHardCount);

//     // Total counts for each difficulty
//     const totalEasyCount = easyDifficultyCount;
//     const totalMediumCount = mediumDifficultyCount;
//     const totalHardCount = hardDifficultyCount;

//     // Calculate the total number of Todo, Started, and Completed questions
//     const totalTodoCount = todoEasyCount + todoMediumCount + todoHardCount;
//     const totalStartedCount =
//       startedEasyCount + startedMediumCount + startedHardCount;
//     const totalCompletedCount =
//       completedEasyCount + completedMediumCount + completedHardCount;

//     // Return the data
//     return NextResponse.json(
//       {
//         totalQuestionsCount,

//         // Todo, Started, and Completed counts by difficulty
//         easy: {
//           todo: todoEasyCount,
//           started: startedEasyCount,
//           completed: completedEasyCount,
//         },
//         medium: {
//           todo: todoMediumCount,
//           started: startedMediumCount,
//           completed: completedMediumCount,
//         },
//         hard: {
//           todo: todoHardCount,
//           started: startedHardCount,
//           completed: completedHardCount,
//         },

//         // Total counts for each difficulty
//         totalEasyCount,
//         totalMediumCount,
//         totalHardCount,

//         // Total counts for Todo, Started, and Completed questions across all difficulties
//         totalTodoCount,
//         totalStartedCount,
//         totalCompletedCount,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching question counts:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch question counts" },
//       { status: 500 }
//     );
//   }
// }
