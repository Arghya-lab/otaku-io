import {
  Fragment,
  MouseEvent,
  MutableRefObject,
  TouchEvent,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import { PlayerStateType } from "@/types/player";

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
    <div className="mb-1 xs:mb-2 h-3 flex flex-col justify-center items-center">
      <div
        ref={sliderRef}
        className="relative h-1 w-full bg-white bg-opacity-60 rounded-sm cursor-pointer flex items-center"
        onClick={handleSliderClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onMouseEnter={handleSliderHover}
        onMouseLeave={handleSliderLeave}>
        <div
          className="h-full bg-red-500 rounded-sm absolute z-10"
          style={{ width: `${state?.played * 100}%` }}
        />
        <div
          className="h-full bg-white bg-opacity-70 rounded-sm absolute top-0 left-0 -z-10"
          style={{ width: `${state?.loaded * 100}%` }}
        />
        {/* Skip indicator bar */}
        {state.skipTimes.map((skipTime: any) => (
          <Fragment key={skipTime.type}>
            {skipTime.type === "intro" && (
              <div
                className={`h-1 bg-purple-500 bg-opacity-70 rounded-sm absolute z-20`}
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
                className={`h-1 bg-yellow-400 bg-opacity-70 rounded-sm absolute z-20`}
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
                className={`h-1 bg-lime-400 bg-opacity-70 rounded-sm absolute z-20`}
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
                className={`h-1 bg-orange-400 bg-opacity-70 rounded-sm absolute z-20`}
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
                className={`h-1 bg-blue-500 bg-opacity-70 rounded-sm absolute z-20`}
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
