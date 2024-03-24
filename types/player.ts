import { AnimeStreamingLinkType, SkipTimeType } from "./anime";

export interface PlayerStateType {
  url: string | null;
  // pip: boolean,
  playing: boolean;
  volume: number; //  value -> 0-1
  muted: boolean;
  played: number; //  value -> 0-1
  duration: number;
  loaded: number;
  // controls: boolean,
  // light: boolean,
  // playbackRate: number,
  // loop: boolean,
  sources: AnimeStreamingLinkType[];
  currentSource: AnimeStreamingLinkType | null;
  playbackQuality: string;
  buffering: boolean;
  playerFullScreen: boolean;
  skipTimes: SkipTimeType[];
}

interface MinimizeMaximizeActionType {
  type: "minimizeMaximize";
  payload: boolean;
}

interface PausePlayingActionType {
  type: "pausePlaying";
}
interface TogglePlayingActionType {
  type: "togglePlaying";
}
interface UpdateStreamingLinksActionType {
  type: "updateStreamingLinks";
  payload: {
    sources: AnimeStreamingLinkType[];
    currentSource: AnimeStreamingLinkType;
    playing: boolean;
    // played: number;
  };
}
interface SetSkipTimesActionType {
  type: "setSkipTimes";
  payload: SkipTimeType[];
}
interface UpdateDurationActionType {
  type: "updateDuration";
  payload: number;
}
interface UpdateProgressActionType {
  type: "updateProgress";
  payload: { loaded: number; played: number };
}
interface UpdateBufferingActionType {
  type: "updateBuffering";
  payload: boolean;
}
interface UpdateVolumeActionType {
  type: "updateVolume";
  payload: number;
}
interface ChangeVolumeActionType {
  type: "changeVolume";
  payload: number;
}
interface ToggleMutedActionType {
  type: "toggleMuted";
}

export type PlayerActionType =
  | MinimizeMaximizeActionType
  | PausePlayingActionType
  | TogglePlayingActionType
  | UpdateStreamingLinksActionType
  | SetSkipTimesActionType
  | UpdateDurationActionType
  | UpdateProgressActionType
  | UpdateBufferingActionType
  | UpdateVolumeActionType
  | ChangeVolumeActionType
  | ToggleMutedActionType;
