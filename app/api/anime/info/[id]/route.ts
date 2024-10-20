import "server-only";

import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { getAnimeInfo } from "@/services/getAnime";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/info/:id
 * Description: To get info  for anime.
 * Request Query:
 *   - dub (optional): Is info  for dub have to fetch.
 * Request Param(Dynamic EpId param) -(Required).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const isDub = req.nextUrl.searchParams.get("dub") === "true" ? true : false;

  try {
    const data = await getAnimeInfo({ id, isDub });

    return apiSuccess({
      data,
      message: "Successfully fetched anime info .",
    });
  } catch {
    return apiError();
  }
}
