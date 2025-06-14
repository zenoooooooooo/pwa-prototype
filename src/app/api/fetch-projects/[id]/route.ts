import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/backend/db/connection";
import Project from "@/backend/db/models/Project";
import { Types } from "mongoose";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid project ID format." },
        { status: 400 }
      );
    }

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project fetched successfully.", data: project },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
