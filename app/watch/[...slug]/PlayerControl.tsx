"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import useWindowSize from "@/hooks/useWindowSize";
import {
  PlayerActionType,
  PlayerStateType,
  ScreenFullTypeEnum,
} from "@/types/player";
import { secToMinSec } from "@/utils/time";
import classNames from "classnames";
import {
  Expand,
  FastForward,
  Fullscreen,
  Loader2,
  Maximize2,
  Minimize,
  Minimize2,
  Pause,
  Play,
  RectangleHorizontal,
  Rewind,
  Settings,
} from "lucide-react";
import {
  Dispatch,
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useEffect,
  useState,
} from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import VideoLoadedBar from "./VideoLoadedBar";
import VolumeController from "./VolumeController";

interface PlayerControlProps {
  playerRef: MutableRefObject<ReactPlayer | null>;
  state: PlayerStateType;
  dispatch: Dispatch<PlayerActionType>;
}

const PlayerControl = forwardRef(
  (
    { playerRef, state, dispatch }: PlayerControlProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { autoPlay: isAutoPlayEnabled, seekSeconds: videoSeekSeconds } =
      usePreference();
    const playerElement = document.getElementById("Player");

    const [isRemainingTime, setIsRemainingTime] = useState(false);

    const { windowWidth } = useWindowSize();

    const handleSkipTo = (sec: number) => {
      if (playerRef.current) {
        playerRef.current.seekTo(sec);
      }
    };

    const handleTogglePlayPause = () => {
      dispatch({ type: "togglePlaying" });
    };
    const handleSkipForward = () => {
      if (playerRef.current) {
        playerRef.current.seekTo(
          playerRef.current.getCurrentTime() + videoSeekSeconds
        );
      }
    };

    const handleSkipBack = () => {
      if (playerRef.current) {
        playerRef.current.seekTo(
          playerRef.current.getCurrentTime() - videoSeekSeconds
        );
      }
    };

    const handleFullScreen = () => {
      if (playerElement) {
        screenfull.request(playerElement);
        if ((screen as any).orientation) {
          (screen as any).orientation.lock("landscape");
        }
        dispatch({ type: "minimizeMaximize", payload: true });
      }
    };

    const handleExitFullScreen = () => {
      screenfull.exit();
      if (screen.orientation) {
        screen.orientation.unlock();
      }
      dispatch({ type: "minimizeMaximize", payload: false });
    };

    const handleTogglePIP = () => {
      if (state.playerFullScreen) {
        handleExitFullScreen();
      }
      dispatch({ type: "togglePip" });
    };

    useEffect(() => {
      const handlePlayerKeyPress = (e: any) => {
        if (e.target === document.getElementsByTagName("body")[0]) {
          e.preventDefault();

          switch (e.key) {
            case " ":
              handleTogglePlayPause();
              break;
            case "ArrowRight":
              handleSkipForward();
              break;
            case "ArrowLeft":
              handleSkipBack();
              break;
            case "f":
              handleFullScreen();
              break;
            case "p":
              handleTogglePIP();
              break;
            case "m":
              dispatch({ type: "toggleMuted" });
              break;
            case "Escape":
              handleExitFullScreen();
              break;
            case "ArrowUp":
              dispatch({ type: "updateVolume", payload: 0.1 });
              break;
            case "ArrowDown":
              dispatch({ type: "updateVolume", payload: -0.1 });
              break;
            case "0":
              handleSkipTo((state.duration * 0) / 10);
              break;
            case "1":
              handleSkipTo((state.duration * 1) / 10);
              break;
            case "2":
              handleSkipTo((state.duration * 2) / 10);
              break;
            case "3":
              handleSkipTo((state.duration * 3) / 10);
              break;
            case "4":
              handleSkipTo((state.duration * 4) / 10);
              break;
            case "5":
              handleSkipTo((state.duration * 5) / 10);
              break;
            case "6":
              handleSkipTo((state.duration * 6) / 10);
              break;
            case "7":
              handleSkipTo((state.duration * 7) / 10);
              break;
            case "8":
              handleSkipTo((state.duration * 8) / 10);
              break;
            case "9":
              handleSkipTo((state.duration * 9) / 10);
              break;
            default:
              break;
          }
        }
      };
      document.addEventListener("keydown", handlePlayerKeyPress);

      return () => {
        document.addEventListener("keydown", handlePlayerKeyPress);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.duration]);

    return (
      <div
        ref={ref}
        className={classNames(
          "absolute bottom-0 left-0 right-0 top-0 z-30 flex items-center justify-center text-white opacity-100 transition-opacity duration-500",
          {
            "bg-black bg-opacity-70": state.playerFullScreen,
          }
        )}
        onDoubleClick={() => {
          if (state.playerFullScreen && screenfull.isFullscreen) {
            if (!state.isMobileDevice) handleExitFullScreen();
          } else {
            handleFullScreen();
          }
        }}
      >
        {state?.loaded > 0 && (
          <div className="flex h-full w-full items-center justify-center gap-[15%]">
            {(windowWidth <= 640 || state.isMobileDevice) && (
              <div
                role="button"
                className="rotate-[-45] px-1 xs:px-3"
                onClick={handleSkipBack}
              >
                <Rewind className="h-6 w-6 xs:h-8 xs:w-8" color="#fff" />
              </div>
            )}
            <div className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14">
              {state.buffering ? (
                state.playing ? (
                  <Loader2
                    strokeWidth={2.5}
                    className="h-8 w-8 animate-spin text-white xxs:h-10 xxs:w-10 xs:h-14 xs:w-14"
                    color="#fff"
                  />
                ) : null
              ) : (
                <div role="button" onClick={handleTogglePlayPause}>
                  {state.playing ? (
                    <Pause
                      strokeWidth={1}
                      fill="#fff"
                      color="#fff"
                      className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14"
                    />
                  ) : (
                    <Play
                      strokeWidth={3}
                      fill="#fff"
                      color="#fff"
                      className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14"
                    />
                  )}
                </div>
              )}
            </div>
            {(windowWidth <= 640 || state.isMobileDevice) && (
              <div
                role="button"
                className="rotate-[45] px-1 xs:px-3"
                onClick={handleSkipForward}
              >
                <FastForward className="h-6 w-6 xs:h-8 xs:w-8" color="#fff" />
              </div>
            )}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-1 text-lg text-white xxs:pb-2">
          <div className="flex items-center justify-between xs:pb-2">
            <div className="flex items-center">
              {!state.isMobileDevice && (
                <div
                  role="button"
                  className="px-1 xs:px-2"
                  onClick={handleTogglePlayPause}
                >
                  {state.playing ? (
                    <Pause
                      className="h-4 w-4 xs:h-6 xs:w-6"
                      fill="#fff"
                      color="#fff"
                    />
                  ) : (
                    <Play
                      className="h-4 w-4 xs:h-6 xs:w-6"
                      fill="#fff"
                      color="#fff"
                    />
                  )}
                </div>
              )}
              {!state.isMobileDevice && (
                <VolumeController state={state} dispatch={dispatch} />
              )}
              <div
                className="ml-2 cursor-pointer select-none font-nunito text-xs xs:ml-4 xs:text-sm"
                onClick={() => setIsRemainingTime(!isRemainingTime)}
              >
                <span>
                  {isRemainingTime
                    ? "-" + secToMinSec((1 - state.played) * state.duration)
                    : secToMinSec(state.played * state.duration)}
                </span>
                <span>/{secToMinSec(state.duration)}</span>
              </div>
            </div>
            <div className="flex items-center">
              {windowWidth > 640 && !state.isMobileDevice && (
                <>
                  <div
                    role="button"
                    className="rotate-[-30] px-1 xs:px-3"
                    onClick={handleSkipBack}
                  >
                    <Rewind className="h-5 w-5" color="#fff" />
                  </div>
                  <div
                    role="button"
                    className="rotate-[30] px-1 xs:px-3"
                    onClick={handleSkipForward}
                  >
                    <FastForward className="h-5 w-5" color="#fff" />
                  </div>
                </>
              )}
              {/* <div role="button" className="px-3 xs:px-6">
                <Subtitles className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div> */}
              <div
                role="button"
                className="px-3 xs:px-6"
                onClick={() => dispatch({ type: "settingOpenChange" })}
              >
                <Settings className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div>
              <div
                role="button"
                className="select-none font-nunito text-sm outline-none xs:text-base"
                onClick={() => dispatch({ type: "qualityOpenChange" })}
              >
                {state.currentSource?.quality || "unknown"}
              </div>
              {!state.isMobileDevice && (
                <div
                  role="button"
                  className="pl-3 xs:pl-6"
                  onClick={handleTogglePIP}
                >
                  {state.pip ? (
                    <Maximize2 className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
                  ) : (
                    <Minimize2 className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
                  )}
                </div>
              )}
              {state.playerFullScreen && screenfull.isFullscreen && (
                <div role="button" className="pl-3 xs:pl-6">
                  {state.FullScreenType === ScreenFullTypeEnum.DEFAULT && (
                    <Fullscreen
                      className="h-4 w-4 xs:h-6 xs:w-6"
                      color="#fff"
                      onClick={() =>
                        dispatch({ type: "setMaxWidthFullScreen" })
                      }
                    />
                  )}
                  {state.FullScreenType === ScreenFullTypeEnum.MAXWIDTH && (
                    <RectangleHorizontal
                      className="h-4 w-4 xs:h-6 xs:w-6"
                      color="#fff"
                      onClick={() => dispatch({ type: "setDefaultFullScreen" })}
                    />
                  )}
                </div>
              )}
              <div role="button" className="px-3 xs:px-6">
                {state.playerFullScreen && screenfull.isFullscreen ? (
                  <Minimize
                    className="h-4 w-4 xs:h-6 xs:w-6"
                    color="#fff"
                    onClick={handleExitFullScreen}
                  />
                ) : (
                  <Expand
                    className="h-4 w-4 xs:h-6 xs:w-6"
                    color="#fff"
                    onClick={handleFullScreen}
                  />
                )}
              </div>
            </div>
          </div>
          <VideoLoadedBar state={state} playerRef={playerRef} />
        </div>
      </div>
    );
  }
);

PlayerControl.displayName = "PlayerControl";

export default PlayerControl;
