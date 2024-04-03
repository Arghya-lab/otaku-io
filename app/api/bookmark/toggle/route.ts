import { NextResponse } from "next/server";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import User from "@/models/User";

export async function PATCH(req: Request) {
  try {
    const userEmail = await getSessionEmail();
    const { animeId } = await req.json();

    const user = await User.findOne({ email: userEmail });

    const isBookmarked = user.bookmarks.includes(animeId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id: string) => id !== animeId.toString()
      );
    } else {
      user.bookmarks.unshift(animeId);
    }
    await user.save();

    return NextResponse.json(user.bookmarks, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
