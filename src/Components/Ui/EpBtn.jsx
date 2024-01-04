import { useState } from "react";
import PropType from "prop-types";
import { shade } from "../../utils/color";

function EpBtn({ episode, color }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      key={episode?.number}
      role="button"
      className="h-7 w-14 flex items-center justify-center rounded-md border-2 text-slate-100"
      style={{
        backgroundColor: isHovered ? shade(color, -2, 0.1) : shade(color, -1, 0.2),
        borderColor: isHovered ? shade(color, 0) : shade(color, -4, 0.4),
        transition: "color 0.3s, border-color 0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {episode?.number}
    </div>
  );
}

EpBtn.propTypes = {
  episode: PropType.object.isRequired,
  color: PropType.string.isRequired,
};

export default EpBtn;
