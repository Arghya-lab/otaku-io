"use client";

import {
  Dispatch,
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useEffect,
  useState,
} from "react";
import screenfull from "screenfull";
import { Popover } from "@headlessui/react";
import {
  Check,
  Expand,
  Minimize,
  // Minimize2,
  Pause,
  Play,
  FastForward,
  Rewind,
  // Settings,
  // Settings2,
  Subtitles,
} from "lucide-react";
import VideoLoadedBar from "./VideoLoadedBar";
import VolumeController from "./VolumeController";
import ReactPlayer from "react-player";
import useWindowSize from "@/hooks/useWindowSize";
import { usePreference } from "@/app/PreferenceProvider";
import { secToMinSec } from "@/utils/time";
import { PlayerActionType, PlayerStateType } from "@/types/player";
import isMobileDevice from "@/utils/getIsMobileDevice";
// import useOrientation from "../../hooks/useOrientation";

interface PlayerControlProps {
  playerRef: MutableRefObject<ReactPlayer | null>;
  state: PlayerStateType;
  dispatch: Dispatch<PlayerActionType>;
  setWatched: () => Promise<void>;
}

const PlayerControl = forwardRef(
  (
    { playerRef, state, dispatch, setWatched }: PlayerControlProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { autoPlay: isAutoPlayEnabled, seekSeconds: videoSeekSeconds } =
      usePreference();
    const playerElement = document.getElementById("Player");

    const [isRemainingTime, setIsRemainingTime] = useState(false);
    const { windowWidth } = useWindowSize();

    const handleKeyPress = (e: any) => {
      e.preventDefault();

      if (e.key === " " || e.keyCode === 32) {
        handleTogglePlayPause();
      } else if (e.key === "ArrowRight" || e.keyCode === 39) {
        handleSkipForward();
      } else if (e.key === "ArrowLeft" || e.keyCode === 37) {
        handleSkipBack();
      } else if (e.key === "f" || e.keyCode === 70) {
        handleFullScreen();
        // } else if (e.key === "p" || e.keyCode === 80) {
        //   handleTogglePIP();
      } else if (e.key === "Escape" || e.keyCode === 27) {
        handleExitFullScreen();
      } else if (e.key === "ArrowUp" || e.keyCode === 38) {
        dispatch({ type: "updateVolume", payload: 0.1 });
      } else if (e.key === "ArrowDown" || e.keyCode === 40) {
        dispatch({ type: "updateVolume", payload: -0.1 });
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

    // const handleTogglePIP = () => {
    //   screenfull.exit(playerElement);
    //   setPlayerState((prev) => ({ ...prev, pip: !prev.pip }));
    //   setPlayerState((prev) => ({ ...prev, pip: !prev.pip }));
    //   setPlayerState((prev) => ({ ...prev, playerFullScreen: false }));
    // };

    useEffect(() => {
      document.addEventListener("keydown", handleKeyPress);

      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={ref}
        className="flex items-center justify-center absolute bottom-0 left-0 right-0 top-0 z-20 text-white"
        onDoubleClick={() => {
          if (state.playerFullScreen && screenfull.isFullscreen) {
            if (!state.isMobileDevice) handleExitFullScreen();
          } else {
            handleFullScreen();
          }
        }}>
        {state?.loaded && (
          <div className="w-full flex items-center justify-center gap-[15%]">
            {(windowWidth <= 640 || state.isMobileDevice) && (
              <div
                role="button"
                className="px-1 xs:px-3 rotate-[-45]"
                onClick={handleSkipBack}>
                <Rewind className="h-6 w-6 xs:h-8 xs:w-8" color="#fff" />
              </div>
            )}
            <div role="button" onClick={handleTogglePlayPause}>
              {!state.buffering &&
                (state.playing ? (
                  <Pause
                    className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14"
                    strokeWidth={1}
                    fill="#fff"
                    color="#fff"
                  />
                ) : (
                  <Play
                    className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14"
                    strokeWidth={3}
                    fill="#fff"
                    color="#fff"
                  />
                ))}
            </div>
            {(windowWidth <= 640 || state.isMobileDevice) && (
              <div
                role="button"
                className="px-1 xs:px-3 rotate-[45]"
                onClick={handleSkipForward}>
                <FastForward className="h-6 w-6 xs:h-8 xs:w-8" color="#fff" />
              </div>
            )}
          </div>
        )}
        <div className="text-lg px-4 pb-1 xxs:pb-2 text-white absolute left-0 right-0 bottom-0">
          <div className="flex items-center justify-between xs:pb-2">
            <div className="flex items-center">
              {!state.isMobileDevice && (
                <div
                  role="button"
                  className="px-1 xs:px-2"
                  onClick={handleTogglePlayPause}>
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
                className="ml-2 xs:ml-4 text-xs xs:text-sm cursor-pointer font-nunito select-none"
                onClick={() => setIsRemainingTime(!isRemainingTime)}>
                <span>
                  {
                    isRemainingTime
                      ? "-" + secToMinSec((1 - state.played) * state.duration)
                      : secToMinSec(state.played * state.duration)
                    // playerRef.current.getCurrentTime()
                  }
                </span>
                <span>/{secToMinSec(state.duration)}</span>
                {/* <span>/{secToMinSec(playerState?.duration)}</span> */}
              </div>
            </div>
            <div className="flex items-center">
              {windowWidth > 640 && !state.isMobileDevice && (
                <>
                  <div
                    role="button"
                    className="px-1 xs:px-3 rotate-[-30]"
                    onClick={handleSkipBack}>
                    <Rewind className="h-5 w-5" color="#fff" />
                  </div>
                  <div
                    role="button"
                    className="px-1 xs:px-3 rotate-[30]"
                    onClick={handleSkipForward}>
                    <FastForward className="h-5 w-5" color="#fff" />
                  </div>
                </>
              )}
              <div role="button" className="px-3 xs:px-6">
                <Subtitles className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div>
              {/* <div role="button" className="px-3 "> */}
              {/* <Settings /> */}
              {/* <Settings2  />
            </div> */}
              <Popover className="relative">
                <Popover.Button className="font-nunito text-sm xs:text-base select-none">
                  {state.currentSource?.quality || "unknown"}
                </Popover.Button>
                <Popover.Panel className="absolute bottom-12 -left-14 z-10 bg-black bg-opacity-80 rounded-lg">
                  <div className="p-2">
                    <p className="p-2 pb-4 border-opacity-90 border-orange-500 border-b-2">
                      Quality
                    </p>
                    <div className="my-2">
                      {state.sources.map((source: any) => (
                        <div
                          role="button"
                          className="mx-2 px-4 py-2 w-40 text-sm font-nunito hover:bg-black bg-opacity-60 rounded flex justify-between select-none"
                          key={source?.quality}
                          onClick={() => {
                            setWatched();
                            dispatch({
                              type: "updateStreamingLinks",
                              payload: {
                                sources: state.sources,
                                currentSource: source,
                                playing: isAutoPlayEnabled,
                              },
                            });
                          }}>
                          {source?.quality}
                          <Check
                            size={24}
                            className={
                              source?.quality == state.currentSource?.quality
                                ? "text-white"
                                : "text-transparent"
                            }
                          />
                        </div>
                      ))}
                      {/* <div
                      role="button"
                      className="mx-2 pl-4 pr-20 py-2 text-sm font-nunito hover:bg-black bg-opacity-60 rounded">
                      Auto{" "}
                      <span
                        className={`${true ? "text-white" : "text-transparent"},
                                "px-4"
                              `}>
                        <Check className="h-5 w-5" />
                      </span>
                    </div> */}
                    </div>
                  </div>
                </Popover.Panel>
              </Popover>
              {/* <div
                role="button"
                className="px-3 xs:px-6"
                onClick={handleTogglePIP}>
                <Minimize2 className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div> */}
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
