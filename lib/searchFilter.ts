import { FormatEnum, GenresEnum, SortEnum, StatusEnum } from "@/types/discover";

export const formatList = [
  { value: undefined, name: "None" },
  { value: FormatEnum.TV, name: "Tv" },
  { value: FormatEnum.TV_SHORT, name: "Tv Short" },
  { value: FormatEnum.MOVIE, name: "Movie" },
  { value: FormatEnum.SPECIAL, name: "Special" },
  { value: FormatEnum.MUSIC, name: "Music" },
  { value: FormatEnum.OVA, name: "OVA" },
  { value: FormatEnum.ONA, name: "ONA" },
];

export const sortList = [
  { value: undefined, name: "None" },
  { value: SortEnum.POPULARITY_DESC, name: "Popularity Desc" },
  { value: SortEnum.POPULARITY, name: "Popularity Asc" },
  { value: SortEnum.TRENDING_DESC, name: "Trending  Desc" },
  { value: SortEnum.TRENDING, name: "Trending Asc" },
  { value: SortEnum.UPDATED_AT_DESC, name: "Updated Desc" },
  { value: SortEnum.UPDATED_AT, name: "Updated Asc" },
  { value: SortEnum.START_DATE_DESC, name: "Start Date Desc" },
  { value: SortEnum.START_DATE, name: "Start Date Asc" },
  { value: SortEnum.END_DATE_DESC, name: "End Date Desc" },
  { value: SortEnum.END_DATE, name: "End Date Asc" },
  { value: SortEnum.SCORE_DESC, name: "Score Desc" },
  { value: SortEnum.SCORE, name: "Score Asc" },
  { value: SortEnum.TITLE_ROMAJI, name: "Alphabetically" },
  { value: SortEnum.TITLE_ROMAJI_DESC, name: "Alphabetically Desc" },
];

export const genreList = [
  { value: undefined, name: "None" },
  { value: GenresEnum.Action, name: "Action" },
  { value: GenresEnum.Adventure, name: "Adventure" },
  { value: GenresEnum.Comedy, name: "Comedy" },
  { value: GenresEnum.Drama, name: "Drama" },
  { value: GenresEnum.Fantasy, name: "Fantasy" },
  { value: GenresEnum.Horror, name: "Horror" },
  { value: GenresEnum.Mecha, name: "Mecha" },
  { value: GenresEnum.Music, name: "Music" },
  { value: GenresEnum.Mystery, name: "Mystery" },
  { value: GenresEnum.Psychological, name: "Psychological" },
  { value: GenresEnum.Romance, name: "Romance" },
  { value: GenresEnum.SciFi, name: "Sci-Fi" },
  { value: GenresEnum.SliceOfLife, name: "Slice of Life" },
  { value: GenresEnum.Sports, name: "Sports" },
  { value: GenresEnum.Supernatural, name: "Supernatural" },
  { value: GenresEnum.Thriller, name: "Thriller" },
];

export const statusList = [
  { value: undefined, name: "None" },
  { value: StatusEnum.FINISHED, name: "Finished" },
  { value: StatusEnum.RELEASING, name: "Releasing" },
  { value: StatusEnum.NOT_YET_RELEASED, name: "Not Yet Released" },
  { value: StatusEnum.CANCELLED, name: "Cancelled" },
  { value: StatusEnum.HIATUS, name: "Hiatus" },
];
