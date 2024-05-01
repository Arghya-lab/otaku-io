export interface PreferenceType {
  themeId: number;
  autoNext: boolean;
  autoPlay: boolean;
  autoSkip: boolean;
  isDub: boolean;
  playbackQuality: string;
  seekSeconds: number;
}

export interface AnimeWatchedType {
  animeId: string;
  episodes: EpisodeWatchedType[];
  lastWatchedEp: string;
  lastWatchedAt: number;
}

export interface EpisodeWatchedType {
  episodeNo: string;
  watchedTill: number;
}
