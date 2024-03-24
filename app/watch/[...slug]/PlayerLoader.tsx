import { RotatingLines } from "react-loader-spinner";
import { PlayerStateType } from "@/types/player";
import { Loader2 } from "lucide-react";

function PlayerLoader({ state }: { state: PlayerStateType }) {
  // if (playerState?.loaded === 0) {
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

  if (state.buffering) {
    // if (playerState?.buffering) {
    return (
      <Loader2
        strokeWidth={2.5}
        className="h-16 w-16 text-white animate-spin"
      />
    );
  }
}

export default PlayerLoader;
