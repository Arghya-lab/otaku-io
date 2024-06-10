import { validateSession } from "@/app/api/_lib/validateSession";
import User from "@/models/User";
import connectDB from "@/db/db";
import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";

/**
 * Route: PATCH /api/bookmark/toggle
 * Description: To add or remove bookmark from user's anime bookmark.
 * Request body:
 *   - animeId (required): animeId for that anime.
 * Note: user have to login.
 */
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { animeId } = await req.json();

    if (!animeId) {
      return apiError({
        errorMessage: "animeId require in req body.",
        status: 400,
      });
    }

    const user = await validateSession();

    const isBookmarked = user.bookmarks.includes(animeId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id: string) => id !== animeId.toString()
      );
    } else {
      user.bookmarks.unshift(animeId);
    }
    await user.save();

    return apiSuccess({
      data: user.bookmarks,
      message: "Successfully update user bookmark.",
    });
  } catch (error) {
    return apiError();
  }
}
