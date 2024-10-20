import "server-only";

import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import connectDB from "@/db/db";
import { getStreamingLinks } from "@/services/getAnime";
import { StreamingServers } from "@consumet/extensions";
import { NextRequest } from "next/server";

/**
 * Route: GET /api/anime/streaming-links/:epId
 * Description: To get anime episode streaming links.
 * Request Query:
 *   - server (optional): server to fetch streaming link from.
 * Request Param(Dynamic EpId param) -(Required).
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { EpId: string; server: StreamingServers } }
) {
  const server = req.nextUrl.searchParams.get("server") as
    | StreamingServers
    | undefined;

  try {
    await connectDB();
    const data = await getStreamingLinks({ episodeId: params.EpId, server });
    return apiSuccess({
      data,
      message: "Successfully fetched streaming urls.",
    });
  } catch {
    return apiError();
  }
}
