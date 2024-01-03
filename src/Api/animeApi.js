import axios from "axios";

const instance = axios.create({
  baseURL: "https://march-api1.vercel.app/",
  timeout: 8000,
});

// Api search functions
// Query Parameters for search:  page
const search = async (query, params) =>
  await instance.get(`https://march-api1.vercel.app/meta/anilist/${query}`, {
    params,
  });

// Query Parameters for advancedSearch:
// query, type = "ANIME", page, perPage, year
// format = enum["TV", "TV_SHORT", "OVA", "ONA", "MOVIE", "SPECIAL", "MUSIC"]
// sort = enum["POPULARITY_DESC", "POPULARITY", "TRENDING_DESC", "TRENDING", "UPDATED_AT_DESC", "UPDATED_AT", "START_DATE_DESC", "START_DATE", "END_DATE_DESC", "END_DATE", "SCORE_DESC", "SCORE", "TITLE_ROMAJI", "TITLE_ROMAJI_DESC"]   => multiple accepted & should be inside array
// genres = enum[ "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller" ]   => multiple accepted & should be inside array
// status = enum[ "RELEASING", "NOT_YET_RELEASED", "FINISHED", "CANCELLED", "HIATUS", ]
const advancedSearch = async (params) =>
  await instance.get("/meta/anilist/advanced-search", { params });

// Query Parameters for getPopular:  page, perPage
const getPopular = async (params) =>
  await instance.get("meta/anilist/popular", { params });

const getRandom = async () => await instance.get("/meta/anilist/random-anime");

// Query Parameters for getTrending:  page, perPage
const getTrending = async (params) =>
  await instance.get("/meta/anilist/trending", { params });

// Query Parameters for getTrending:  page, perPage, provider
const getRecentEpisodes = async (params) =>
  await instance.get("/meta/anilist/recent-episodes", { params });

const getUpcoming = async () =>
  axios.get("https://api.jikan.moe/v4/top/anime", {
    params: {
      filter: "upcoming",
    },
  });

const animeApi = {
  search,
  advancedSearch,
  getPopular,
  getRandom,
  getTrending,
  getRecentEpisodes,
  getUpcoming,
};

export default animeApi;
