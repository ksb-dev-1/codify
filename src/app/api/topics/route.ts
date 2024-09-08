import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: {
        name: "asc",
      },
    });

    if (!topics.length) {
      return NextResponse.json(
        { message: "No topics available!", topics: [] },
        { status: 200 }
      );
    }

    return NextResponse.json({ topics: topics }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
