export interface ApiSuccessType<T> {
  success: boolean;
  message: string;
  data: T;
}

export type PreferenceApiSuccessResType = ApiSuccessType<{
  themeId: number;
  autoNext: boolean;
  autoPlay: boolean;
  autoSkip: boolean;
  isDub: boolean;
  playbackQuality: "360p" | "480p" | "720p" | "1080p";
  seekSeconds: number;
}>;
