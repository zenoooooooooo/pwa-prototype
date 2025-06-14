import { NextResponse } from "next/server";
import connectToDB from "@/backend/db/connection";
import Goals from "@/backend/db/models/Goals";

export async function PUT(
  req: Request,
  context: { params: Promise<{ goalId: string }> }
) {
  try {
    await connectToDB();

    const { goalId } = await context.params;

    if (!goalId) {
      return NextResponse.json(
        { message: "Missing goalId parameter" },
        { status: 400 }
      );
    }

    const updatedGoal = await Goals.findByIdAndUpdate(
      goalId,
      { isDone: true },
      { new: true }
    );

    if (!updatedGoal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Goal updated successfully.", data: updatedGoal },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
