import { NextResponse } from "next/server";
import Preference from "@/models/Preference";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import connectDB from "@/db/db";

export async function GET() {
  try {
    await connectDB();
    
    const userEmail =await getSessionEmail();

    const userPreference = await Preference.findOne({ email: userEmail }).select(preferenceSelector);
    return NextResponse.json(userPreference, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
