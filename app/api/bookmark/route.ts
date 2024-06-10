import { validateSession } from "@/app/api/_lib/validateSession";
import connectDB from "@/db/db";
import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";

/**
 * Route: PATCH /api/bookmark
 * Description: To get user's bookmarked animes.
 * Note: user have to login.
 */
export async function GET() {
  try {
    await connectDB();
    const user = await validateSession();

    if (user) {
      return apiSuccess({
        data: user.bookmarks,
        message: "Successfully fetched user bookmark.",
      });
    } else {
      return apiError({
        errorMessage: "You are not authorized to perform action.",
        status: 400,
      });
    }
  } catch (error) {
    return apiError();
  }
}
