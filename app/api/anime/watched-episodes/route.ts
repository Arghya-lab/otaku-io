import { NextRequest, NextResponse } from "next/server";
import AnimeWatched from "@/models/AnimeWatched";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import connectDB from "@/db/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userEmail = await getSessionEmail();

    const searchParams = req.nextUrl.searchParams;
    const animeId = searchParams.get("animeId");

    const watchedAnime = await AnimeWatched.findOne({
      email: userEmail,
      animeId,
    }).exec();

    if (watchedAnime && watchedAnime?.episodes.length) {
      const data = watchedAnime.episodes.map((item: any) => item.episodeNo);
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
