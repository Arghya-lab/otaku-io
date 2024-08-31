import "server-only";

import { advancedSearch } from "./getAnime";

export const getAnimesByIds = async (animeIds: string[]) => {
  try {
    const data = await Promise.all(
      animeIds.map((animeId: string) => advancedSearch({ id: animeId }))
    );

    return data.map((item) => item?.results[0]);
  } catch {
    throw new Error("Error occur while getting animes.");
  }
};
