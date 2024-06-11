import { AnimeStreamingLinkType, SkipTimeType } from "./anime";

export interface PlayerStateType {
  // url: string | null;
  pip: boolean;
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
  videoAspectRatio: number;
  playerFullScreen: boolean;
  FullScreenType: ScreenFullTypeEnum;
  isMobileDevice: boolean;
  controllerVisibility: boolean;
  skipTimes: SkipTimeType[];
  isQualitySelectionOpen: boolean;
  isSettingSectionOpen: boolean;
}

export enum ScreenFullTypeEnum {
  "DEFAULT",
  "MAXWIDTH",
  "16:9",
}

interface MinimizeMaximizeActionType {
  type: "minimizeMaximize";
  payload: boolean;
}

interface EnablePlayingActionType {
  type: "enablePlaying";
}
interface DisablePlayingActionType {
  type: "disablePlaying";
}
interface TogglePlayingActionType {
  type: "togglePlaying";
}
interface EnablePipActionType {
  type: "enablePip";
}
interface DisablePipActionType {
  type: "disablePip";
}
interface TogglePipActionType {
  type: "togglePip";
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
interface changeControllerVisibilityActionType {
  type: "changeControllerVisibility";
  payload: boolean;
}
interface setVideoAspectRatioActionType {
  type: "setVideoAspectRatio";
  payload: number;
}
interface setDefaultFullScreenActionType {
  type: "setDefaultFullScreen";
}
interface setMaxWidthFullScreenActionType {
  type: "setMaxWidthFullScreen";
}
interface setVideoAspectRatioFullScreenActionType {
  type: "setVideoAspectRatioFullScreen";
}
interface QualityOpenChangeActionType {
  type: "qualityOpenChange";
  payload?: boolean;
}
interface SettingOpenChangeActionType {
  type: "settingOpenChange";
  payload?: boolean;
}

export type PlayerActionType =
  | MinimizeMaximizeActionType
  | EnablePlayingActionType
  | DisablePlayingActionType
  | TogglePlayingActionType
  | EnablePipActionType
  | DisablePipActionType
  | TogglePipActionType
  | UpdateStreamingLinksActionType
  | SetSkipTimesActionType
  | UpdateDurationActionType
  | UpdateProgressActionType
  | UpdateBufferingActionType
  | UpdateVolumeActionType
  | ChangeVolumeActionType
  | ToggleMutedActionType
  | changeControllerVisibilityActionType
  | setVideoAspectRatioActionType
  | setDefaultFullScreenActionType
  | setMaxWidthFullScreenActionType
  | setVideoAspectRatioFullScreenActionType
  | QualityOpenChangeActionType
  | SettingOpenChangeActionType;
