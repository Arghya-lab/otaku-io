import { usePreference } from "@/components/providers/PreferenceProvider";
import { PlayerStateType } from "@/types/player";
import { MutableRefObject } from "react";
import ReactPlayer from "react-player";

function PlayerSkipBtns({
  state,
  playerRef,
}: {
  state: PlayerStateType;
  playerRef: MutableRefObject<ReactPlayer | null>;
}) {
  const { autoSkip: isAutoSkipEnabled } = usePreference();

  if (state.skipTimes.length === 0) {
    return null;
  }

  const handleSkip = (skipTo: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(skipTo);
    }
  };

  return (
    <div className="absolute bottom-20 right-4 z-40 flex flex-col gap-2">
      {state.skipTimes.map((skipTime) => {
        if (playerRef.current) {
          const currentlyPlaying = playerRef.current.getCurrentTime();

          if (
            isAutoSkipEnabled &&
            currentlyPlaying >= skipTime.startTime &&
            currentlyPlaying <= skipTime.endTime
          ) {
            handleSkip(skipTime.endTime);
          }

          return (
            <div key={skipTime.type}>
              {skipTime.type === "intro" &&
                currentlyPlaying >= skipTime.startTime &&
                currentlyPlaying <= skipTime.endTime && (
                  <div
                    role="button"
                    className="rounded-md border-2 border-purple-600 bg-purple-600 bg-opacity-25 px-2 text-right font-nunito capitalize text-white"
                    onClick={() => handleSkip(skipTime.endTime)}
                  >
                    skip intro
                  </div>
                )}
              {skipTime.type === "outro" &&
                currentlyPlaying >= skipTime.startTime &&
                currentlyPlaying <= skipTime.endTime && (
                  <div
                    key={skipTime.type}
                    role="button"
                    className="rounded-md border-2 border-yellow-300 bg-yellow-300 bg-opacity-25 px-2 text-right font-nunito capitalize text-white"
                    onClick={() => handleSkip(skipTime.endTime)}
                  >
                    skip outro
                  </div>
                )}
              {skipTime.type === "mix-intro" &&
                currentlyPlaying >= skipTime.startTime &&
                currentlyPlaying <= skipTime.endTime && (
                  <div
                    key={skipTime.type}
                    role="button"
                    className="rounded-md border-2 border-lime-600 bg-lime-600 bg-opacity-25 px-2 text-right font-nunito capitalize text-white"
                    onClick={() => handleSkip(skipTime.endTime)}
                  >
                    skip mix-intro
                  </div>
                )}
              {skipTime.type === "mix-outro" &&
                currentlyPlaying >= skipTime.startTime &&
                currentlyPlaying <= skipTime.endTime && (
                  <div
                    key={skipTime.type}
                    role="button"
                    className="rounded-md border-2 border-orange-400 bg-orange-400 bg-opacity-25 px-2 text-right font-nunito capitalize text-white"
                    onClick={() => handleSkip(skipTime.endTime)}
                  >
                    skip mix-outro
                  </div>
                )}
              {skipTime.type === "recap" &&
                currentlyPlaying >= skipTime.startTime &&
                currentlyPlaying <= skipTime.endTime && (
                  <div
                    key={skipTime.type}
                    role="button"
                    className="b-2order-blue-500 rounded-md border bg-blue-500 bg-opacity-25 px-2 text-right font-nunito capitalize text-white"
                    onClick={() => handleSkip(skipTime.endTime)}
                  >
                    skip recap
                  </div>
                )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default PlayerSkipBtns;
