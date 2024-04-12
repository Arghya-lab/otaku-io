import Preference from "@/models/Preference";
import { NextResponse } from "next/server";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import connectDB from "@/db/db";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    
    const userEmail = await getSessionEmail();
    const { playbackQuality } = await req.json();

    if (
      !playbackQuality ||
      !["360p", "480p", "720p", "1080p"].includes(playbackQuality)
    ) {
      return NextResponse.json(
        { error: "Proper request body is not set." },
        { status: 400 }
      ); // Return error response
    }

    const userPreference = await Preference.findOne({ email: userEmail });
    const updatedPreference = await Preference.findByIdAndUpdate(
      userPreference._id,
      { playbackQuality },
      { new: true }
    ).select(preferenceSelector);

    return NextResponse.json(updatedPreference, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
