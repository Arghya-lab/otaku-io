import "server-only";

import { ANIME, META, PROVIDERS_LIST } from "@consumet/extensions";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import NineAnime from "@consumet/extensions/dist/providers/anime/9anime";
import {
  AdvancedAnimeSearchResType,
  AnimeSearchResType,
  AnimeStreamingSourceType,
  DetailAnimeInfoType,
  PopularAnimeResType,
  TrendingAnimeResType,
} from "@/types/anime";
import axios from "axios";

const generateAnilistMeta = (
  provider: string | undefined = "gogoanime"
): Anilist => {
  try {
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
      return new Anilist(undefined, {
        url: process.env.PROXY as string | string[],
      });
    }
  } catch {
    throw new Error("Error occur while generating anilist meta.");
  }
};

// Query Parameters for getTrending:  page, perPage
export const getTrending = async (page = 1, perPage = 10) => {
  try {
    const anilist = generateAnilistMeta();

    const res = (await anilist.fetchTrendingAnime(
      page,
      perPage
    )) as TrendingAnimeResType;
    return res;
  } catch {
    throw new Error("Error occur while getting trending anime.");
  }
};

// Query Parameters for getPopular:  page, perPage
export const getPopular = async (page = 1, perPage = 10) => {
  try {
    const anilist = generateAnilistMeta();

    const res = (await anilist.fetchPopularAnime(
      page,
      perPage
    )) as PopularAnimeResType;
    return res;
  } catch {
    throw new Error("Error occur while getting popular anime.");
  }
};

// Query Parameters for advancedSearch:
// query, type = "ANIME", page, perPage, year
// format = enum["TV", "TV_SHORT", "OVA", "ONA", "MOVIE", "SPECIAL", "MUSIC"]
// sort = ["POPULARITY_DESC", "POPULARITY", "TRENDING_DESC", "TRENDING", "UPDATED_AT_DESC", "UPDATED_AT", "START_DATE_DESC", "START_DATE", "END_DATE_DESC", "END_DATE", "SCORE_DESC", "SCORE", "TITLE_ROMAJI", "TITLE_ROMAJI_DESC"]   => multiple accepted & should be inside array
// genres = [ "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller" ]   => multiple accepted & should be inside array
// status = enum[ "RELEASING", "NOT_YET_RELEASED", "FINISHED", "CANCELLED", "HIATUS", ]
export const advancedSearch = async ({
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
}> = {}) => {
  try {
    if (!page) page = 1;

    if (!perPage) perPage = 30;

    if (genres) genres = JSON.parse(genres as string);

    if (sort) sort = JSON.parse(sort as string);

    const anilist = generateAnilistMeta();

    const res = (await anilist.advancedSearch(
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
    )) as AdvancedAnimeSearchResType;
    return res;
  } catch {
    throw new Error("Error occur while searching anime.");
  }
};

export const getDetailInfo = async (id: string, isDub: boolean = false) => {
  try {
    // const provider = (request.query as { provider?: string }).provider;
    let anilist = generateAnilistMeta();

    const res = (await anilist.fetchAnimeInfo(
      id,
      isDub
    )) as DetailAnimeInfoType;
    return res;
  } catch {
    throw new Error("Error occur while getting anime info.");
  }
};

export const getSearchData = async (
  query: string,
  page: number | undefined = 1,
  perPage: number | undefined = 30
) => {
  try {
    const anilist = generateAnilistMeta();

    const res = (await anilist.search(
      query,
      page,
      perPage
    )) as AnimeSearchResType;
    return res;
  } catch {
    throw new Error("Error occur while getting searching anime.");
  }
};

export const getStreamingLinks = async (
  episodeId: string,
  provider?: string
) => {
  try {
    const anilistPromise = generateAnilistMeta(provider).fetchEpisodeSources(
      episodeId
    ) as Promise<AnimeStreamingSourceType>;

    const axiosPromise = axios
      .get(`https://march-api1.vercel.app/meta/anilist/watch/${episodeId}`)
      .then((response) => response.data as AnimeStreamingSourceType);

    // Use Promise.race() to return the first resolved promise
    return Promise.race([anilistPromise, axiosPromise]);
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
