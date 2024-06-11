import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import connectDB from "@/db/db";
import { getStreamingLinks } from "@/services/getAnime";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/streaming-links/:epId
 * Description: To get anime episode streaming links.
 * Request Param(Dynamic EpId param) -(Required).
 */

export async function GET(
  _: NextRequest,
  { params }: { params: { EpId: string } }
) {
  try {
    await connectDB();
    const data = await getStreamingLinks(params.EpId);
    return apiSuccess({
      data,
      message: "Successfully fetched streaming urls.",
    });
  } catch (error) {
    return apiError();
  }
}
