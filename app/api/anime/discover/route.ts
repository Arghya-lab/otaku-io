import { NextRequest } from "next/server";
import { advancedSearch } from "@/services/getAnime";
import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";

/**
 * Route: GET /api/anime/discover
 * Description: To get discover animes.
 * Request Query:
 *   - query (optional): query to search for animes.
 *   - page (optional): Current page no for anime result.
 *   - perPage (optional): Per page result for anime.
 *   - type (optional): Type of anime anime.
 *   - genres (optional): Genres for anime anime result.
 *   - id (optional): Id of the anime to get that particular result.
 *   - format (optional): Format of anime.
 *   - sort (optional): Sorting order of anime.
 *   - status (optional): Current status of anime.
 *   - year (optional): Year of anime published.
 *   - season (optional): Season of anime published.
 */
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query") ?? undefined;
    const page =
      parseInt(req.nextUrl.searchParams.get("page") ?? "", 10) ?? undefined;
    const perPage =
      parseInt(req.nextUrl.searchParams.get("perPage") ?? "", 10) ?? undefined;
    const type = req.nextUrl.searchParams.get("type") ?? undefined;
    const genres = req.nextUrl.searchParams.get("genres") ?? undefined;
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    const format = req.nextUrl.searchParams.get("format") ?? undefined;
    const sort = req.nextUrl.searchParams.get("sort") ?? undefined;
    const status = req.nextUrl.searchParams.get("status") ?? undefined;
    const year =
      parseInt(req.nextUrl.searchParams.get("year") ?? "", 10) ?? undefined;
    const season = req.nextUrl.searchParams.get("season") ?? undefined;

    const data = await advancedSearch({
      query,
      page,
      perPage,
      type,
      genres,
      id,
      format,
      sort,
      status,
      year,
      season,
    });

    return apiSuccess({ data, message: "Successfully fetched animes." });
  } catch (error) {
    return apiError();
  }
}
