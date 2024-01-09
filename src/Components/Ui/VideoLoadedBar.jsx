import { useRef, useState } from "react";
import PropType from "prop-types";

function VideoLoadedBar({ played, loaded, playerRef }) {
  const [isSeeking, setIsSeeking] = useState(false);
  const sliderRef = useRef(null);

  const adjustSliderFill = (e) => {
    if (isSeeking && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const fillWidth = (e.pageX - rect.left) / rect.width;

      if (fillWidth >= 0 && fillWidth <= 1 && playerRef.current) {
        playerRef.current.seekTo(fillWidth);
      }
    }
  };

  const handleTouchStart = (e) => {
    console.log(e.touches[0]);
    const touch = e.touches[0];
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = touch.pageX || touch.touches[0].pageX;
      const fillWidth = (clientX - rect.left) / rect.width;

      if (fillWidth >= 0 && fillWidth <= 1 && playerRef.current) {
        playerRef.current.seekTo(fillWidth);
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsSeeking(true);
    adjustSliderFill(e);
  };

  const handleMouseUp = () => {
    setIsSeeking(false);
  };

  const handleSliderClick = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const fillWidth = (e.pageX - rect.left) / rect.width;

    if (fillWidth >= 0 && fillWidth <= 1 && playerRef.current) {
      playerRef.current.seekTo(fillWidth);
    }
  };

  const handleSliderHover = () => {
    // Change height when hovered
    sliderRef.current.style.height = "0.35rem"; // Change this value as needed
  };

  const handleSliderLeave = () => {
    // Reset height when hover ends
    sliderRef.current.style.height = "0.25rem"; // Change this value back to original
  };

  return (
    <div className="mb-4 h-3 flex flex-col justify-center items-center">
      <div
        ref={sliderRef}
        className="relative h-1 w-full bg-white bg-opacity-60 rounded-sm cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onClick={handleSliderClick}
        onMouseEnter={handleSliderHover}
        onMouseLeave={handleSliderLeave}>
        <div
          className="h-full bg-red-500 rounded-sm absolute z-10"
          style={{ width: `${played * 100}%` }}
        />
        <div
          className="h-full bg-white bg-opacity-70 rounded-sm absolute top-0 left-0 -z-0"
          style={{ width: `${loaded * 100}%` }}
        />
      </div>
    </div>
  );
}

VideoLoadedBar.propTypes = {
  played: PropType.number.isRequired,
  loaded: PropType.number.isRequired,
  playerRef: PropType.object.isRequired,
};

export default VideoLoadedBar;
