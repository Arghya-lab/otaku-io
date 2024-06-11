import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import { validateSession } from "@/app/api/_lib/validateSession";
import connectDB from "@/db/db";
import Preference from "@/models/Preference";

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

    let { seekSeconds } = await await req.json();
    seekSeconds = Number(seekSeconds);

    if (!seekSeconds || ![5, 10, 15, 20].includes(seekSeconds)) {
      return apiError({
        errorMessage: "Proper request body is not set.",
        status: 400,
      });
    }

    const { email } = await validateSession();
    const updatedPreference = await Preference.findOneAndUpdate(
      { email },
      { seekSeconds },
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
