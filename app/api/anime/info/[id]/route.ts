import "server-only";

import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { getAnimeInfo } from "@/services/getAnime";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/info/:id
 * Description: To get info  for anime.
 * Request Param(Dynamic EpId param) -(Required).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const data = await getAnimeInfo({ id });

    return apiSuccess({
      data,
      message: "Successfully fetched anime info .",
    });
  } catch {
    return apiError();
  }
}
