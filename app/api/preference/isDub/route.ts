import Preference from "@/models/Preference";
import { NextResponse } from "next/server";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";

export async function PATCH() {
  try {
    const userEmail = await getSessionEmail();

    const userPreference = await Preference.findOne({ email: userEmail });
    const updatedPreference = await Preference.findByIdAndUpdate(
      userPreference._id,
      { isDub: !userPreference.isDub },
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
