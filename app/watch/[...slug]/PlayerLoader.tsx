import { RotatingLines } from "react-loader-spinner";
import { PlayerStateType } from "@/types/player";
import { Loader2 } from "lucide-react";

function PlayerLoader({ state }: { state: PlayerStateType }) {
  if (state.loaded === 0) {
    return (
      <RotatingLines
        visible={true}
        width="64"
        strokeColor="white"
        strokeWidth="4"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    );
  }

  if (state.buffering && state.playing) {
    return (
      <div className="px-1 xs:px-2">
        <Loader2
          strokeWidth={2.5}
          className="h-8 w-8 xxs:h-10 xxs:w-10 xs:h-14 xs:w-14 text-white animate-spin"
          color="#fff"
        />
      </div>
    );
  }

  return null;
}

export default PlayerLoader;
