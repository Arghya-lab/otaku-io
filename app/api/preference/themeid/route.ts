import Preference from "@/models/Preference";
import { validateSession } from "@/app/api/_lib/validateSession";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import connectDB from "@/db/db";
import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { themes } from "@/theme";

/**
 * Route: PATCH /api/preference/seek-seconds
 * Description: To update user's seek seconds pref for anime streaming
 * Request Body:
 *   - seekSeconds (required): playback seekSeconds to update.
 * Note: user have to login.
 */
export async function PATCH(req: Request) {
  try {
    await connectDB();

    let { themeId } = await req.json();

    themeId = Number(themeId);

    if (!themeId || themeId < 1 || themeId > themes.length) {
      return apiError({
        errorMessage: "Proper request body is not set.",
        status: 400,
      });
    }

    const { email } = await validateSession();
    const updatedPreference = await Preference.findOneAndUpdate(
      { email },
      { themeId },
      { new: true }
    ).select(preferenceSelector);

    if (!updatedPreference) {
      return apiError({ errorMessage: "Some thing went wrong.", status: 400 });
    }

    return apiSuccess({
      data: updatedPreference,
      message: "Successfully updated user preference.",
    });
  } catch (error) {
    return apiError();
  }
}
