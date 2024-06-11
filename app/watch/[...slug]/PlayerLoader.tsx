import { RotatingLines } from "react-loader-spinner";
import { PlayerStateType } from "@/types/player";

function PlayerLoader({ state }: { state: PlayerStateType }) {
  if (state.loaded === 0) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 z-30 flex items-center justify-center">
        <RotatingLines
          visible={true}
          width="64"
          strokeColor="white"
          strokeWidth="4"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  return null;
}

export default PlayerLoader;
