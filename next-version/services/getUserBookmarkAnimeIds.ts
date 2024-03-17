import { getServerSession } from "next-auth";
import User from "@/models/User";

export const getUserBookmarkAnime = async (
  page: number = 1,
  perPage: number = 10
) => {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return null;
    }

    const user = await User.findOne({ email: userEmail });

    const animeIds: string[] = user.bookmarks.slice(
      (page - 1) * perPage,
      page * perPage
    );

    return animeIds;
    
  } catch (error) {
    console.log(error);
    // Return error response
  }
};
