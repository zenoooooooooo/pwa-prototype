import { NextResponse } from "next/server";
import connectToDB from "@/backend/db/connection";

export async function GET() {
  try {
    connectToDB();

    return NextResponse.json({ message: "Hello There!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
