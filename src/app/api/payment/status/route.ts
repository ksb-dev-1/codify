import { NextResponse } from "next/server";
import { auth } from "@/auth";

// lib
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  const userID = session?.user?.id;

  if (!userID) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const payment = await prisma.payment.findFirst({
      where: {
        userId: userID,
      },
    });

    if (!payment) {
      return NextResponse.json(
        { message: "Not a premium user", status: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Premium user", status: payment.status },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking paymentn status:", error);
    return NextResponse.json(
      { error: "Failed to check payment" },
      { status: 500 }
    );
  }
}
