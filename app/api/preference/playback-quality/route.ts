import "server-only";

import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import { validateSession } from "@/app/api/_lib/validateSession";
import connectDB from "@/db/db";
import Preference from "@/models/Preference";

/**
 * Route: PATCH /api/preference/playback-quality
 * Description: To update user's playback quality pref for anime streaming
 * Request Body:
 *   - playbackQuality (required): playback quality to update.
 * Note: user have to login.
 */
export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { playbackQuality } = await req.json();
    if (
      !playbackQuality ||
      !["360p", "480p", "720p", "1080p"].includes(playbackQuality)
    ) {
      return apiError({
        errorMessage: "Proper request body is not set.",
        status: 400,
      });
    }

    const { email } = await validateSession();
    const updatedPreference = await Preference.findOneAndUpdate(
      { email },
      { playbackQuality },
      { new: true }
    ).select(preferenceSelector);

    if (!updatedPreference) {
      return apiError({ errorMessage: "Some thing went wrong.", status: 400 });
    }

    return apiSuccess({
      data: updatedPreference,
      message: "Successfully updated user preference.",
    });
  } catch {
    return apiError();
  }
}
