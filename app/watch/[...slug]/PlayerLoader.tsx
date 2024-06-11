import { PlayerStateType } from "@/types/player";
import { RotatingLines } from "react-loader-spinner";

function PlayerLoader({ state }: { state: PlayerStateType }) {
  if (state.loaded === 0) {
    return (
      <div className="absolute bottom-0 left-0 right-0 top-0 z-30 flex items-center justify-center">
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
