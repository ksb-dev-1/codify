import { NextRequest, NextResponse } from "next/server";

// types
import { UserPremiumDataResult } from "@/types/types";

// lib
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest
): Promise<NextResponse<UserPremiumDataResult>> {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId") || "";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        payment: {
          select: { isPaid: true, createdAt: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, email: user.email, isPremium: !!user.payment?.isPaid },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch user premium data" },
      { status: 500 }
    );
  }
}
