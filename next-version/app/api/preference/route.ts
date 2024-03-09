import { NextResponse } from "next/server";
import Preference from "@/models/Preference";
import { getSessionEmail } from "./_lib/getSessionEmail";
import { preferenceSelector } from "./_lib/preferenceSelector";

export async function GET() {
  try {
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
