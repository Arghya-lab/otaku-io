import "server-only";

import {
  ANIME,
  IAnimeInfo,
  IAnimeResult,
  ISearch,
  META,
  PROVIDERS_LIST,
} from "@consumet/extensions";
import NineAnime from "@consumet/extensions/dist/providers/anime/9anime";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";

const generateAnilistMeta = (
  provider: string | undefined = undefined
): Anilist => {
  if (typeof provider !== "undefined") {
    let possibleProvider = PROVIDERS_LIST.ANIME.find(
      (p) => p.name.toLowerCase() === provider.toLocaleLowerCase()
    );

    if (possibleProvider instanceof NineAnime) {
      possibleProvider = new ANIME.NineAnime(
        process.env?.NINE_ANIME_HELPER_URL,
        {
          url: process.env?.NINE_ANIME_PROXY as string,
        },
        process.env?.NINE_ANIME_HELPER_KEY as string
      );
    }

    return new META.Anilist(possibleProvider, {
      url: process.env.PROXY as string | string[],
    });
  } else {
    // default provider is gogoanime
    return new Anilist(new Gogoanime(), {
      url: process.env.PROXY as string | string[],
    });
  }
};

/**
 * @param page page number to search for (optional)
 * @param perPage number of results per page (optional)
 */
export async function getTrending(
  page = 1,
  perPage = 10
): Promise<IAnimeResult[]> {
  try {
    const anilist = generateAnilistMeta();

    return (await anilist.fetchTrendingAnime(page, perPage)).results;
  } catch {
    throw new Error("Error occur while getting trending anime.");
  }
}

/**
 * @param page page number to search for (optional)
 * @param perPage number of results per page (optional)
 */
export async function getPopular(
  page = 1,
  perPage = 10
): Promise<IAnimeResult[]> {
  try {
    const anilist = generateAnilistMeta();

    return (await anilist.fetchPopularAnime(page, perPage)).results;
  } catch {
    throw new Error("Error occur while getting popular anime.");
  }
}

/**
 *
 * @param query Search query (optional)
 * @param type Media type (optional) (default: `ANIME`) (options: `ANIME`, `MANGA`)
 * @param page Page number (optional)
 * @param perPage Number of results per page (optional) (default: `20`) (max: `50`)
 * @param format Format (optional) (options: `TV`, `TV_SHORT`, `MOVIE`, `SPECIAL`, `OVA`, `ONA`, `MUSIC`)
 * @param sort Sort (optional, as array multiple accepted) (Default: `[POPULARITY_DESC, SCORE_DESC]`) (options: `POPULARITY_DESC`, `POPULARITY`, `TRENDING_DESC`, `TRENDING`, `UPDATED_AT_DESC`, `UPDATED_AT`, `START_DATE_DESC`, `START_DATE`, `END_DATE_DESC`, `END_DATE`, `FAVOURITES_DESC`, `FAVOURITES`, `SCORE_DESC`, `SCORE`, `TITLE_ROMAJI_DESC`, `TITLE_ROMAJI`, `TITLE_ENGLISH_DESC`, `TITLE_ENGLISH`, `TITLE_NATIVE_DESC`, `TITLE_NATIVE`, `EPISODES_DESC`, `EPISODES`, `ID`, `ID_DESC`)
 * @param genres Genres (optional, as array multiple accepted) (options: `Action`, `Adventure`, `Cars`, `Comedy`, `Drama`, `Fantasy`, `Horror`, `Mahou Shoujo`, `Mecha`, `Music`, `Mystery`, `Psychological`, `Romance`, `Sci-Fi`, `Slice of Life`, `Sports`, `Supernatural`, `Thriller`)
 * @param id anilist Id (optional)
 * @param year Year (optional) e.g. `2022`
 * @param status Status (optional) (options: `RELEASING`, `FINISHED`, `NOT_YET_RELEASED`, `CANCELLED`, `HIATUS`)
 * @param season Season (optional) (options: `WINTER`, `SPRING`, `SUMMER`, `FALL`)
 */
export async function advancedSearch({
  query,
  page,
  perPage,
  type,
  genres,
  id,
  format,
  sort,
  status,
  year,
  season,
}: Partial<{
  // Partial utility type to make all properties of the input object optional
  query: string;
  page: number;
  perPage: number;
  type: string;
  genres: string | string[];
  id: string;
  format: string;
  sort: string | string[];
  status: string;
  year: number;
  season: string;
}> = {}): Promise<ISearch<IAnimeResult>> {
  try {
    if (!page) page = 1;

    if (!perPage) perPage = 30;

    if (genres) genres = JSON.parse(genres as string);

    if (sort) sort = JSON.parse(sort as string);

    const anilist = generateAnilistMeta();

    return await anilist.advancedSearch(
      query,
      type,
      page,
      perPage,
      format,
      sort as string[],
      genres as string[],
      id,
      year,
      status,
      season
    );
  } catch {
    throw new Error("Error occur while searching anime.");
  }
}

/**
 *
 * @param id Anime id
 * @param dub to get dubbed episodes (optional) set to `true` to get dubbed episodes. **ONLY WORKS FOR GOGOANIME**
 */
export async function getAnimeInfo(
  id: string,
  isDub?: boolean
): Promise<IAnimeInfo> {
  try {
    // const provider = (request.query as { provider?: string }).provider;
    let anilist = generateAnilistMeta();

    return await anilist.fetchAnimeInfo(id, isDub);
  } catch {
    throw new Error("Error occur while getting anime info.");
  }
}

/**
 * @param query Search query
 * @param page Page number (optional)
 * @param perPage Number of results per page (optional) (default: 30) (max: 50)
 */
export const getSearchData = async (
  query: string,
  page?: number,
  perPage?: number
) => {
  try {
    const anilist = generateAnilistMeta();

    return await anilist.search(query, page, perPage || 30);
  } catch {
    throw new Error("Error occur while getting searching anime.");
  }
};

/**
 *
 * @param episodeId Episode id
 * @param provider The provider to get the episode Ids from (optional) default: `gogoanime` (options: `gogoanime`, `zoro`)
 */
export const getStreamingLinks = async (
  episodeId: string,
  provider?: string
) => {
  try {
    const anilist = generateAnilistMeta(provider);

    return await anilist.fetchEpisodeSources(episodeId);

    // return {
    //   headers: {
    //     Referer:
    //       "https://embtaku.pro/embedplus?id=MTQ3OTA3&token=9kS6Drw68_FkCirvebVQdw&expires=1714502330",
    //   },
    //   sources: [
    //     {
    //       url: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.360.m3u8",
    //       isM3U8: true,
    //       quality: "360p",
    //     },
    //     {
    //       url: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.480.m3u8",
    //       isM3U8: true,
    //       quality: "480p",
    //     },
    //     {
    //       url: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.720.m3u8",
    //       isM3U8: true,
    //       quality: "720p",
    //     },
    //     {
    //       url: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.1080.m3u8",
    //       isM3U8: true,
    //       quality: "1080p",
    //     },
    //     {
    //       url: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.m3u8",
    //       isM3U8: true,
    //       quality: "default",
    //     },
    //     {
    //       url: "https://www088.anicdnstream.info/videos/hls/JEXf5r109GSaRSBaTkpuIA/1714509530/147907/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.m3u8",
    //       isM3U8: true,
    //       quality: "backup",
    //     },
    //   ],
    //   download:
    //     "https://gogohd.net/download?id=MTQ3OTA3&token=9kS6Drw68_FkCirvebVQdw&expires=1714502330",
    // };
  } catch {
    throw new Error("Error occur while fetching streaming links.");
  }
};
