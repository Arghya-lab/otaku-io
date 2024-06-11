import { PlayerActionType, PlayerStateType } from "@/types/player";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { Dispatch, MouseEvent, useEffect, useRef, useState } from "react";

function VolumeController({
  state,
  dispatch,
}: {
  state: PlayerStateType;
  dispatch: Dispatch<PlayerActionType>;
}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const isOverSlider =
        sliderRef.current && sliderRef.current.contains(e.target as Node);
      if (isOverSlider) {
        e.preventDefault(); // Prevent default scroll behavior

        dispatch({
          type: "updateVolume",
          payload: -(e.deltaY > 0 ? 0.05 : -0.05),
        });
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false }); // Add passive: false to prevent default scroll
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.volume]);

  const adjustVolumeLevel = (e: any) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();

      dispatch({
        type: "updateVolume",
        payload: (e.pageX - rect.left) / rect.width,
      });
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    adjustVolumeLevel(e);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", adjustVolumeLevel);
  };

  const handleSliderClick = (e: MouseEvent<HTMLDivElement>) => {
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
      onMouseLeave={handleSpeakerLeave}
    >
      <div role="button" onClick={() => dispatch({ type: "toggleMuted" })}>
        {state.muted ? (
          <VolumeX className="h-4 w-4 xs:h-6 xs:w-6" fill="#fff" color="#fff" />
        ) : state.volume < 0.33 ? (
          <Volume className="h-4 w-4 xs:h-6 xs:w-6" fill="#fff" color="#fff" />
        ) : state.volume < 0.67 ? (
          <Volume1 className="h-4 w-4 xs:h-6 xs:w-6" fill="#fff" color="#fff" />
        ) : (
          <Volume2 className="h-4 w-4 xs:h-6 xs:w-6" fill="#fff" color="#fff" />
        )}
      </div>
      {isVolumeVisible && (
        <div className="rounded-full bg-white bg-opacity-20 p-2">
          <div
            ref={sliderRef}
            className="relative h-1 w-12 cursor-pointer rounded-md bg-white bg-opacity-60"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleSliderClick}
          >
            <div
              className="h-full rounded-md bg-white"
              style={{
                width: `${state.muted ? 0 : state.volume * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VolumeController;
