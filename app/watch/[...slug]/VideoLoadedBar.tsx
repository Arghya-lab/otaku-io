import { PlayerStateType } from "@/types/player";
import {
  Fragment,
  MouseEvent,
  MutableRefObject,
  TouchEvent,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";

function VideoLoadedBar({
  state,
  playerRef,
}: {
  state: PlayerStateType;
  playerRef: MutableRefObject<ReactPlayer | null>;
}) {
  const [isSeeking, setIsSeeking] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const adjustSliderFill = (e: MouseEvent) => {
    if (isSeeking && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const fillWidth = (e.pageX - rect.left) / rect.width;

      if (fillWidth >= 0 && fillWidth <= 1 && playerRef.current) {
        playerRef.current.seekTo(fillWidth);
      }
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = touch.pageX;
      const fillWidth = (clientX - rect.left) / rect.width;

      if (fillWidth >= 0 && fillWidth <= 1 && playerRef.current) {
        playerRef.current.seekTo(fillWidth);
      }
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsSeeking(true);
    adjustSliderFill(e);
  };

  const handleMouseUp = () => {
    setIsSeeking(false);
  };

  const handleSliderClick = (e: MouseEvent<HTMLDivElement>) => {
    if (sliderRef?.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const fillWidth = (e.pageX - rect.left) / rect.width;

      if (fillWidth >= 0 && fillWidth <= 1 && playerRef.current) {
        playerRef.current.seekTo(fillWidth);
      }
    }
  };

  const handleSliderHover = () => {
    if (sliderRef?.current) {
      // Change height when hovered
      sliderRef.current.style.height = "0.35rem"; // Change this value as needed
    }
  };

  const handleSliderLeave = () => {
    if (sliderRef?.current) {
      // Reset height when hover ends
      sliderRef.current.style.height = "0.25rem"; // Change this value back to original
    }
  };

  return (
    <div className="mb-1 flex h-3 flex-col items-center justify-center xs:mb-2">
      <div
        ref={sliderRef}
        className="relative flex h-1 w-full cursor-pointer items-center rounded-sm bg-white bg-opacity-60"
        onClick={handleSliderClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onMouseEnter={handleSliderHover}
        onMouseLeave={handleSliderLeave}
      >
        <div
          className="absolute z-10 h-full rounded-sm bg-red-500"
          style={{ width: `${state?.played * 100}%` }}
        />
        <div
          className="absolute left-0 top-0 -z-10 h-full rounded-sm bg-white bg-opacity-70"
          style={{ width: `${state?.loaded * 100}%` }}
        />
        {/* Skip indicator bar */}
        {state.skipTimes.map((skipTime: any) => (
          <Fragment key={skipTime.type}>
            {skipTime.type === "intro" && (
              <div
                className={`absolute z-20 h-1 rounded-sm bg-purple-500 bg-opacity-70`}
                style={{
                  left: `${(100 * skipTime.startTime) / state.duration}%`,
                  width: `${
                    (100 * (skipTime.endTime - skipTime.startTime)) /
                    state.duration
                  }%`,
                }}
              />
            )}
            {skipTime.type === "outro" && (
              <div
                className={`absolute z-20 h-1 rounded-sm bg-yellow-400 bg-opacity-70`}
                style={{
                  left: `${(100 * skipTime.startTime) / state.duration}%`,
                  width: `${
                    (100 * (skipTime.endTime - skipTime.startTime)) /
                    state.duration
                  }%`,
                }}
              />
            )}
            {skipTime.type === "mix-intro" && (
              <div
                className={`absolute z-20 h-1 rounded-sm bg-lime-400 bg-opacity-70`}
                style={{
                  left: `${(100 * skipTime.startTime) / state.duration}%`,
                  width: `${
                    (100 * (skipTime.endTime - skipTime.startTime)) /
                    state.duration
                  }%`,
                }}
              />
            )}
            {skipTime.type === "mix-outro" && (
              <div
                className={`absolute z-20 h-1 rounded-sm bg-orange-400 bg-opacity-70`}
                style={{
                  left: `${(100 * skipTime.startTime) / state.duration}%`,
                  width: `${
                    (100 * (skipTime.endTime - skipTime.startTime)) /
                    state.duration
                  }%`,
                }}
              />
            )}
            {skipTime.type === "recap" && (
              <div
                className={`absolute z-20 h-1 rounded-sm bg-blue-500 bg-opacity-70`}
                style={{
                  left: `${(100 * skipTime.startTime) / state.duration}%`,
                  width: `${
                    (100 * (skipTime.endTime - skipTime.startTime)) /
                    state.duration
                  }%`,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default VideoLoadedBar;
