import Preference from "@/models/Preference";
import { validateSession } from "@/app/api/_lib/validateSession";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import connectDB from "@/db/db";
import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";

/**
 * Route: PATCH /api/preference/auto-play
 * Description: To update user's auto play for next episode type.
 * Note: user have to login.
 */
export async function PATCH() {
  try {
    await connectDB();

    const { email } = await validateSession();

    const userPreference = await Preference.findOne({ email });
    if (!userPreference) {
      return apiError({ errorMessage: "Some thing went wrong.", status: 400 });
    }

    const updatedPreference = await Preference.findByIdAndUpdate(
      userPreference._id,
      { autoSkip: !userPreference.autoSkip },
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
