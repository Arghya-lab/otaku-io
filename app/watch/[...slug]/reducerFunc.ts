import { PlayerActionType, PlayerStateType } from "@/types/player";

const reducer = (state: PlayerStateType, action: PlayerActionType) => {
  switch (action.type) {
    case "minimizeMaximize":
      return { ...state, playerFullScreen: action.payload };
      break;
    case "pausePlaying":
      return { ...state, playing: false };
      break;
    case "togglePlaying":
      return { ...state, playing: !state.playing };
      break;
    case "updateStreamingLinks":
      return {
        ...state,
        sources: action.payload.sources,
        currentSource: action.payload.currentSource,
        url: action.payload.currentSource.url,
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

    default:
      return state;
      break;
  }
};

export default reducer;
