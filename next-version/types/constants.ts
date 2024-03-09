export enum posterItemType {
  general = "GENERAL",
  filter = "FILTER",
}

export const perSelectEpisodesAmount = 100;

export enum seekTime {
  "5 seconds" = 5,
  "10 seconds" = 10,
  "15 seconds" = 15,
  "20 seconds" = 20,
}

export const seekTimeList: { value: number; name: string }[] = [
  { value: seekTime["5 seconds"], name: "5 seconds" },
  { value: seekTime["10 seconds"], name: "10 seconds" },
  { value: seekTime["15 seconds"], name: "15 seconds" },
  { value: seekTime["20 seconds"], name: "20 seconds" },
];

export enum playbackQualityEnum {
  "360p" = "360p",
  "480p" = "480p",
  "720p" = "720p",
  "1080p" = "1080p",
}

export const playbackQualityList: { value: string; name: string }[] = [
  { value: playbackQualityEnum["360p"], name: "360p" },
  { value: playbackQualityEnum["480p"], name: "480p" },
  { value: playbackQualityEnum["720p"], name: "720p" },
  { value: playbackQualityEnum["1080p"], name: "1080p" },
];
