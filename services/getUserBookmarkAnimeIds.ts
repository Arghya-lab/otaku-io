import "server-only";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export const getUserBookmarkAnime = async () => {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) return null;

    const user = await User.findOne({ email: userEmail });
    if (!user) throw new Error("Unauthorize access denied.");

    return user.bookmarks;
  } catch {
    throw new Error("Error occur while fetching bookmarked animes.");
  }
};
