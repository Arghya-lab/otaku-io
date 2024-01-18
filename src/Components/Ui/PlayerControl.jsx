import { forwardRef, useEffect, useState } from "react";
import PropType from "prop-types";
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
import { useSelector } from "react-redux";

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
    const [isPlayerFullScreen, setIsPlayerFullScreen] = useState(false);

    const handleKeyPress = (e) => {
      e.preventDefault();

      if (e.key === " " || e.keyCode === 32) {
        setPlayerState((prev) => ({
          ...prev,
          playing: false,
        }));
      } else if (e.key === "ArrowRight" || e.keyCode === 39) {
        playerRef.current.seekTo(
          playerRef.current.getCurrentTime() + videoSeekSeconds
        );
      } else if (e.key === "ArrowLeft" || e.keyCode === 37) {
        playerRef.current.seekTo(
          playerRef.current.getCurrentTime() - videoSeekSeconds
        );
      } else if (e.key === "f" || e.keyCode === 70) {
        setPlayerState((prev) => ({ ...prev, pip: false }));
        screenfull.request(document.getElementById("Player"));
        setIsPlayerFullScreen(true);
      } else if (e.key === "Escape" || e.keyCode === 27) {
        screenfull.exit(document.getElementById("Player"));
        setIsPlayerFullScreen(false);
      } else if (e.key === "ArrowUp" || e.keyCode === 38) {
        setPlayerState((prev) => ({
          ...prev,
          volume: playerState.volume + 0.1,
        }));
      } else if (e.key === "ArrowDown" || e.keyCode === 40) {
        setPlayerState((prev) => ({
          ...prev,
          volume: playerState.volume - 0.1,
        }));
      }
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
        className="flex flex-col gap-2 absolute bottom-0 left-0 right-0 top-0 text-white"
        // style={{ gridTemplateColumns: repeat(2, 100px), gridAutoFlow: "column", }}
        onDoubleClick={() => {
          if (isPlayerFullScreen) {
            screenfull.exit(document.getElementById("Player"));
            setIsPlayerFullScreen(false);
          } else {
            setPlayerState((prev) => ({ ...prev, pip: false }));
            screenfull.request(document.getElementById("Player"));
            setIsPlayerFullScreen(true);
          }
        }}>
        <div
          role="button"
          className="w-full flex-1 flex justify-center items-center"
          onClick={() =>
            setPlayerState((prev) => ({
              ...prev,
              playing: !playerState?.playing,
            }))
          }>
          {!playerState?.playing && (
            <Play
              className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14"
              strokeWidth={3}
              fill="#fff"
              color="#fff"
            />
          )}
        </div>
        <div className="text-lg px-4 pb-4 text-white">
          <VideoLoadedBar
            played={playerState?.played}
            loaded={playerState?.loaded}
            playerRef={playerRef}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                role="button"
                className="px-1 xs:px-2"
                onClick={() =>
                  setPlayerState((prev) => ({
                    ...prev,
                    playing: !playerState?.playing,
                  }))
                }>
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
              <div className="ml-2 xs:ml-4 text-xs xs:text-sm font-nunito">
                <span
                  role="button"
                  onClick={() => setIsRemainingTime(!isRemainingTime)}>
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
              <div
                role="button"
                className="px-1 xs:px-3 rotate-[-30]"
                onClick={() =>
                  playerRef.current.seekTo(
                    playerRef.current.getCurrentTime() - videoSeekSeconds
                  )
                }>
                <Undo className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div>
              <div
                role="button"
                className="px-1 xs:px-3 rotate-[30]"
                onClick={() =>
                  playerRef.current.seekTo(
                    playerRef.current.getCurrentTime() + videoSeekSeconds
                  )
                }>
                <Redo className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div>
              <div role="button" className="px-1 xs:px-3 ">
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
              <div
                role="button"
                className="px-1 xs:px-3"
                onClick={() => {
                  screenfull.exit(document.getElementById("Player"));
                  setPlayerState((prev) => ({
                    ...prev,
                    pip: !playerState?.pip,
                  }));

                  setIsPlayerFullScreen(false);
                }}>
                <Minimize2 className="h-4 w-4 xs:h-6 xs:w-6" color="#fff" />
              </div>
              <div role="button" className="px-1 xs:px-3">
                {isPlayerFullScreen ? (
                  <Minimize
                    className="h-4 w-4 xs:h-6 xs:w-6"
                    color="#fff"
                    onClick={() => {
                      screenfull.exit(document.getElementById("Player"));
                      setIsPlayerFullScreen(false);
                    }}
                  />
                ) : (
                  <Expand
                    className="h-4 w-4 xs:h-6 xs:w-6"
                    color="#fff"
                    onClick={() => {
                      setPlayerState((prev) => ({ ...prev, pip: false }));
                      screenfull.request(document.getElementById("Player"));

                      setIsPlayerFullScreen(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
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
