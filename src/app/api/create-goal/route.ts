import Goals from "@/backend/db/models/Goals";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, category, description, isDone, projectId } =
      await req.json();

    const newGoal = await Goals.create({
      title,
      category,
      description,
      isDone,
      projectId: projectId,
    });

    return NextResponse.json(newGoal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add goal.", error },
      { status: 500 }
    );
  }
}
