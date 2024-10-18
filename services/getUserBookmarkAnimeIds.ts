import "server-only";

import User from "@/models/User";

export const getUserBookmarkAnime = async (userEmail: string) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) throw new Error("Unauthorize access denied.");

    return user.bookmarks;
  } catch {
    throw new Error("Error occur while fetching bookmarked animes.");
  }
};
