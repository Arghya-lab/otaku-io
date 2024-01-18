import axios from "axios";
import conf from "../conf/conf";

const instance = axios.create({
  baseURL: conf.consumetBaseUrl,
  timeout: 15000,
});

// Api search functions
// Query Parameters for search:  page
const search = async (query, params) =>
  await instance.get(`meta/anilist/${query}`, {
    params,
  });

// Query Parameters for advancedSearch:
// query, type = "ANIME", page, perPage, year
// format = enum["TV", "TV_SHORT", "OVA", "ONA", "MOVIE", "SPECIAL", "MUSIC"]
// sort = enum["POPULARITY_DESC", "POPULARITY", "TRENDING_DESC", "TRENDING", "UPDATED_AT_DESC", "UPDATED_AT", "START_DATE_DESC", "START_DATE", "END_DATE_DESC", "END_DATE", "SCORE_DESC", "SCORE", "TITLE_ROMAJI", "TITLE_ROMAJI_DESC"]   => multiple accepted & should be inside array
// genres = enum[ "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller" ]   => multiple accepted & should be inside array
// status = enum[ "RELEASING", "NOT_YET_RELEASED", "FINISHED", "CANCELLED", "HIATUS", ]
const advancedSearch = async (params) =>
  await instance.get("meta/anilist/advanced-search", { params });

// Query Parameters for getPopular:  page, perPage
const getPopular = async (params) =>
  await instance.get("meta/anilist/popular", { params });

// Query Parameters for getTrending:  page, perPage
const getTrending = async (params) =>
  await instance.get("meta/anilist/trending", { params });

// Query Parameters for getRecentEpisodes:  page, perPage, provider
const getRecentEpisodes = async (params) =>
  await instance.get("meta/anilist/recent-episodes", { params });

const getRandom = async () => await instance.get("/meta/anilist/random-anime");

// Query Parameters for getDetails:  dub, provider
const getDetails = async (id, params) => {
  const fetchFiller =
    params?.provider === "gogoanime" || params?.provider === "zoro"
      ? true
      : false;
  if (fetchFiller) {
    params = { fetchFiller: fetchFiller, ...params };
  }
  return await instance.get(`meta/anilist/info/${id}`, { params });
};

const getUpcoming = async () =>
  await axios.get(conf.upcomingAnimeUrl, {
    params: {
      filter: "upcoming",
    },
  });

// Query Parameters for getImdbData: t, i
const getImdbData = async (params) =>
  await axios.get(conf.ombdBaseUrl, {
    params: {
      apikey: conf.omdbApiKey,
      ...params,
    },
  });

// getStreamingLinks:  episodeId required
const getStreamingLinks = async (episodeId) =>
  await instance.get(`meta/anilist/watch/${episodeId}`);

const animeApi = {
  search,
  advancedSearch,
  getPopular,
  getTrending,
  getRecentEpisodes,
  getDetails,
  getRandom,
  getUpcoming,
  getImdbData,
  getStreamingLinks,
};

export default animeApi;
