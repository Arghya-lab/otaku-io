import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { validateSession } from "@/app/api/_lib/validateSession";
import connectDB from "@/db/db";
import AnimeWatched from "@/models/AnimeWatched";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/watched-episodes
 * Description: To get user watched episodes based og animeId.
 * Request Query:
 *   - animeId (required): animeId to get watched episodes.
 * Note: user have to login.
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const animeId = searchParams.get("animeId");
    if (!animeId)
      return apiError({
        errorMessage: "SearchParam animeId required.",
        status: 400,
      });

    const { email } = await validateSession();

    const watchedAnime = await AnimeWatched.findOne({
      email,
      animeId,
    }).exec();

    if (watchedAnime) {
      const data = watchedAnime.episodes.map((item: any) => item.episodeNo);

      return apiSuccess({
        data,
        message: "Successfully fetched watched episodes.",
      });
    } else {
      return apiError({
        errorMessage: "Result not found based on given data.",
        status: 400,
      });
    }
  } catch (error) {
    return apiError();
  }
}
