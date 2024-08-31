import { IAnimeResult } from "@consumet/extensions";

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

export interface WatchingAnimeType {
  animeInfo?: IAnimeResult;
  lastWatched: number;
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

export interface SkipTimeType {
  type: "intro" | "outro" | "mix-intro" | "mix-outro" | "recap";
  startTime: number;
  endTime: number;
}
