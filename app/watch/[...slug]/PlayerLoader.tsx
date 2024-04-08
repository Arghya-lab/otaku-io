import { RotatingLines } from "react-loader-spinner";
import { PlayerStateType } from "@/types/player";

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
  
  return null;
}

export default PlayerLoader;
