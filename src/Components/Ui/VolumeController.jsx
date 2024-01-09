import { useRef, useState, useEffect } from "react";
import PropType from "prop-types";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";

function VolumeController({ playerState, setPlayerState }) {
  const sliderRef = useRef(null);

  // const volume = playerState?.volume //  value -> 0-1
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const handleScroll = (e) => {
    const isOverSlider =
      sliderRef.current && sliderRef.current.contains(e.target);
    if (isOverSlider) {
      e.preventDefault(); // Prevent default scroll behavior

      let newVolume = playerState?.volume - (e.deltaY > 0 ? 0.05 : -0.05);

      if (newVolume < 0) {
        newVolume = 0;
      } else if (newVolume > 1) {
        newVolume = 1;
      }

      setPlayerState((prev) => ({ ...prev, volume: newVolume }));
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false }); // Add passive: false to prevent default scroll
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState?.volume]);

  const adjustVolumeLevel = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      let newVolume = (e.pageX - rect.left) / rect.width;

      if (newVolume < 0) {
        newVolume = 0;
      } else if (newVolume > 1) {
        newVolume = 1;
      }

      setPlayerState((prev) => ({ ...prev, volume: newVolume }));
    }
  };

  const handleMouseDown = (e) => {
    adjustVolumeLevel(e);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", adjustVolumeLevel);
  };

  const handleSliderClick = (e) => {
    adjustVolumeLevel(e);
  };

  const handleSpeakerHover = () => {
    setIsVolumeVisible(true);
  };

  const handleSpeakerLeave = () => {
    setIsVolumeVisible(false);
  };

  return (
    <div
      className="flex items-center px-2"
      onMouseEnter={handleSpeakerHover}
      onMouseLeave={handleSpeakerLeave}>
      <div
        role="button"
        onClick={() =>
          setPlayerState((prev) => ({
            ...prev,
            muted: !playerState?.muted,
          }))
        }>
        {playerState?.muted ? (
          <VolumeX className="h-4 w-4 xs:h-6 xs:w-6" fill="#fff" color="#fff" />
        ) : playerState.volume < 0.33 ? (
          <Volume className="h-4 w-4 xs:h-6 xs:w-6" fill="#fff" color="#fff" />
        ) : playerState.volume < 0.67 ? (
          <Volume1 className="h-4 w-4 xs:h-6 xs:w-6" fill="#fff" color="#fff" />
        ) : (
          <Volume2 className="h-4 w-4 xs:h-6 xs:w-6" fill="#fff" color="#fff" />
        )}
      </div>
      {isVolumeVisible && (
        <div className="p-2 bg-white bg-opacity-20 rounded-full">
          <div
            ref={sliderRef}
            className="relative h-1 w-12 bg-white bg-opacity-60 rounded-md cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleSliderClick}>
            <div
              className="h-full bg-white rounded-md"
              style={{
                width: `${playerState?.muted ? 0 : playerState?.volume * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

VolumeController.propTypes = {
  playerState: PropType.object.isRequired,
  setPlayerState: PropType.func.isRequired,
};

export default VolumeController;
