import { NextResponse } from "next/server";
import connectToDB from "@/backend/db/connection";
import Goals from "@/backend/db/models/Goals";

export async function GET() {
  try {
    await connectToDB();

    const goals = await Goals.find();

    return NextResponse.json(
      { message: "Goals fetched successfully.", data: goals },
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
