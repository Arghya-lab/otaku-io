"use client"

import { useState } from "react";
import { shade } from "../../utils/color";
import { themes } from "@/theme";

function EpBtn({ color, episode, watched, modeResponsiveness, handleClick }) {
  const watching = false;
  // const watching = Boolean(useParams().epNo == episode?.number);
  const theme = themes[23]

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
          ? shade(color, -1, 0.5).toString()
          : isHovered
          ? shade(color, -2, 0.1).toString()
          : watched
          ? shade(color, -1, 0.1).toString()
          : shade(color, -1, 0.2).toString(),
        borderColor: watching
          ? shade(color, -1, 1).toString()
          : isHovered
          ? shade(color, 0).toString()
          : watched
          ? shade(color, 0, 0.4).toString()
          : theme.type === "dark" && modeResponsiveness
          ? shade(color, -4, 0.4).toString()
          : shade(color, 4, 0.4).toString(),
        transition: "color 0.3s, border-color 0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(episode)}>
      {episode?.number}
    </div>
  );
}

export default EpBtn;
