import {
  PlayerActionType,
  PlayerStateType,
  ScreenFullTypeEnum,
} from "@/types/player";

const reducer = (state: PlayerStateType, action: PlayerActionType) => {
  switch (action.type) {
    case "minimizeMaximize":
      return { ...state, pip: false, playerFullScreen: action.payload };
      break;
    case "enablePlaying":
      return { ...state, playing: true };
      break;
    case "disablePlaying":
      return { ...state, playing: false };
      break;
    case "togglePlaying":
      return { ...state, playing: !state.playing };
      break;
    case "enablePip":
      return { ...state, pip: true };
      break;
    case "disablePip":
      return { ...state, pip: false };
      break;
    case "togglePip":
      return { ...state, pip: !state.pip };
      break;
    case "updateStreamingLinks":
      return {
        ...state,
        sources: action.payload.sources,
        currentSource: action.payload.currentSource,
        playing: action.payload.playing,
        loaded: 0,
        // played: action.payload.played,
        // pip: false,
      };
      break;
    case "setSkipTimes":
      return { ...state, skipTimes: action.payload };
      break;
    case "updateDuration":
      return { ...state, duration: action.payload };
      break;
    case "updateProgress":
      return {
        ...state,
        loaded: action.payload.loaded,
        played: action.payload.played,
      };
      break;
    case "updateBuffering":
      return { ...state, buffering: action.payload };
      break;
    case "updateVolume":
      let updatedVolume = state.volume + action.payload;

      if (updatedVolume < 0) {
        updatedVolume = 0;
      } else if (updatedVolume > 1) {
        updatedVolume = 1;
      }

      return { ...state, volume: updatedVolume };
      break;
    case "changeVolume":
      let newVolume = action.payload;

      if (newVolume < 0) {
        newVolume = 0;
      } else if (newVolume > 1) {
        newVolume = 1;
      }

      return { ...state, volume: newVolume };
      break;
    case "toggleMuted":
      return { ...state, muted: !state.muted };
      break;
    case "changeControllerVisibility":
      return { ...state, controllerVisibility: action.payload };
      break;
    case "setDefaultFullScreen":
      return { ...state, FullScreenType: ScreenFullTypeEnum.DEFAULT };
      break;
    case "setMaxWidthFullScreen":
      return { ...state, FullScreenType: ScreenFullTypeEnum.MAXWIDTH };
      break;
    case "setVideoAspectRatioFullScreen":
      return { ...state, FullScreenType: ScreenFullTypeEnum["16:9"] };
      break;
    case "qualityOpenChange":
      return {
        ...state,
        isQualitySelectionOpen: action.payload
          ? action.payload
          : !state.isQualitySelectionOpen,
      };
      break;
    case "settingOpenChange":
      return {
        ...state,
        isSettingSectionOpen: action.payload
          ? action.payload
          : !state.isSettingSectionOpen,
      };
      break;

    default:
      return state;
      break;
  }
};

export default reducer;
