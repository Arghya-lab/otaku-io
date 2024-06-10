import Preference from "@/models/Preference";
import { validateSession } from "@/app/api/_lib/validateSession";
import { preferenceSelector } from "@/app/api/_lib/preferenceSelector";
import connectDB from "@/db/db";
import apiError from "@/app/api/_lib/apiError";
import apiSuccess from "@/app/api/_lib/apiSuccess";

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
  } catch (error) {
    return apiError();
  }
}
