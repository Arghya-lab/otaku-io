import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { validateSession } from "@/app/api/_lib/validateSession";
import connectDB from "@/db/db";
import { getAnimesByIds } from "@/services/getAnimesByIds";
import { getUserBookmarkAnime } from "@/services/getUserBookmarkAnimeIds";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/library-animes
 * Description: To get user's bookmark marked anime.
 * Request Query:
 *   - page (optional): result to get for page.
 *   - perPage (optional): perPage result to get.
 * Note: user have to login.
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page")) || 1;
    let perPage = Number(url.searchParams.get("perPage")) || 20;
    if (perPage > 20) perPage = 20;

    const user = await validateSession();
    const bookmarkAnimeIds = await getUserBookmarkAnime(user.email);
    if (!bookmarkAnimeIds) {
      return apiError({ errorMessage: "Unauthorize access.", status: 400 });
    }

    const results = await getAnimesByIds(
      bookmarkAnimeIds.slice((page - 1) * perPage, page * perPage)
    );
    const hasNextPage = bookmarkAnimeIds.length > page * perPage;

    return apiSuccess({
      data: { results, hasNextPage, currentPage: page },
      message: "Successfully fetched user bookmarked animes.",
    });
  } catch {
    return apiError();
  }
}
