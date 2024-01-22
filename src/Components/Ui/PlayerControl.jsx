import { forwardRef, useEffect, useState } from "react";
import PropType from "prop-types";
import { useSelector } from "react-redux";
import screenfull from "screenfull";
import { Popover } from "@headlessui/react";
import {
  Check,
  Expand,
  Minimize,
  Minimize2,
  Pause,
  Play,
  Redo,
  // Settings,
  // Settings2,
  Subtitles,
  Undo,
} from "lucide-react";
import { secToMinSec } from "../../utils/time";
import VideoLoadedBar from "./VideoLoadedBar";
import VolumeController from "./VolumeController";
import useWindowSize from "../../hooks/useWindowSize";
// import useOrientation from "../../hooks/useOrientation";

const PlayerControl = forwardRef(
  (
    {
      playerRef,
      playerState,
      setPlayerState,
      sources,
      playBackQuality,
      setPlayBackQuality,
    },
    ref
  ) => {
    const { videoSeekSeconds } = useSelector((state) => state.preference);
    const [isRemainingTime, setIsRemainingTime] = useState(false);
    const { windowWidth } = useWindowSize();

    const handleKeyPress = (e) => {
      e.preventDefault();

      if (e.key === " " || e.keyCode === 32) {
        handleTogglePlayPause();
      } else if (e.key === "ArrowRight" || e.keyCode === 39) {
        handleSkipForward();
      } else if (e.key === "ArrowLeft" || e.keyCode === 37) {
        handleSkipBack();
      } else if (e.key === "f" || e.keyCode === 70) {
        handleFullScreen();
      } else if (e.key === "p" || e.keyCode === 80) {
        handlePIP();
      } else if (e.key === "Escape" || e.keyCode === 27) {
        handleExitFullScreen();
      } else if (e.key === "ArrowUp" || e.keyCode === 38) {
        setPlayerState({
          ...playerState,
          volume: playerState.volume + 0.1,
        });
      } else if (e.key === "ArrowDown" || e.keyCode === 40) {
        setPlayerState({
          ...playerState,
          volume: playerState.volume - 0.1,
        });
      }
    };

    const handleTogglePlayPause = () =>
      setPlayerState({
        ...playerState,
        playing: !playerState?.playing,
      });
    const handleSkipForward = () =>
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() + videoSeekSeconds
      );

    const handleSkipBack = () =>
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() - videoSeekSeconds
      );

    const handleFullScreen = () => {
      setPlayerState({ ...playerState, pip: false });
      screenfull.request(document.getElementById("Player"));
      if (screen.orientation) {
        screen.orientation.lock("landscape");
      }
      setPlayerState({
        ...playerState,
        playerFullScreen: true,
      });
    };

    const handleExitFullScreen = () => {
      screenfull.exit(document.getElementById("Player"));
      if (screen.orientation) {
        screen.orientation.unlock();
      }
      setPlayerState({
        ...playerState,
        playerFullScreen: false,
      });
    };

    const handlePIP = () => {
      screenfull.exit(document.getElementById("Player"));
      setPlayerState({
        ...playerState,
        pip: !playerState?.pip,
      });

      setPlayerState({
        ...playerState,
        playerFullScreen: false,
      });
    };

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
        // style={{ gridTemplateColumns: repeat(2, 100px), gridAutoFlow: "column", }}
        onDoubleClick={() => {
          if (playerState.playerFullScreen) {
            handleExitFullScreen();
          } else {
            handleFullScreen();
          }
        }}>
        {!playerState?.loaded == 0 && (
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
              {playerState?.playing ? (
                !playerState?.buffering && (
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
                {playerState?.playing ? (
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
              <VolumeController
                playerState={playerState}
                setPlayerState={setPlayerState}
              />
              <div
                className="ml-2 xs:ml-4 text-xs xs:text-sm cursor-pointer font-nunito"
                onClick={() => setIsRemainingTime(!isRemainingTime)}>
                <span>
                  {
                    isRemainingTime
                      ? "-" +
                        secToMinSec(
                          (1 - playerState?.played) * playerState?.duration
                        )
                      : secToMinSec(playerState?.played * playerState?.duration)
                    // playerRef.current.getCurrentTime()
                  }
                </span>
                <span>/{secToMinSec(playerState?.duration)}</span>
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
                  {playBackQuality}
                </Popover.Button>
                <Popover.Panel className="absolute bottom-12 -left-14 z-10 bg-black bg-opacity-80 rounded-lg">
                  <div className="p-2">
                    <p className="p-2 pb-4 border-opacity-90 border-orange-500 border-b-2">
                      Quality
                    </p>
                    <div className="my-2">
                      {sources.map((url) => (
                        <div
                          role="button"
                          className="mx-2 px-4 py-2 w-40 text-sm font-nunito hover:bg-black bg-opacity-60 rounded flex justify-between"
                          key={url?.quality}
                          onClick={() => setPlayBackQuality(url?.quality)}>
                          {url?.quality}
                          <Check
                            size={24}
                            className={
                              url?.quality == playBackQuality
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
              <div role="button" className="px-1.5 xs:px-3" onClick={handlePIP}>
                <Minimize2 className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div>
              <div role="button" className="px-1.5 xs:px-3">
                {playerState.playerFullScreen ? (
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
          <VideoLoadedBar playerState={playerState} playerRef={playerRef} />
        </div>
      </div>
    );
  }
);

PlayerControl.displayName = "PlayerControl";

PlayerControl.propTypes = {
  playerRef: PropType.object.isRequired,
  playerState: PropType.object.isRequired,
  setPlayerState: PropType.func.isRequired,
  sources: PropType.array.isRequired,
  playBackQuality: PropType.string.isRequired,
  setPlayBackQuality: PropType.func.isRequired,
};

export default PlayerControl;
