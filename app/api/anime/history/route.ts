import { NextRequest, NextResponse } from "next/server";
import { getUserWatching } from "@/services/getUserWatching";
import connectDB from "@/db/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "", 10) ?? 1;
    const perPage =
      parseInt(req.nextUrl.searchParams.get("perPage") ?? "", 10) ?? 20;

    const data = await getUserWatching(page, perPage);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
