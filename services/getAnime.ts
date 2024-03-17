import {
  ANIME,
  META,
  PROVIDERS_LIST,
  StreamingServers,
} from "@consumet/extensions";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import NineAnime from "@consumet/extensions/dist/providers/anime/9anime";
import axios from "axios";

const generateAnilistMeta = (
  provider: string | undefined = "gogoanime"
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
    return new Anilist(undefined, {
      url: process.env.PROXY as string | string[],
    });
  }
};

// Query Parameters for getTrending:  page, perPage
export const getTrending = async (page = 1, perPage = 10) => {
  const anilist = generateAnilistMeta();
  return await anilist.fetchTrendingAnime(page, perPage);
};

// Query Parameters for getPopular:  page, perPage
export const getPopular = async (page = 1, perPage = 10) => {
  const anilist = generateAnilistMeta();
  return await anilist.fetchPopularAnime(page, perPage);
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
};

export const getDetailInfo = async (id: string, isDub: boolean = false) => {
  // const provider = (request.query as { provider?: string }).provider;

  let anilist = generateAnilistMeta();

  return await anilist.fetchAnimeInfo(id, isDub);
};

export const getSearchData = async (
  query: string,
  page: number | undefined = 1,
  perPage: number | undefined = 30
) => {
  const anilist = generateAnilistMeta();

  return await anilist.search(query, page, perPage);
};

export const getStreamingLinks = async (
  episodeId: string,
  server?: StreamingServers,
  provider?: string
) => {
  // if (server && !Object.values(StreamingServers).includes(server)) {
  //   console.log("Invalid server");
  // }
  // let anilist = generateAnilistMeta(provider);
  
  // return  await anilist.fetchEpisodeSources(episodeId, server);
  
  try {
    const {data} = await axios.get(`https://march-api1.vercel.app/meta/anilist/watch/${episodeId}`)
    
    return data;
  } catch (error) {
    console.log(error);
    
  }
};
