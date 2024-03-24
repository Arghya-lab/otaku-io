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
  Redo,
  // Settings,
  // Settings2,
  Subtitles,
  Undo,
} from "lucide-react";
import VideoLoadedBar from "./VideoLoadedBar";
import VolumeController from "./VolumeController";
import ReactPlayer from "react-player";
import useWindowSize from "@/hooks/useWindowSize";
import { usePreference } from "@/components/PreferenceProvider";
import { secToMinSec } from "@/utils/time";
import { PlayerActionType, PlayerStateType } from "@/types/player";
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
        // setPlayerState((prev: any) => ({ ...prev, volume: prev.volume + 0.1 }));
        dispatch({ type: "updateVolume", payload: 0.1 });
      } else if (e.key === "ArrowDown" || e.keyCode === 40) {
        // setPlayerState((prev: any) => ({ ...prev, volume: prev.volume - 0.1 }));
        dispatch({ type: "updateVolume", payload: -0.1 });
      }
    };

    const handleTogglePlayPause = () => {
      // setPlayerState((prev: any) => ({ ...prev, playing: !prev?.playing }));
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
        // setPlayerState((prev) => ({ ...prev, pip: false }));
        screenfull.request(playerElement);
        if (screen.orientation) {
        //   screen.orientation.lock("landscape");
        }
        // setPlayerState((prev: any) => ({ ...prev, playerFullScreen: true }));
        dispatch({ type: "minimizeMaximize", payload: true });
      }
    };

    const handleExitFullScreen = () => {
      {
        screenfull.exit();
        if (screen.orientation) {
          screen.orientation.unlock();
        }
        // setPlayerState((prev: any) => ({ ...prev, playerFullScreen: false }));
        dispatch({ type: "minimizeMaximize", payload: false });
      }
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
          if (state.playerFullScreen) {
            // if (playerState.playerFullScreen) {
            handleExitFullScreen();
          } else {
            handleFullScreen();
          }
        }}>
        {!state?.loaded && (
          // {!playerState?.loaded && (
          <div className="w-full flex items-center justify-center gap-[15%]">
            {windowWidth <= 640 && (
              <div
                role="button"
                className="px-1 xs:px-3 rotate-[-45]"
                onClick={handleSkipBack}>
                <Undo className="h-8 w-8 xs:h-10 xs:w-10" color="#fff" />
              </div>
            )}
            <div role="button" onClick={handleTogglePlayPause}>
              {state.playing ? (
                !state.buffering && (
                  // {playerState?.playing ? (
                  //   !playerState?.buffering && (
                  <Pause
                    className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14"
                    strokeWidth={1}
                    fill="#fff"
                    color="#fff"
                  />
                )
              ) : (
                <Play
                  className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14"
                  strokeWidth={3}
                  fill="#fff"
                  color="#fff"
                />
              )}
            </div>
            {windowWidth <= 640 && (
              <div
                role="button"
                className="px-1 xs:px-3 rotate-[45]"
                onClick={handleSkipForward}>
                <Redo className="h-8 w-8 xs:h-10 xs:w-10" color="#fff" />
              </div>
            )}
          </div>
        )}
        <div className="text-lg px-4 pb-1 xxs:pb-2 text-white absolute left-0 right-0 bottom-0">
          <div className="flex items-center justify-between xs:pb-2">
            <div className="flex items-center">
              <div
                role="button"
                className="px-1 xs:px-2"
                onClick={handleTogglePlayPause}>
                {state.playing ? (
                  // {playerState?.playing ? (
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
              <VolumeController state={state} dispatch={dispatch} />
              <div
                className="ml-2 xs:ml-4 text-xs xs:text-sm cursor-pointer font-nunito"
                onClick={() => setIsRemainingTime(!isRemainingTime)}>
                <span>
                  {
                    isRemainingTime
                      ? "-" +
                        secToMinSec(
                          (1 - state.played) * state.duration
                          // (1 - playerState?.played) * playerState?.duration
                        )
                      : secToMinSec(
                          state.played * state.duration
                          // playerState?.played * playerState?.duration
                        )
                    // playerRef.current.getCurrentTime()
                  }
                </span>
                <span>/{secToMinSec(state.duration)}</span>
                {/* <span>/{secToMinSec(playerState?.duration)}</span> */}
              </div>
            </div>
            <div className="flex items-center">
              {windowWidth > 640 && (
                <>
                  <div
                    role="button"
                    className="px-1 xs:px-3 rotate-[-30]"
                    onClick={handleSkipBack}>
                    <Undo className="h-6 w-6" color="#fff" />
                  </div>
                  <div
                    role="button"
                    className="px-1 xs:px-3 rotate-[30]"
                    onClick={handleSkipForward}>
                    <Redo className="h-6 w-6" color="#fff" />
                  </div>
                </>
              )}
              <div role="button" className="px-1.5 xs:px-3 ">
                <Subtitles className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div>
              {/* <div role="button" className="px-3 "> */}
              {/* <Settings /> */}
              {/* <Settings2  />
            </div> */}
              <Popover className="relative">
                <Popover.Button className="font-nunito text-sm xs:text-base">
                  {/* {playerState.currentSource?.quality} */}
                  {state.currentSource?.quality || "unknown"}
                </Popover.Button>
                <Popover.Panel className="absolute bottom-12 -left-14 z-10 bg-black bg-opacity-80 rounded-lg">
                  <div className="p-2">
                    <p className="p-2 pb-4 border-opacity-90 border-orange-500 border-b-2">
                      Quality
                    </p>
                    <div className="my-2">
                      {state.sources.map((source: any) => (
                        // {playerState.sources.map((source: any) => (
                        <div
                          role="button"
                          className="mx-2 px-4 py-2 w-40 text-sm font-nunito hover:bg-black bg-opacity-60 rounded flex justify-between"
                          key={source?.quality}
                          onClick={() => {
                            setWatched();
                            // setPlayerState((prev: any) => ({
                            //   ...prev,
                            //   url: source.url,
                            //   playing: isAutoPlayEnabled,
                            //   played: 0,
                            //   loaded: 0,
                            //   // pip: false,
                            //   currentSource: source,
                            //   playbackQuality: source?.quality,
                            // }));
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
                                ? // playerState.currentSource?.quality
                                  "text-white"
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
                className="px-1.5 xs:px-3"
                onClick={handleTogglePIP}>
                <Minimize2 className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div> */}
              <div role="button" className="px-1.5 xs:px-3">
                {state.playerFullScreen ? (
                  // {playerState.playerFullScreen ? (
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
