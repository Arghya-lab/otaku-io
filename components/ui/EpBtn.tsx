"use client";

import { IAnimeEpisode } from "@consumet/extensions";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { shade } from "../../utils/color";

function EpBtn({
  episode,
  href,
  color = "#000",
  watched,
  watching = false,
  isWatchPage = false,
}: {
  episode: IAnimeEpisode;
  href: string;
  color?: string;
  watched?: boolean;
  watching?: boolean;
  isWatchPage?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    bgColor: {
      watching: isWatchPage ? undefined : shade(color, -1, 0.5).toString(),
      hovered: isWatchPage ? undefined : shade(color, -2, 0.1).toString(),
      watched: isWatchPage ? undefined : shade(color, -1, 0.1).toString(),
      default: isWatchPage ? undefined : shade(color, -1, 0.2).toString(),
    },
    borderColor: {
      watching: isWatchPage ? undefined : shade(color, -1, 1).toString(),
      hovered: isWatchPage ? undefined : shade(color, 0).toString(),
      watched: isWatchPage ? undefined : shade(color, 0, 0.4).toString(),
      default: isWatchPage ? undefined : shade(color, 4, 0.4).toString(),
    },
  };

  return (
    <Link
      href={href}
      key={episode?.number}
      className={classNames(
        "flex h-7 w-14 items-center justify-center rounded-md border-2 border-border bg-background opacity-80",
        {
          "text-white": watching || !isWatchPage,
          "border-popover bg-primary": isWatchPage && watching,
          "border-popover-foreground bg-popover": isWatchPage && isHovered,
          "border-accent-foreground bg-primary-foreground":
            isWatchPage && watched,
        }
      )}
      style={{
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
    >
      {episode?.number}
    </Link>
  );
}

export default EpBtn;
