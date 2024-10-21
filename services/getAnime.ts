import "server-only";

import {
  ANIME,
  IAnimeInfo,
  IAnimeResult,
  ISearch,
  META,
  PROVIDERS_LIST,
  StreamingServers,
} from "@consumet/extensions";
import NineAnime from "@consumet/extensions/dist/providers/anime/9anime";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";

export const provider:
  | "gogoanime"
  | "9anime"
  | "animepahe"
  | "zoro"
  | "animefox"
  | "anify"
  | "crunchyroll"
  | "bilibili"
  | "marin" = "gogoanime";

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
 * @param {number} [page] - page number to search for (optional)
 * @param {number} [perPage] - number of results per page (optional)
 */
export async function getTrending({
  page,
  perPage,
}: Partial<{ page: number; perPage: number }> = {}): Promise<IAnimeResult[]> {
  try {
    const anilist = generateAnilistMeta();

    return (await anilist.fetchTrendingAnime(page || 1, perPage || 20)).results;
  } catch {
    throw new Error("Error occur while getting trending anime.");
  }
}

/**
 * @param {number} [page] - page number to search for (optional)
 * @param {number} [perPage] - number of results per page (optional)
 */
export async function getPopular({
  page,
  perPage,
}: Partial<{ page: number; perPage: number }> = {}): Promise<IAnimeResult[]> {
  try {
    const anilist = generateAnilistMeta();

    return (await anilist.fetchPopularAnime(page || 1, perPage || 20)).results;
  } catch {
    throw new Error("Error occur while getting popular anime.");
  }
}

/**
 *
 * @param {string} [query] - Search query (optional).
 * @param {number} [page] - Page number (optional).
 * @param {number} [perPage] - Number of results per page (optional) (default: `20`) (max: `50`).
 * @param {string} [format] - Format (optional) (options: `TV`, `TV_SHORT`, `MOVIE`, `SPECIAL`, `OVA`, `ONA`, `MUSIC`).
 * @param {string[]} [sort=["POPULARITY_DESC", "SCORE_DESC"]] - Sort (optional, accepts multiple as array) (default: `[POPULARITY_DESC, SCORE_DESC]`)
 *   (options: `POPULARITY_DESC`, `POPULARITY`, `TRENDING_DESC`, `TRENDING`, `UPDATED_AT_DESC`, `UPDATED_AT`, `START_DATE_DESC`, `START_DATE`,
 *   `END_DATE_DESC`, `END_DATE`, `FAVOURITES_DESC`, `FAVOURITES`, `SCORE_DESC`, `SCORE`, `TITLE_ROMAJI_DESC`, `TITLE_ROMAJI`, `TITLE_ENGLISH_DESC`,
 *   `TITLE_ENGLISH`, `TITLE_NATIVE_DESC`, `TITLE_NATIVE`, `EPISODES_DESC`, `EPISODES`, `ID`, `ID_DESC`).
 * @param {string[]} [genres] - Genres (optional, accepts multiple as array) (options: `Action`, `Adventure`, `Cars`, `Comedy`, `Drama`, `Fantasy`,
 *   `Horror`, `Mahou Shoujo`, `Mecha`, `Music`, `Mystery`, `Psychological`, `Romance`, `Sci-Fi`, `Slice of Life`, `Sports`, `Supernatural`, `Thriller`).
 * @param {string} [id] - Anilist ID (optional).
 * @param {number} [year] - Year (optional), e.g., `2022`.
 * @param {string} [status] - Status (optional) (options: `RELEASING`, `FINISHED`, `NOT_YET_RELEASED`, `CANCELLED`, `HIATUS`).
 * @param {string} [season] - Season (optional) (options: `WINTER`, `SPRING`, `SUMMER`, `FALL`).
 *
 */
