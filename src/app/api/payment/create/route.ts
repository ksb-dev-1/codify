import { NextResponse } from "next/server";
import { auth } from "@/auth";

// lib
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  const userID = session?.user?.id;

  if (!userID) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { amount, paymentIntentId } = await req.json();

    const user = await prisma.payment.findFirst({
      where: {
        userId: userID,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          error: "Alraedy a premium user",
        },
        { status: 409 }
      );
    }

    const payment = await prisma.payment.create({
      data: {
        userId: userID,
        paymentIntentId,
        amount,
        status: true,
      },
    });

    return NextResponse.json({
      message: "Payment saved successfully",
      payment,
    });
  } catch (error) {
    console.error("Error saving payment:", error);
    return NextResponse.json(
      { error: "Failed to save payment" },
      { status: 500 }
    );
  }
}
