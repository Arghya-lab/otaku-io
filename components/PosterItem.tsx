/* eslint-disable @next/next/no-img-element */
"use client";

import { themes } from "@/theme";
import { shade } from "@/utils/color";
import getTitle from "@/utils/getTitle";
import { IAnimeResult } from "@consumet/extensions";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { usePreference } from "./providers/PreferenceProvider";

function PosterItem({
  item,
  isHorizontalScroll = false,
}: {
  item: IAnimeResult;
  isHorizontalScroll?: boolean;
}) {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const { isDub } = usePreference();
  const [isHover, setIsHover] = useState(false);

  const title = getTitle(item.title);

  return (
    <div
      className={classNames({
        "w-[152px] p-2 xxs:p-3 sm:w-48": isHorizontalScroll,
        "min-w-24 max-w-48 p-1": !isHorizontalScroll,
      })}
    >
      <Link
        href={`/info/${item.id}?title=${title}&dub=${isDub}`}
        className="w-full"
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <div
          className={`relative w-full overflow-hidden rounded-xl shadow-xl ring-[3px] ${
            isHover ? "ring-slate-50" : "ring-transparent"
          }`}
        >
          <div
            className={`relative mb-auto flex aspect-[5/7] w-full transform-gpu select-none items-start overflow-hidden transition-transform duration-200 ease-in ${
              isHover ? "scale-110" : null
            }`}
          >
            {item.image && (
              <img
                alt={title}
                className="w-full object-cover object-center"
                src={item.image}
              />
            )}
          </div>
        </div>
        <div className="flex h-16 items-center overflow-visible">
          <p
            className="line-clamp-2 w-full px-2 text-center text-xs font-medium text-neutral-950 dark:text-white"
            style={{
              color:
                isHover && item?.color
                  ? shade(item?.color, -2).toString()
                  : theme.textColor,
            }}
          >
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PosterItem;
