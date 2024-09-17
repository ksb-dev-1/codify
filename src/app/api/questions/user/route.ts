import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userID = session?.user?.id;

  if (!userID) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const userAddedQuestions = await prisma.question.findMany({
      where: {
        userId: userID,
      },
      include: {
        // questionStatuses: {
        //   where: { userId: userID },
        //   select: {
        //     status: true,
        //   },
        // },
        questionStatuses: {
          select: {
            status: true,
          },
        },
        topic: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!userAddedQuestions) {
      return NextResponse.json(
        { message: "No questions found!" },
        { status: 200 }
      );
    }

    return NextResponse.json(userAddedQuestions, { status: 200 });
  } catch (error) {
    console.error("Error fetching user added questions:", error);
    return NextResponse.json(
      { error: "Failed to user added fetch questions" },
      { status: 500 }
    );
  }
}
