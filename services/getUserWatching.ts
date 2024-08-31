import "server-only";

import AnimeWatched from "@/models/AnimeWatched";
import { WatchingAnimeType } from "@/types/anime";
import { getServerSession } from "next-auth";
import { advancedSearch } from "./getAnime";

export const getUserWatching = async (
  page: number = 1,
  perPage: number = 20
) => {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return null;
    }

    const userHistory: { animeId: string; lastWatched: number }[] =
      await AnimeWatched.find({
        email: userEmail,
      })
        .select("animeId lastWatched -_id")
        .sort({ updatedAt: "desc" })
        .skip((page - 1) * perPage)
        .limit(perPage);

    let watchingAnimes: WatchingAnimeType[] = [];

    if (userHistory) {
      await Promise.all(
        userHistory.map((item) => advancedSearch({ id: item.animeId }))
      )
        .then((data) => {
          const results = data.map((item) => item.results[0]);
          watchingAnimes =
            userHistory?.map((item) => {
              const animeInfo = results.find(
                (result) => result.id == item.animeId
              );

              return { animeInfo, lastWatched: item.lastWatched };
            }) || [];
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      const totalResult = await AnimeWatched.countDocuments({
        email: userEmail,
      });
      return {
        results: watchingAnimes,
        hasNextPage: totalResult > page * perPage,
        currentPage: page,
      };
    }
  } catch {
    throw new Error("Error occur while fetching watching history.");
  }
};
