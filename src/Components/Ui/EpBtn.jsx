import { useState } from "react";
import PropType from "prop-types";
import { useSelector } from "react-redux";
import { shade } from "../../utils/color";
import { useParams } from "react-router-dom";

function EpBtn({ color, episode, watched, modeResponsiveness, handleClick }) {
  const watching = Boolean(useParams().epNo == episode?.number);
  const { theme } = useSelector((state) => state.preference);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={episode?.number}
      role="button"
      className={`h-7 w-14 flex items-center justify-center rounded-md border-2 ${
        modeResponsiveness
          ? "text-neutral-900 dark:text-slate-100"
          : "text-slate-100"
      }`}
      style={{
        backgroundColor: watching
          ? shade(color, -1, 0.5)
          : isHovered
          ? shade(color, -2, 0.1)
          : watched
          ? shade(color, -1, 0.1)
          : shade(color, -1, 0.2),
        borderColor: watching
          ? shade(color, -1, 1)
          : isHovered
          ? shade(color, 0)
          : watched
          ? shade(color, 0, 0.4)
          : theme.type === "dark" && modeResponsiveness
          ? shade(color, -4, 0.4)
          : shade(color, 4, 0.4),
        transition: "color 0.3s, border-color 0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(episode)}>
      {episode?.number}
    </div>
  );
}

EpBtn.propTypes = {
  color: PropType.string.isRequired,
  episode: PropType.object.isRequired,
  watched: PropType.bool.isRequired,
  modeResponsiveness: PropType.bool,
  handleClick: PropType.func.isRequired,
};

export default EpBtn;
