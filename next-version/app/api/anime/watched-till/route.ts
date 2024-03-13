import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/app/api/_lib/getSessionEmail";
import AnimeWatched from "@/models/AnimeWatched";

export async function GET(req: NextRequest) {
  try {
    const userEmail = await getSessionEmail();

    const searchParams = req.nextUrl.searchParams;
    const animeId = searchParams.get("animeId");
    const episodeNo = searchParams.get("episodeNo");

    const watchedAnime = await AnimeWatched.findOne(
      { email: userEmail, animeId },
      { episodes: { $elemMatch: { episodeNo } } }
    ).exec();
    const data = {
      animeId,
      episodeNo: watchedAnime.episodes[0].episodeNo,
      watchedTill: watchedAnime.episodes[0].watchedTill,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}

export async function PATCH(req: Request) {
  try {
    const userEmail = await getSessionEmail();
    const { animeId, episodeNo, watchedTill = 0 } = await req.json();

    let animeWatched = await AnimeWatched.findOne({
      email: userEmail,
      animeId,
    });
    if (animeWatched) {
      // Document exists, update watchedTill for the specific episode
      const episodeIdx = animeWatched.episodes.findIndex(
        (ep: any) => ep.episodeNo === episodeNo
      );

      if (episodeIdx === -1) {
        animeWatched.episodes.push({ episodeNo, watchedTill });
      } else {
        animeWatched.episodes[episodeIdx].watchedTill = watchedTill;
      }
      // Save the updated document
      await animeWatched.save();

      return NextResponse.json(animeWatched, { status: 200 });
    } else {
      animeWatched = await AnimeWatched.create({
        email: userEmail,
        animeId,
        episodes: [{ episodeNo, watchedTill }],
      });

      return NextResponse.json(animeWatched, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    ); // Return error response
  }
}
