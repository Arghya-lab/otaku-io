import { NextRequest } from "next/server";
import { getUserWatching } from "@/services/getUserWatching";
import connectDB from "@/db/db";
import { validateSession } from "@/app/api/_lib/validateSession";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import apiError from "@/app/api/_lib/apiError";

/**
 * Route: GET /api/anime/history
 * Description: To get user anime watching history
 * Request Query:
 *   - page (optional): result to get for page.
 *   - perPage (optional): perPage result to get.
 * Note: user have to login.
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "", 10) ?? 1;
    const perPage =
      parseInt(req.nextUrl.searchParams.get("perPage") ?? "", 10) ?? 20;

    await validateSession();
    const data = await getUserWatching(page, perPage);

    if (data) {
      return apiSuccess({
        data,
        message: "Successfully fetched user anime watching history.",
      });
    } else {
      return apiError({ status: 400 });
    }
  } catch (error) {
    return apiError();
  }
}