export async function advancedSearch({
  query,
  page,
  perPage,
  format,
  sort,
  genres,
  id,
  year,
  status,
  season,
}: Partial<{
  // Partial utility type to make all properties of the input object optional
  query: string;
  page: number;
  perPage: number;
  format: string;
  sort: string | string[];
  genres: string | string[];
  id: string;
  year: number;
  status: string;
  season: string;
}> = {}): Promise<ISearch<IAnimeResult>> {
  try {
    if (genres) genres = JSON.parse(genres as string);
    if (sort) sort = JSON.parse(sort as string);

    const anilist = generateAnilistMeta();

    return await anilist.advancedSearch(
      query,
      "ANIME",
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
 * @param {string} [query] Search query
 * @param {number} [page] Page number (optional)
 * @param {number} [perPage] Number of results per page (optional) (default: 15) (max: 50)
 */
export const getSearchData = async ({
  query,
  page,
  perPage,
}: {
  query: string;
  page?: number;
  perPage?: number;
}) => {
  try {
    const anilist = generateAnilistMeta();

    return await anilist.search(query, page || 1, perPage || 30);
  } catch {
    throw new Error("Error occur while getting searching anime.");
  }
};

/**
 *
 * @param {string} [id] Anime id
 * @param {boolean} [isDub] to get dubbed episodes (optional) set to `true` to get dubbed episodes. **ONLY WORKS FOR GOGOANIME**
 * @param {boolean} [fetchFiller] to get filler boolean on the episode object (optional) set to true to get filler boolean on the episode object.
 */
export async function getAnimeInfo({
  id,
  fetchFiller,
}: {
  id: string;
  fetchFiller?: boolean;
}): Promise<IAnimeInfo> {
  try {
    const anilist = generateAnilistMeta(provider);

    const [animeInfo, dubEpisodes] = await Promise.all([
      anilist.fetchAnimeInfo(id, false, fetchFiller),
      getEpisodesListById({ id, fetchFiller, isDub: true }),
    ]);
    animeInfo.dubEpisodes = dubEpisodes;
    animeInfo.recommendations = animeInfo.recommendations?.slice(0, 10);
    animeInfo.relations = animeInfo.relations?.slice(0, 10);
    animeInfo.characters = [];
    animeInfo.mappings = [];
    animeInfo.artwork = [];

    // According to query send data

    return animeInfo;
  } catch {
    throw new Error("Error occur while getting anime info.");
  }
}

/**
 *
 * @param {string} [id] — anilist id
 *@param {boolean} [isDub] — language of the dubbed version (optional) currently only works for gogoanime
 *@param {boolean} [fetchFiller] — to get filler boolean on the episode object (optional) set to true to get filler boolean on the episode object.
 *@returns — episode list (without anime info)
 */
export const getEpisodesListById = async ({
  id,
  isDub,
  fetchFiller,
}: {
  id: string;
  isDub?: boolean;
  fetchFiller?: boolean;
}) => {
  try {
    const anilist = generateAnilistMeta(provider);

    return await anilist.fetchEpisodesListById(id, isDub, fetchFiller);
  } catch {
    throw new Error("Error occur while fetching episode list.");
  }
};

/**
 *
 * @param episodeId — Episode id
 */
export const getEpisodeServers = async (episodeId: string) => {
  try {
    const anilist = generateAnilistMeta(provider);

    return await anilist.fetchEpisodeServers(episodeId);
  } catch {
    throw new Error("Error occur while fetching servers.");
  }
};

/**
 *
 * @param {string} [episodeId] Episode id
 * @param {string} [provider] The provider to get the episode Ids from (optional) default: `gogoanime` (options: `gogoanime`, `zoro`)
 * @param {StreamingServers} [server] server to fetch streaming link from
 */
export const getStreamingLinks = async ({
  episodeId,
  provider,
  server,
}: {
  episodeId: string;
  provider?: string;
  server?: StreamingServers;
}) => {
  try {
    const anilist = generateAnilistMeta(provider);

    return await anilist.fetchEpisodeSources(episodeId, server);

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

/**
 *
 * @param {number} [page] - Page number (optional).
 * @param {number} [perPage] - Number of results per page (optional).
 * @param {number|string} [weekStart] - Filter by the start of the week (optional, defaults to today's date). Options: 2 = Monday, 3 = Tuesday, 4 = Wednesday, 5 = Thursday, 6 = Friday, 0 = Saturday, 1 = Sunday. You can use either the number or the string.
 * @param {number|string} [weekEnd] - Filter by the end of the week (optional), similar to `weekStart`.
 * @param {boolean} [notYetAired] - If true, will return anime that have not yet aired (optional).
 */
export const getAiringSchedule = async ({
  page,
  perPage,
  weekStart,
  weekEnd,
  notYetAired,
}: Partial<{
  page: number;
  perPage: number;
  weekStart: number | string;
  weekEnd: number | string;
  notYetAired: boolean;
}> = {}) => {
  try {
    const anilist = generateAnilistMeta();
    const _weekStart = Math.ceil(Date.now() / 1000);

    return await anilist.fetchAiringSchedule(
      page ?? 1,
      perPage ?? 20,
      weekStart ?? _weekStart,
      weekEnd ?? _weekStart + 604800,
      notYetAired ?? true
    );
  } catch {
    throw new Error("Error occur while fetching airing schedule.");
  }
};

/**
 *
 * @param {number} [page] - Page number (optional).
 * @param {number} [perPage] - Number of results per page (optional).
 */
export const getRecentEpisodes = async ({
  page,
  perPage,
}: Partial<{
  page: number;
  perPage: number;
}> = {}) => {
  try {
    const anilist = generateAnilistMeta();

    return await anilist.fetchRecentEpisodes(provider, page, perPage);
  } catch {
    throw new Error("Error occur while fetching recent episodes.");
  }
};
