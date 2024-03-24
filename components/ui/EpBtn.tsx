"use client";

import { useState } from "react";
import { shade } from "../../utils/color";
import { themes } from "@/theme";
import { usePreference } from "../PreferenceProvider";
import { AnimeEpisodeType } from "@/types/anime";

function EpBtn({
  color = "#000",
  episode,
  watched,
  modeResponsiveness,
  handleClick,
  watching = false,
}: {
  color?: string;
  episode: AnimeEpisodeType;
  watched?: boolean;
  modeResponsiveness?: boolean;
  handleClick: (ep: AnimeEpisodeType) => void;
  watching?: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes[themeId];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      key={episode?.number}
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
    </button>
  );
}

export default EpBtn;
