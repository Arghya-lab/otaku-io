import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { getDetailInfo } from "@/services/getAnime";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/detail-info/:id
 * Description: To get detail info for anime.
 * Request Query:
 *   - dub (optional): Is detail info for dub have to fetch.
 * Request Param(Dynamic EpId param) -(Required).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const isDub = req.nextUrl.searchParams.get("dub") === "true" ? true : false;

  try {
    console.log(id, isDub);

    const data = await getDetailInfo(id, isDub);

    return apiSuccess({
      data,
      message: "Successfully fetched anime detail info.",
    });
  } catch (error) {
    return apiError();
  }
}
