import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { getSearchData } from "@/services/getAnime";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/search
 * Description: To search for anime for specific query.
 * Request Query:
 *   - query (optional): query to search for animes.
 *   - page (optional): Current page no for anime result.
 *   - perPage (optional): Per page result for anime.
 */
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  const page = parseInt(req.nextUrl.searchParams.get("page") ?? "", 10) || 1;
  const perPage =
    parseInt(req.nextUrl.searchParams.get("perPage") ?? "", 10) || 30;

  try {
    const data = await getSearchData(query, page, perPage);

    return apiSuccess({
      data,
      message: "Successfully fetched anime for search query.",
    });
  } catch (error) {
    return apiError();
  }
}
