import PropType from "prop-types";
import { Loader2 } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";

function PlayerLoader({ playerState }) {
  if (playerState?.loaded === 0) {
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

  if (playerState?.buffering) {
    return (
      <Loader2
        strokeWidth={2.5}
        className="h-16 w-16 text-white animate-spin"
      />
    );
  }
}

PlayerLoader.propTypes = {
  playerState: PropType.object.isRequired,
};

export default PlayerLoader;
