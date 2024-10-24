import "server-only";

import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import { validateSession } from "@/app/api/_lib/validateSession";
import connectDB from "@/db/db";
import Preference from "@/models/Preference";

/**
 * Route: GET /api/preference
 * Description: To get user's preference settings.
 * Note: user have to login.
 */
export async function GET() {
  try {
    await connectDB();

    const { email } = await validateSession();

    const userPreference = await Preference.findOne({ email }).select(
      preferenceSelector
    );

    if (!userPreference) {
      return apiError({ errorMessage: "Some thing went wrong.", status: 400 });
    }

    return apiSuccess({
      data: userPreference,
      message: "Successfully updated user preference.",
    });
  } catch {
    return apiError();
  }
}
