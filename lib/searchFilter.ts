import { FormatEnum, GenreEnum, SortEnum, StatusEnum } from "@/types/discover";

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

export const genresList = [
  { value: undefined, name: "None" },
  { value: GenreEnum.Action, name: "Action" },
  { value: GenreEnum.Adventure, name: "Adventure" },
  { value: GenreEnum.Comedy, name: "Comedy" },
  { value: GenreEnum.Drama, name: "Drama" },
  { value: GenreEnum.Fantasy, name: "Fantasy" },
  { value: GenreEnum.Horror, name: "Horror" },
  { value: GenreEnum.Mecha, name: "Mecha" },
  { value: GenreEnum.Music, name: "Music" },
  { value: GenreEnum.Mystery, name: "Mystery" },
  { value: GenreEnum.Psychological, name: "Psychological" },
  { value: GenreEnum.Romance, name: "Romance" },
  { value: GenreEnum.SciFi, name: "Sci-Fi" },
  { value: GenreEnum.SliceOfLife, name: "Slice of Life" },
  { value: GenreEnum.Sports, name: "Sports" },
  { value: GenreEnum.Supernatural, name: "Supernatural" },
  { value: GenreEnum.Thriller, name: "Thriller" },
];

export const statusList = [
  { value: undefined, name: "None" },
  { value: StatusEnum.FINISHED, name: "Finished" },
  { value: StatusEnum.RELEASING, name: "Releasing" },
  { value: StatusEnum.NOT_YET_RELEASED, name: "Not Yet Released" },
  { value: StatusEnum.CANCELLED, name: "Cancelled" },
  { value: StatusEnum.HIATUS, name: "Hiatus" },
];
