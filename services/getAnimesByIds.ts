import { IAnimeResult } from "@/types/anime";
import { advancedSearch } from "./getAnime";

export const getAnimesByIds = async (
  animeIds: string[],
  page = 1,
  perPage = 30
) => {
  let bookmarkAnimes: IAnimeResult[] = [];

  await Promise.all(
    animeIds
      .slice((page - 1) * perPage, page * perPage)
      .map((animeId: string) => advancedSearch({ id: animeId }))
  )
    .then((data) => {
      const result = data.map((item) => item.results[0]);
      bookmarkAnimes = result;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  return {
    results: bookmarkAnimes,
    hasNextPage: animeIds.length > page * perPage,
    currentPage: page,
  };
};
