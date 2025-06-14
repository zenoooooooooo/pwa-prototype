import { NextResponse } from "next/server";
import connectToDB from "@/backend/db/connection";
import { fetchProjects } from "@/backend/controllers/FetchProjectController";

export async function GET() {
  try {
    await connectToDB();

    const res = await fetchProjects();

    return NextResponse.json(
      { message: res.message, data: res.data },
      { status: res.status }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
