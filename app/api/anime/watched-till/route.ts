import "server-only";

import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { validateSession } from "@/app/api/_lib/validateSession";
import connectDB from "@/db/db";
import AnimeWatched, { IEpisodeWatched } from "@/models/AnimeWatched";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/watched-till
 * Description: To get user's watched till for a particular anime episodes.
 * Request Query:
 *   - animeId (required): animeId for that anime.
 *   - episodeNo (required): episodeNo for the episode.
 * Note: user have to login.
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const animeId = searchParams.get("animeId");
    const episodeNo = searchParams.get("episodeNo");

    if (!animeId || !episodeNo) {
      return apiError({
        errorMessage: "animeId & episodeNo search params require.",
        status: 400,
      });
    }

    const { email } = await validateSession();
    const watchedAnime = await AnimeWatched.findOne(
      { email, animeId },
      { episodes: { $elemMatch: { episodeNo } } }
    ).exec();

    if (watchedAnime && watchedAnime.episodes[0].episodeNo) {
      const data = {
        animeId,
        episodeNo: watchedAnime.episodes[0].episodeNo,
        watchedTill: watchedAnime.episodes[0].watchedTill,
      };

      return apiSuccess({
        data,
        message: `Successfully fetched user watched till for animeId: ${animeId} & episode: ${episodeNo}`,
      });
    } else {
      return apiError({
        errorMessage: "Result not found based on given data.",
        status: 400,
      });
    }
  } catch {
    return apiError();
  }
}

/**
 * Route: PATCH /api/anime/watched-till
 * Description: To update user's users watched till for a particular anime episodes.
 * Request Query:
 *   - animeId (required): animeId for that anime.
 *   - episodeNo (required): episodeNo for the episode.
 *   - watchedTill (required): User's watchedTill for the episode.
 * Note: user have to login.
 */
export async function PATCH(req: Request) {
  try {
    const { animeId, episodeNo, watchedTill = 0 } = await req.json();

    if (!animeId || !Number(episodeNo)) {
      return apiError({
        errorMessage: "animeId & episodeNo search params require.",
        status: 400,
      });
    }

    const { email } = await validateSession();
    let animeWatched = await AnimeWatched.findOne({
      email,
      animeId,
    });

    if (animeWatched) {
      // Document exists, update watchedTill for the specific episode
      const episodeIdx = animeWatched.episodes.findIndex(
        (ep) => ep.episodeNo == episodeNo
      );

      if (episodeIdx === -1) {
        const newEpisode = {
          _id: new mongoose.Types.ObjectId(),
          episodeNo: Number(episodeNo),
          watchedTill: Number(watchedTill),
        } as IEpisodeWatched;

        animeWatched.episodes.push(newEpisode);
      } else if (animeWatched.episodes[episodeIdx].watchedTill < watchedTill) {
        animeWatched.episodes[episodeIdx].watchedTill = watchedTill;
      }
      animeWatched.lastWatched = episodeNo;
      // Save the updated document
      await animeWatched.save();
    } else {
      animeWatched = await AnimeWatched.create({
        email,
        animeId,
        episodes: [{ episodeNo, watchedTill }],
        lastWatched: episodeNo,
      });
    }
    return apiSuccess({
      data: animeWatched,
      message: `Successfully updated user watched till for animeId: ${animeId} & episode: ${episodeNo}`,
    });
  } catch {
    return apiError();
  }
}
