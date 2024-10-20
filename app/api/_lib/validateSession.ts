import "server-only";

import apiError from "@/app/api/_lib/apiError";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export async function validateSession() {
  try {
    const session = await getServerSession();
    const email = session?.user?.email;

    if (!email) {
      throw apiError({
        errorMessage: "You are not authorized to perform action.",
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw apiError({
        errorMessage: "You are not authorized to perform action.",
        status: 400,
      });
    } else {
      return user;
    }
  } catch {
    throw apiError();
  }
}
