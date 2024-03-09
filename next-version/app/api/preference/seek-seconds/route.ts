import Preference from "@/models/Preference";
import { NextResponse } from "next/server";
import { getSessionEmail } from "../_lib/getSessionEmail";
import { preferenceSelector } from "../_lib/preferenceSelector";

export async function PATCH(req: Request) {
  try {
    const userEmail = await getSessionEmail();
    let { seekSeconds } = await await req.json();
    seekSeconds = Number(seekSeconds);

    if (!seekSeconds || ![5, 10, 15, 20].includes(seekSeconds)) {
      return NextResponse.json(
        { error: "Proper request body is not set." },
        { status: 400 }
      ); // Return error response
    }

    const userPreference = await Preference.findOne({ email: userEmail });
    const updatedPreference = await Preference.findByIdAndUpdate(
      userPreference._id,
      { seekSeconds },
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
