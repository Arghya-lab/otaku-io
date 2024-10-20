import "server-only";

import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { getEpisodesListById } from "@/services/getAnime";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/episodes/:id
 * Description: To get episodes  for anime.
 * Request Query:
 *   - dub (optional): Is episodes  for dub have to fetch.
 *   - fetchFiller (optional): Is episodes  for dub have to fetch.
 * Request Param(Dynamic EpId param) -(Required).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const isDub = req.nextUrl.searchParams.get("dub") === "true";
  const fetchFiller = req.nextUrl.searchParams.get("fetchFiller") === "true";

  try {
    const data = await getEpisodesListById({ id, isDub, fetchFiller });

    return apiSuccess({
      data,
      message: "Successfully fetched anime episodes.",
    });
  } catch {
    return apiError();
  }
}
