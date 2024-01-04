import { useState } from "react";
import PropType from "prop-types";
import { shade } from "../../utils/color";

function ChipBtn({ name = "", color = "#fff" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-fit h-fit px-2.5 py-1 rounded-full text-slate-100 border-2"
      style={{
        backgroundColor: isHovered ? shade(color, -2, 0.1) : "unset",
        // color: isHovered ? shade(color, -2)  : "white",
        borderColor: isHovered ? shade(color, 0) : "transparent",
        transition: "color 0.3s, border-color 0.3s",
      }}
      role="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <span className="capitalize text-sm">{name}</span>
    </div>
  );
}

ChipBtn.propTypes = {
  name: PropType.string.isRequired,
  color: PropType.string,
};

export default ChipBtn;
