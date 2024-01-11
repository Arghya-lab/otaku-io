import { useState } from "react";
import PropType from "prop-types";
import { useSelector } from "react-redux";
import { shade } from "../../utils/color";

function EpBtn({ color, episode, modeResponsiveness, handleClick }) {
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
        backgroundColor: isHovered
          ? shade(color, -2, 0.1)
          : shade(color, -1, 0.2),
        borderColor: isHovered
          ? shade(color, 0)
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
  modeResponsiveness: PropType.bool,
  handleClick: PropType.func.isRequired,
};

export default EpBtn;
