import "server-only";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export const getUserBookmarkAnime = async () => {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) return null;

    const user = await User.findOne({ email: userEmail });
    const animeIds: string[] = user.bookmarks;

    return animeIds;
  } catch (error) {
    console.log(error);
    // Return error response
  }
};
