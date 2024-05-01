import Preference from "@/models/Preference";
import { NextResponse } from "next/server";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import connectDB from "@/db/db";
import { themes } from "@/theme";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const userEmail = await getSessionEmail();
    let { themeId } = await req.json();

    themeId = Number(themeId);

    if (!themeId || themeId < 1 || themeId > themes.length) {
      return NextResponse.json(
        { error: "Proper request body is not set." },
        { status: 400 }
      ); // Return error response
    }

    const userPreference = await Preference.findOne({ email: userEmail });
    const updatedPreference = await Preference.findByIdAndUpdate(
      userPreference._id,
      { themeId },
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
