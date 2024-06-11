"use client";

import { themeEnum, themes } from "@/theme";
import { AnimeEpisodeType } from "@/types/anime";
import chroma from "chroma-js";
import { useState } from "react";
import { shade } from "../../utils/color";
import { usePreference } from "../providers/PreferenceProvider";

function EpBtn({
  color = "#000",
  episode,
  watched,
  handleClick,
  watching = false,
  isWatchPage = false,
}: {
  color?: string;
  episode: AnimeEpisodeType;
  watched?: boolean;
  handleClick: (ep: AnimeEpisodeType) => void;
  watching?: boolean;
  isWatchPage?: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const [isHovered, setIsHovered] = useState(false);

  const style = {
    bgColor: {
      watching: isWatchPage
        ? chroma(theme.secondaryColor).alpha(0.5).toString()
        : shade(color, -1, 0.5).toString(),
      hovered: isWatchPage
        ? chroma(theme.secondaryColor).alpha(0.25).toString()
        : shade(color, -2, 0.1).toString(),
      watched: isWatchPage
        ? chroma(theme.secondaryColor).alpha(0.15).toString()
        : shade(color, -1, 0.1).toString(),
      default: isWatchPage
        ? theme.primaryColor
        : shade(color, -1, 0.2).toString(),
    },
    borderColor: {
      watching: isWatchPage
        ? chroma(theme.secondaryColor).darken(2).alpha(0.75).toString()
        : shade(color, -1, 1).toString(),
      hovered: isWatchPage
        ? chroma(theme.secondaryColor).alpha(0.8).toString()
        : shade(color, 0).toString(),
      watched: isWatchPage
        ? chroma(theme.secondaryColor).alpha(0.4).toString()
        : shade(color, 0, 0.4).toString(),
      default: isWatchPage
        ? chroma(theme.type === themeEnum.DARK ? "#fff" : "#000")
            .alpha(0.5)
            .toString()
        : theme.type === themeEnum.DARK
          ? shade(color, -4, 0.4).toString()
          : shade(color, 4, 0.4).toString(),
    },
  };

  return (
    <button
      key={episode?.number}
      disabled={watching && isWatchPage}
      className="flex h-7 w-14 items-center justify-center rounded-md border-2 opacity-80"
      style={{
        color: isWatchPage || !watching ? theme.textColor : "#fff",
        backgroundColor: watching
          ? style.bgColor.watching
          : isHovered
            ? style.bgColor.hovered
            : watched
              ? style.bgColor.watched
              : style.bgColor.default,
        borderColor: watching
          ? style.borderColor.watching
          : isHovered
            ? style.borderColor.hovered
            : watched
              ? style.borderColor.watched
              : style.borderColor.default,
        transition: "color 0.3s, border-color 0.3s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(episode)}
    >
      {episode?.number}
    </button>
  );
}

export default EpBtn;
