import { useState } from "react";
import PropType from "prop-types";
import screenfull from "screenfull";
import { Popover } from "@headlessui/react";
import { Range, getTrackBackground } from "react-range";
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
  Volume1,
  VolumeX,
} from "lucide-react";
import { secToMinSec } from "../../utils/time";

function PlayerControl({
  playerState,
  setPlayerState,
  sources,
  playBackQuality,
  setPlayBackQuality,
}) {
  const [isRemainingTime, setIsRemainingTime] = useState(false);
  const [isPlayerFullScreen, setIsPlayerFullScreen] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 absolute bottom-0 left-0 right-0 top-0 text-white"
      // style={{ gridTemplateColumns: repeat(2, 100px), gridAutoFlow: "column", }}
    >
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
          <Play size={56} strokeWidth={3} fill="#fff" color="#fff" />
        )}
      </div>
      <div className="text-lg px-4 pb-4 text-white">
        <Range
          values={[playerState?.played]}
          step={0.01 * 100}
          min={0}
          max={1}
          onChange={(e) =>
            // {console.log(e)}
            setPlayerState((prev) => ({
              ...prev,
              played: e.target.value[0],
            }))
          }
          renderTrack={({ props, children }) => (
            <div
              // eslint-disable-next-line react/prop-types
              onMouseDown={props.onMouseDown}
              // eslint-disable-next-line react/prop-types
              onTouchStart={props.onTouchStart}
              className="my-3 cursor-pointer"
              style={{
                display: "flex",
                width: "100%",
              }}>
              <div
                // eslint-disable-next-line react/prop-types
                ref={props.ref}
                className="h-1 rounded-full"
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [playerState?.played],
                    colors: ["#276EF1", "#ccc"],
                    min: 0,
                    max: 1,
                  }),
                  alignSelf: "center",
                }}>
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div className="focus:outline-none" {...props}></div>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              role="button"
              className="px-2"
              onClick={() =>
                setPlayerState((prev) => ({
                  ...prev,
                  playing: !playerState?.playing,
                }))
              }>
              {playerState?.playing ? (
                <Pause fill="#fff" color="#fff" />
              ) : (
                <Play fill="#fff" color="#fff" />
              )}
            </div>
            <div
              role="button"
              className="px-2"
              onClick={() =>
                setPlayerState((prev) => ({
                  ...prev,
                  muted: !playerState?.muted,
                }))
              }>
              {playerState?.muted ? (
                <VolumeX fill="#fff" color="#fff" />
              ) : (
                <Volume1 fill="#fff" color="#fff" />
              )}
            </div>
            {/* <div className="cursor-pointer w-12 h-1 bg-green-400" role="slider">
              <div
                className="relative h-8 touch-none"
                draggable="true"
                onScroll={(e) => {
                  console.log(e);
                }}>
                <div className="absolute w-3 h-3 bg-white left-4" />
              </div>
            </div> */}
            <div className="ml-4 text-sm font-nunito">
              <span
                role="button"
                onClick={() => setIsRemainingTime(!isRemainingTime)}>
                {isRemainingTime
                  ? secToMinSec(playerState?.played * playerState?.duration)
                  : "-" +
                    secToMinSec(
                      (1 - playerState?.played) * playerState?.duration
                    )}
              </span>
              <span>/{secToMinSec(playerState?.duration)}</span>
            </div>
          </div>
          <div className="flex items-center">
            <div
              role="button"
              className="px-3 rotate-[-30]"
              onClick={() =>
                setPlayerState((prev) => ({
                  ...prev,
                  played: playerState?.played - 10 / playerState?.duration,
                }))
              }>
              <Undo color="#fff" />
            </div>
            <div
              role="button"
              className="px-3 rotate-[30]"
              onClick={() =>
                setPlayerState((prev) => ({
                  ...prev,
                  played: playerState?.played + 10 / playerState?.duration,
                }))
              }>
              <Redo color="#fff" />
            </div>
            <div role="button" className="px-3 ">
              <Subtitles color="#fff" />
            </div>
            {/* <div role="button" className="px-3 "> */}
            {/* <Settings /> */}
            {/* <Settings2  />
            </div> */}
            <Popover className="relative">
              <Popover.Button className="font-nunito">
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
              className="px-3 "
              onClick={() => {
                screenfull.exit(document.getElementById("Player"));
                setPlayerState((prev) => ({ ...prev, pip: !playerState?.pip }));

                setIsPlayerFullScreen(false);
              }}>
              <Minimize2 color="#fff" />
            </div>
            <div role="button" className="px-3 ">
              {isPlayerFullScreen ? (
                <Minimize
                  color="#fff"
                  onClick={() => {
                    screenfull.exit(document.getElementById("Player"));
                    setIsPlayerFullScreen(false);
                  }}
                />
              ) : (
                <Expand
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

PlayerControl.propTypes = {
  playerState: PropType.object.isRequired,
  setPlayerState: PropType.func.isRequired,
  sources: PropType.array.isRequired,
  playBackQuality: PropType.string.isRequired,
  setPlayBackQuality: PropType.func.isRequired,
};

export default PlayerControl;
