export enum MediaStatus {
  ONGOING = "Ongoing",
  COMPLETED = "Completed",
  HIATUS = "Hiatus",
  CANCELLED = "Cancelled",
  NOT_YET_AIRED = "Not yet aired",
  UNKNOWN = "Unknown",
}

export enum MediaFormat {
  TV = "TV",
  TV_SHORT = "TV_SHORT",
  MOVIE = "MOVIE",
  SPECIAL = "SPECIAL",
  OVA = "OVA",
  ONA = "ONA",
  MUSIC = "MUSIC",
  MANGA = "MANGA",
  NOVEL = "NOVEL",
  ONE_SHOT = "ONE_SHOT",
}

export interface AnimeItemType {
  id: string;
  malId?: number;
  title:
    | {
        romaji?: string;
        english?: string;
        native?: string;
        userPreferred?: string;
      }
    | string;
  url?: string;
  image?: string;
  imageHash?: string;
  trailer: {
    id?: string;
    site?: string;
    thumbnail?: string;
    thumbnailHash?: string | null;
  };
  description?: string;
  cover?: string;
  coverHash?: string;
  popularity?: number;
  countryOfOrigin?: string;
  status?: MediaStatus;
  rating?: number;
  releaseDate?: string | number;
  color?: string;
  genres?: string[];
  totalEpisodes?: number;
  currentEpisode?: number;
  currentEpisodeCount?: number;
  duration?: number;
  type?: MediaFormat;
}

export interface TrendingAnimeResType {
  currentPage?: number;
  hasNextPage?: boolean;
  results: AnimeItemType[];
}

export interface PopularAnimeResType {
  currentPage?: number;
  hasNextPage?: boolean;
  results: AnimeItemType[];
}

export interface AnimeSearchResType {
  currentPage?: number;
  hasNextPage?: boolean;
  results: AnimeItemType[];
}

export interface AdvancedAnimeSearchResType {
  currentPage?: number;
  hasNextPage?: boolean;
  totalPages?: number;
  totalResults?: number;
  results: AnimeItemType[];
}

export interface WatchingAnimeType {
  animeInfo: AnimeItemType | undefined;
  lastWatched: number;
}

export interface AnimeEpisodeType {
  id: string;
  title?: string;
  image?: string;
  imageHash?: string;
  number: number;
  createdAt?: string;
  description?: string;
  url?: string;
  isFiller?: boolean;
  releaseDate?: string;
}

export interface FuzzyDateType {
  year?: number;
  month?: number;
  day?: number;
}

export interface DetailAnimeInfoType extends AnimeItemType {
  subOrDub?: "sub" | "dub" | "both";
  /**
   * @deprecated use `hasSub` or `hasDub` instead
   */
  hasSub?: boolean;
  hasDub?: boolean;
  synonyms?: string[];
  /**
   * two letter representation of country: e.g JP for japan
   */
  isAdult?: boolean;
  isLicensed?: boolean;
  /**
   * `FALL`, `WINTER`, `SPRING`, `SUMMER`
   */
  season?: string;
  studios?: string[];
  episodes?: AnimeEpisodeType[];
  startDate?: FuzzyDateType;
  endDate?: FuzzyDateType;
  recommendations?: AnimeItemType[];
  relations?: AnimeItemType[];
}

export interface AnimeImdbInfoType {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string; //  "series"
  totalSeasons: string;
  Response: string; // "True"
}

export interface AnimeStreamingLinkType {
  url: string; // The **MAIN URL** of the video provider that should take you to the video
  quality?: string; // The Quality of the video should include the `p` suffix
  isM3U8?: boolean; // make sure to set this to `true` if the video is hls
  isDASH?: boolean; // set this to `true` if the video is dash (mpd)
  size?: number; // size of the video in **bytes**
  [x: string]: unknown; // other fields
}

export interface AnimeStreamingSourceType {
  headers?: { [k: string]: string };
  intro?: {
    start: number;
    end: number;
  };
  outro?: {
    start: number;
    end: number;
  };
  subtitles?: {
    id?: string; // The id of the subtitle. **not** required
    url: string; // The **url** that should take you to the subtitle **directly**.
    lang: string; // The language of the subtitle
  }[];
  sources: AnimeStreamingLinkType[];
  download?: string;
  embedURL?: string;
}

export interface SkipTimeType {
  type: "intro" | "outro" | "mix-intro" | "mix-outro" | "recap";
  startTime: number;
  endTime: number;
}
