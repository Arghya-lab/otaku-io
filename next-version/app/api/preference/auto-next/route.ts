import Preference from "@/models/Preference";
import { NextResponse } from "next/server";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";

export async function PATCH() {
  try {
    const userEmail = await getSessionEmail();

    const userPreference = await Preference.findOne({ email: userEmail });
    console.log(userPreference);

    const updatedPreference = await Preference.findByIdAndUpdate(
      userPreference._id,
      { autoNext: !userPreference.autoNext },
      { new: true }
    ).select(preferenceSelector);

    return NextResponse.json(updatedPreference, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
