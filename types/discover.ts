export enum TypeEnum {
  ANIME = "ANIME",
  MANGA = "MANGA",
}

export enum FormatEnum {
  TV = "TV",
  TV_SHORT = "TV_SHORT",
  MOVIE = "MOVIE",
  SPECIAL = "SPECIAL",
  OVA = "OVA",
  ONA = "ONA",
  MUSIC = "MUSIC",
}

export enum SortEnum {
  POPULARITY_DESC = "POPULARITY_DESC",
  POPULARITY = "POPULARITY",
  TRENDING_DESC = "TRENDING_DESC",
  TRENDING = "TRENDING",
  UPDATED_AT_DESC = "UPDATED_AT_DESC",
  UPDATED_AT = "UPDATED_AT",
  START_DATE_DESC = "START_DATE_DESC",
  START_DATE = "START_DATE",
  END_DATE_DESC = "END_DATE_DESC",
  END_DATE = "END_DATE",
  FAVOURITES_DESC = "FAVOURITES_DESC",
  FAVOURITES = "FAVOURITES",
  SCORE_DESC = "SCORE_DESC",
  SCORE = "SCORE",
  TITLE_ROMAJI_DESC = "TITLE_ROMAJI_DESC",
  TITLE_ROMAJI = "TITLE_ROMAJI",
  TITLE_ENGLISH_DESC = "TITLE_ENGLISH_DESC",
  TITLE_ENGLISH = "TITLE_ENGLISH",
  TITLE_NATIVE_DESC = "TITLE_NATIVE_DESC",
  TITLE_NATIVE = "TITLE_NATIVE",
  EPISODES_DESC = "EPISODES_DESC",
  EPISODES = "EPISODES",
  ID = "ID",
  ID_DESC = "ID_DESC",
}

export enum GenreEnum {
  Action = "Action",
  Adventure = "Adventure",
  Cars = "Cars",
  Comedy = "Comedy",
  Drama = "Drama",
  Fantasy = "Fantasy",
  Horror = "Horror",
  MahouShoujo = "Mahou Shoujo", // Using camelCase for Mahou Shoujo
  Mecha = "Mecha",
  Music = "Music",
  Mystery = "Mystery",
  Psychological = "Psychological",
  Romance = "Romance",
  SciFi = "Sci-Fi", // Using camelCase for Sci-Fi
  SliceOfLife = "Slice of Life", // Using camelCase for Slice of Life
  Sports = "Sports",
  Supernatural = "Supernatural",
  Thriller = "Thriller",
}

export enum StatusEnum {
  RELEASING = "RELEASING",
  FINISHED = "FINISHED",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
  CANCELLED = "CANCELLED",
  HIATUS = "HIATUS",
}

export enum SeasonEnum {
  WINTER = "WINTER",
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  FALL = "FALL",
}
