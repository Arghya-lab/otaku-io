import { NextResponse } from "next/server";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import User from "@/models/User";
import connectDB from "@/db/db";

export async function GET() {
  try {
    await connectDB();
    const userEmail = await getSessionEmail();
    const user = await User.findOne({ email: userEmail });
    
    return NextResponse.json(user.bookmarks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
