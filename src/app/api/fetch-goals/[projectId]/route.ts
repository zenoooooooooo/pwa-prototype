import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/backend/db/connection";
import Goals from "@/backend/db/models/Goals";
import { Types } from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  await connectToDB();

  const { projectId } = await context.params;

  if (!Types.ObjectId.isValid(projectId)) {
    return NextResponse.json(
      { message: "Invalid project ID format." },
      { status: 400 }
    );
  }

  const goals = await Goals.find({ projectId });

  return NextResponse.json(
    { message: "Goals fetched successfully.", data: goals },
    { status: 200 }
  );
}
