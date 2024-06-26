import { AnimeItemType } from "@/types/anime";
import "server-only";
import { advancedSearch } from "./getAnime";

export const getAnimesByIds = async (animeIds: string[]) => {
  try {
    let bookmarkAnimes: AnimeItemType[] = [];

    const data = await Promise.all(
      animeIds.map((animeId: string) => advancedSearch({ id: animeId }))
    );

    bookmarkAnimes = data.map((item) => item?.results[0]);

    return bookmarkAnimes;
  } catch {
    throw new Error("Error occur while getting animes.");
  }
};
