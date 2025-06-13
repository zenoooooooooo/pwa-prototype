import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/backend/db/connection";
import { createProject } from "@/backend/controllers/CreateProjectController";
import { IProject } from "@/interfaces/IProject";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const project: IProject = await req.json();

    if (!project) {
      return NextResponse.json(
        { message: "Missing parameters in request body" },
        { status: 400 }
      );
    }

    const res = await createProject(project);

    return NextResponse.json(
      { message: res.message, data: res.data },
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
